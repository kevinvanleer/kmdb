#!/bin/bash

docker kill kmdb-api-server kmdb-mongo
docker rm kmdb-api-server kmdb-mongo
docker network rm kmdb-net

docker pull mongo
docker run --rm --name kmdb-mongo -d mongo:4.2-bionic 

cd ./backend
docker build -t kmdb-api-server:latest .
docker run --rm -d -p 5000:5000 --name kmdb-api-server kmdb-api-server 

docker network create kmdb-net
docker network connect kmdb-net kmdb-mongo
docker network connect kmdb-net kmdb-api-server

echo "run:"
echo
echo "$ python <repo_root>/scripts/csv_ingest.py <filepath>"
echo
echo "to initialize database"
