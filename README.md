# kmdb (Kevin's Movie Database)

## requirements

* Python
* Yarn
* Docker

## references

https://runnable.com/docker/python/dockerize-your-flask-application

https://testdriven.io/blog/dockerizing-flask-with-postgres-gunicorn-and-nginx/

https://blog.lateral.io/2015/05/full-text-search-in-milliseconds-with-postgresql/

## shortcuts

* /api/unstable/movies requires a list of records with keys that match the header rows in the CSV data
* Error handling in API server is insufficient
* No authentication is required to manipulate the database
* Not sure if all wiki pages are wikipedia so I couldn't do anything fancy with the links
* No loading animation while fetching movies
* Copied React components I created for another project to this one
* Didn't handle uninitialized database in frontend
* Did not get chance to add any database modification UI components.
* No production React server.

## setup

```
$ <PROJECT_ROOT>/setup.sh
```

Run the csv_ingest.py script as instructed by setup.sh

```
$ cd frontend
$ yarn install
$ yarn start
```

## API

API is intended to be RESTful and operate on movie resources.

### Retreive movies

GET /api/unstable/movies

Returns a JSON object `movies` that contains a list of movie objects.

GET /api/unstable/movies/<id>

Return a single 'movie' object.

### Create movies

POST /api/unstable/movies

Payload should be JSON string that describes an object, `movies` that contains a list of movie objects.

### Modify movies

PATCH /api/unstable/movies/<id>

Payload should contain the updated fields and an incremented revision filed. Example:

For movie:

```
{
  "cast_of_characters": "Geoffrey Rush\nJoel Edgerton\nAnthony LaPaglia\nClaudia Karvan",
  "director": "Tatia Rosenthal",
  "genre": "animation drama",
  "id": "19d33f0f-8f7b-482c-93cb-74fd30c4e06c",
  "origin": "Australian",
  "plot": "The film mainly focuses on 28-year-old Dave Peck, who is unemployed but prefers the search for the meaning of life to the search for gainful employment. While looking in a magazine, Dave finds an advertisement for a book that will tell him the meaning of life \"for the low price of $9.99.\" Dave, fascinated by this, begins his journey in his Sydney apartment to find the true meaning of life.\nAs the film progresses, stories of Dave's family and neighbours are woven in and examine the post-modern meaning of hope.",
  "release_year": "2009",
  "revision": 0,
  "title": "$9.99",
  "wiki_page": "https://en.wikipedia.org/wiki/$9.99"
},
```

Sending the following patch:

```
{"patch": {
	"revision": "1",
	"director": "Kevin Van Leer"
}}
```

will change the `director` field to "Kevin Van Leer" and increment the `revision` field.

### Delete movie

DELETE /api/unstable/movies/<id>

Deletes the specified movie resource.
