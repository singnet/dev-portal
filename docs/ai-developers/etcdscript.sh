#! /bin/bash

green="\033[0;32m"
blue="\033[1;34m"
red="\033[0;31m"
grey="\033[1;37m"
current_path=`pwd`

echo -e "${green}<---------- ETCD INSTALLATION ---------->"
echo -e "${blue}Here is the list of prerequisite for the installation"
echo -e "${blue}\t 1. The Operating System has to be Ubuntu."
echo -e "${blue}\t 2. User should have root previliges."
echo -e "${blue}\t 3. The Host has to be mapped to a particular domain and should be accessible."
echo -e "${blue}\t 4. The Ports 2379 & 2380 should be accessible by Daemon and the Host"
echo -e "${green}"

awk -F= '/^NAME/{print $2}' /etc/os-release | grep -i ubuntu
if [ "$?" -ne 0 ];
then
  echo -e "${red}ERROR: The ETCD installation is currently supported for Ubuntu OS."
  exit 1
fi

groups $user | grep sudo
if [ "$?" -ne 0 ];
then
  echo -e "${red}ERROR: User lacks sudo previliges. Switch to Root User"
  exit 1
fi

echo -e "${blue}Domain Name of the Host:${grey}"
read domain_name
echo -e "${blue}Oragnization Name:${grey}"
read org_name
echo -e "${blue}Validity of the certificates in years:${grey}"
read years
echo -e "${green}"

validity=$((years*365*24))

curl -V
if [ "$?" -ne 0 ];
then
  sudo apt-get update
  sudo apt-get install curl -y
fi

public_ip=`curl ifconfig.me`
private_ip=`hostname -I | awk '{print $1}'`

getent hosts ${domain_name} | awk '{ print $1 }' | grep ${public_ip}
if [ "$?" -ne 0 ];
then
  getent hosts ${domain_name} | awk '{ print $1 }' | grep ${private_ip}
  if [ "$?" -ne 0 ];
  then
    echo -e "${red}ERROR: Domain is not mapped to the current host."
    exit 1
  fi
fi

mkdir ~/bin
curl -s -L -o ~/bin/cfssl https://pkg.cfssl.org/R1.2/cfssl_linux-amd64
curl -s -L -o ~/bin/cfssljson https://pkg.cfssl.org/R1.2/cfssljson_linux-amd64
chmod +x ~/bin/{cfssl,cfssljson}
export PATH=$PATH:~/bin

cert_folder="/var/lib/etcd/cfssl"
sudo mkdir -p ${cert_folder}
sudo chmod 777 -R ${cert_folder}
cd ${cert_folder}
echo "{
    \"signing\": {
        \"default\": {
            \"expiry\": \"${validity}h\"
        },
        \"profiles\": {
            \"server\": {
                \"expiry\": \"${validity}h\",
                \"usages\": [
                    \"signing\",
                    \"key encipherment\",
                    \"server auth\"
                ]
            },
            \"client\": {
                \"expiry\": \"${validity}h\",
                \"usages\": [
                    \"signing\",
                    \"key encipherment\",
                    \"client auth\"
                ]
            },
            \"peer\": {
                \"expiry\": \"${validity}h\",
                \"usages\": [
                    \"signing\",
                    \"key encipherment\",
                    \"server auth\",
                    \"client auth\"
                ]
            }
        }
    }
}" > ca-config.json

echo "{
    \"CN\": \"${org_name} CA\",
    \"key\": {
        \"algo\": \"rsa\",
        \"size\": 2048
    },
    \"names\": [
        {
            \"C\": \"US\",
            \"L\": \"CA\",
            \"O\": \"${org_name} Name\",
            \"ST\": \"San Francisco\",
            \"OU\": \"Org Unit 1\",
            \"OU\": \"Org Unit 2\"
        }
    ]
}" > ca-csr.json
cfssl gencert -initca ca-csr.json | cfssljson -bare ca -

echo "{
    \"CN\": \"etcd-cluster\",
    \"hosts\": [
        \"${domain_name}\",
        \"${public_ip}\",
        \"127.0.0.1\"
    ],
    \"key\": {
        \"algo\": \"ecdsa\",
        \"size\": 256
    },
    \"names\": [
        {
            \"C\": \"US\",
            \"L\": \"CA\",
            \"ST\": \"San Francisco\"
        }
    ]
}" > server.json
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=server server.json | cfssljson -bare server

