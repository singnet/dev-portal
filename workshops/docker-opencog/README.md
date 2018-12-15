# opencog-intro
simple examples for opencog

The demo requires docker and 64-bit OS and about 6GB  
of storage for docker image and data.

To run the demo clone this repository and use following instructions.

## running opencog introduction  
to load tar image

```
docker load -i demo-opencog.tar
```

to build docker image instead run

```
docker build docker -t demo-opencog
```

To start docker with simple examples notebook:  

```
docker run -p8888:8888  -it demo-opencog /home/relex/opencog-intro-master/notebook.sh 
```

If notebook successully started you should  
be able to open it at localhost:8888  
password for notebook is **password**

## running vqa demo
fetch data for vqa demo(on host, not inside a container)

```
wget https://s3-us-west-2.amazonaws.com/abelikov/data-small.tar.gz
```

unpack
```
tar -xvf data-small.tar.gz
```

To start vqa demo:

```
docker run -p8889:8888 -v `pwd`/data:/home/relex/projects/data -it demo-opencog /home/relex/projects/semantic-vision-1/experiments/opencog/pattern_matcher_vqa/vqa
```

If notebook successully started you should   
be able to open it at localhost:8889  
password for notebook is **password**

please open interface-images-demo notebook


