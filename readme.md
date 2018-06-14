## Docker Installation

*Date: 14 Jun 2018*



# Guide
### Build Image:
we need to cd to the folder that has Dockerfile and run follow syntax:
`docker build -t "imageName" <path>`

##### Example:
`docker build -t friendlyhello .`
##### Explaintion:
+ friendhello: name of image
+ . : the dot at the end of command indicate we are using current directory
### Run docker
`docker run -d -p 4000:8000  --link my-redis-container:redis  --name hello friendlyhello:latest`
Options:
+ -d : run in background
+ -p : nat port 4000 -> 8000 in docker
+ --link : link container named my-redis-container as redis so inside docker can access my-redis-container by request name 'redis'
+ --name hello : name of container
+ friendlyhello:latest : friendlyhello is name of image that need to create container and tag latest

### Stop container 

`docker container stop container_id`
### Access container  
`docker exec -it container_id bash`
### Remove inactive dockers container
`docker container prune`
### remove inactive dockers images
`docker image prune -a`
### Get ip of mongo instance and point code to this

```
docker inspect container_id | grep '"IPAddress"' | head -n 1
docker exec -it container_id hostname -I
```

# Deploy 
## Create network
We need to create a network to allow all container join in so they can communicate between each other.

`docker network create --subnet=172.18.0.0/16 --gateway 172.18.0.1 mynet123`

Explain: I create a network with ip begin with 172.18.0.* and remember add gateway so container can communicate wit each other.


## Create Redis docker 
```
docker pull redis
docker run -d  --net mynet123 -p 6378:6379 --name myredis redis:latest
```

Explain: 
+ the first line will create redis image from docker ( default tag is latest)
+ second line will create container with ip is 172.18.0.2 and belong network mynet123 with name is myredis

## Create API docker
```
docker build -t my_code .
docker run -d  --net mynet123 -p 3000:3000 --name code03 my_code:latest
```