echo "{
    \"CN\": \"member-1\",
    \"hosts\": [
      \"member-1\",
      \"member-1.local\",
      \"${private_ip}\",
      \"127.0.0.1\"
    ],
    \"key\": {
        \"algo\": \"ecdsa\",
        \"size\": 256
    },
    \"names\": [
        {
            \"C\": \"US\",
            \"L\": \"CA\",
            \"ST\": \"San Francisco\"
        }
    ]
}" > member-1.json
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=peer member-1.json | cfssljson -bare member-1

echo "{
    \"CN\": \"client\",
    \"hosts\": [\"\"],
    \"key\": {
        \"algo\": \"ecdsa\",
        \"size\": 256
    },
    \"names\": [
        {
            \"C\": \"US\",
            \"L\": \"CA\",
            \"ST\": \"San Francisco\"
        }
    ]
}" > client.json
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=client client.json | cfssljson -bare client

cd ${current_path}
wget https://github.com/etcd-io/etcd/releases/download/v3.1.20/etcd-v3.1.20-linux-amd64.tar.gz
tar -zxvf etcd-v3.1.20-linux-amd64.tar.gz
cd etcd-v3.1.20-linux-amd64/
sudo mv etcd etcdctl /usr/bin/
cd ${current_path}
rm -rf etcd-v3.1.20-linux-amd64*

echo "[Unit]
Description=etcd service
Documentation=https://github.com/coreos/etcd

[Service]
User=root
Type=notify
ExecStart=/usr/bin/etcd \\
 --name member-1 \\
 --data-dir /var/lib/etcd \\
 --initial-advertise-peer-urls https://${private_ip}:2380 \\
 --listen-peer-urls https://${private_ip}:2380 \\
 --listen-client-urls https://${private_ip}:2379,https://127.0.0.1:2379 \\
 --advertise-client-urls https://${private_ip}:2379 \\
 --initial-cluster-token etcd-cluster-1 \\
 --initial-cluster member-1=https://${private_ip}:2380 \\
 --client-cert-auth --trusted-ca-file=${cert_folder}/ca.pem \\
 --cert-file=${cert_folder}/server.pem --key-file=${cert_folder}/server-key.pem \\
 --peer-client-cert-auth --peer-trusted-ca-file=${cert_folder}/ca.pem \\
 --peer-cert-file=${cert_folder}/member-1.pem --peer-key-file=${cert_folder}/member-1-key.pem \\
 --initial-cluster-state new
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target " | sudo tee -a /lib/systemd/system/etcd.service

sudo systemctl daemon-reload
sudo systemctl enable etcd
sudo systemctl start etcd.service
sleep 30s


curl --cacert ${cert_folder}/ca.pem --cert ${cert_folder}/client.pem --key ${cert_folder}/client-key.pem "https://${domain_name}:2379/health"
if [ "$?" -ne 0 ];
then
  echo -e "${red}ERROR: Port 2379 & 2380 seems to be not accessible from the host."
  rm -rf ~/bin
  sudo rm -rf ${cert_folder}
  sudo systemctl disable etcd
  sudo service etcd stop
  sudo rm /lib/systemd/system/etcd.service
  sudo rm /usr/bin/etcd /usr/bin/etcdctl
  sudo systemctl daemon-reload
  echo -e "${red}<---------- ETCD INSTALLATION FAILED---------->"
else
  echo -e "${green}"
  echo -e "<---------- ETCD INSTALLATED SUCCESSFULLY---------->"
  echo -e "${blue} 1. ETCD ENDPOINT: ${grey} https://${domain_name}:2379/health"
  echo -e "${blue} 2. CERTIFICATES PATH: ${grey} ${cert_folder}"
  echo -e "${blue} 3. COMMAND TO TEST LOCALLY: ${grey} curl --cacert ${cert_folder}/ca.pem --cert ${cert_folder}/client.pem --key ${cert_folder}/client-key.pem https://${domain_name}:2379/health"
  echo -e "${blue} 4. TO START ETCD: ${grey} sudo systemctl start etcd.service"
  echo -e "${blue} 5. TO STOP ETCD: ${grey} sudo systemctl start etcd.service"
  echo -e "${blue} 6. TO CHECK STATUS OF ETCD: ${grey} sudo systemctl status etcd.service"
fi
