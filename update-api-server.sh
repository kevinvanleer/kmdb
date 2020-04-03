#!/bin/bash

docker kill kmdb-api-server
docker rm kmdb-api-server

cd ./backend
docker build -t kmdb-api-server:latest .
docker run --rm -d -p 5000:5000 --name kmdb-api-server kmdb-api-server 

docker network connect kmdb-net kmdb-api-server
