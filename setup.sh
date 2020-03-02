#!/bin/bash

docker kill kmdb-api-server kmdb-postgres
docker rm kmdb-api-server kmdb-postgres
docker network rm kmdb-net

docker pull postgres
docker run --rm --name kmdb-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

cd ./backend
docker build -t kmdb-api-server:latest .
docker run --rm -d -p 5000:5000 --name kmdb-api-server kmdb-api-server 

docker network create kmdb-net
docker network connect kmdb-net kmdb-postgres
docker network connect kmdb-net kmdb-api-server

echo "run:"
echo
echo "$ python <repo_root>/scripts/csv_ingest.py <filepath>"
echo
echo "to initialize database"
