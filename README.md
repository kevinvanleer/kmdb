# kmdb (Kevin's Movie Database)

## sources

https://runnable.com/docker/python/dockerize-your-flask-application
https://testdriven.io/blog/dockerizing-flask-with-postgres-gunicorn-and-nginx/
https://blog.lateral.io/2015/05/full-text-search-in-milliseconds-with-postgresql/

## shortcuts

. /api/unstable/movies requires a list of records with keys that match the header rows in the CSV data
. Error handling in API server is insufficient
. No authentication is required to manipulate the database
. Not sure if all wiki pages are wikipedia
. No loading animation while fetching movies
. Copied React components I created for another project to this one
. Didn't handle uninitialized database in frontend

## setup

```
$ <PROJECT_ROOT>/setup.sh
```

Run the csv_ingest.sh script as instructed by setup.sh

```
$ cd frontend
$ yarn install
$ yarn start
```
