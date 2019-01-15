package etcddb

import (
	"errors"
	"fmt"
	"strconv"
	"sync"

	"go.etcd.io/etcd/embed"
)

const (
	token = "cluster-token"
)

var names []string
var clientEndpoints []string
var peerEndpoints []string

var etcdServers []*embed.Etcd

func etcdInstancesNamesAre(values string) error {
	names = split(values)
	return nil
}

func etcdClientEndpointsAre(urls string) error {

	clientEndpoints = split(urls)
	return nil
}

func etcdPeerEnpointsAre(urls string) error {

	peerEndpoints = split(urls)
	return nil
}

func etcdClusterConsistsOfNodes(nodesNum int) error {

	port := 2379

	for i := 0; i < nodesNum; i++ {
		index := strconv.Itoa(i)
		name := "infra" + index
		names = append(names, name)

		clientEndpoint := "http://127.0.0.1:" + strconv.Itoa(port)
		clientEndpoints = append(clientEndpoints, clientEndpoint)
		port++

		peerEndpoint := "http://127.0.0.1:" + strconv.Itoa(port)
		peerEndpoints = append(peerEndpoints, peerEndpoint)
		port++
	}
	return nil
}

func ectdClusterIsRun() error {

	var lock sync.Mutex
	var wg sync.WaitGroup
	var results map[string]error

	wg.Add(len(names))

	for index, name := range names {

		go func(name string, clientEndpoint string, peerEndPoint string) {
			defer wg.Done()

			initialCluster := getInitialCluster()
			etcd, err := StartEtcdServer(name, clientEndpoint, peerEndPoint, initialCluster, token)

			lock.Lock()
			defer lock.Unlock()

			if err != nil {
				results[name] = err
				return
			}

			etcdServers = append(etcdServers, etcd)

		}(name, clientEndpoints[index], peerEndpoints[index])
	}

	wg.Wait()

	foundError := false

	for name, err := range results {
		foundError = true
		fmt.Printf("server: %v, error: %v\n", name, err)
	}

	if foundError {
		return errors.New("Some servers fail to start. See output for more details")
	}

	return nil
}

func etcdClusterIsStopped() error {

	for _, etcdServer := range etcdServers {
		etcdServer.Server.Stop()
	}
	return nil
}

func getInitialCluster() string {

	initialCluster := ""

	for index, name := range names {
		if index > 0 {
			initialCluster += ","
		}
		initialCluster += name + "=" + peerEndpoints[index]
	}
	return initialCluster
}
