# flask_web/app.py

from flask import Flask
from flask import request
from pymongo import MongoClient, ASCENDING
import json
from bson import ObjectId


class BSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


app = Flask(__name__)
app.json_encoder = BSONEncoder


def get_kmdb():
    client = MongoClient('kmdb-mongo', 27017)
    return client['kmdb']


def get_collection(collection):
    return get_kmdb()[collection]


@app.route('/')
def hello_world():
    return 'Hey, we have Flask in a Docker container!'


def list_movies(request):
    page_size = int(request.args.get('pageSize', 50))
    start_index = int(request.args.get('offset', 0))
    search_query = request.args.get('search', '')

    movies = get_collection('movies')

    if len(search_query) == 0:
        results = movies.find({}, sort=[('title', ASCENDING)], limit=page_size, skip=start_index)
    else:
        results = movies.find({'$text': {'$search': search_query}}, sort=[('title', ASCENDING)], limit=page_size, skip=start_index)

    return {'movies': [item for item in results], 'offset': start_index}


def insert_movies(request):
    movieData = None
    try:
        movieData = request.json.get('movies', None)
        if movieData is None:
            return 'Required key "movies" not found', 400
    except TypeError as e:
        print(e)
        return 'Request body format invalid', 400

    kmdb = get_kmdb()

    if 'movies' not in kmdb.list_collection_names():
        init_movies = kmdb['movies']
        init_movies.create_index([
            ('title', 'text'),
            ('release_year', 'text'),
            ('genre', 'text'),
            ('director', 'text'),
            ('cast_and_crew', 'text'),
            ('origin', 'text'),
            ('plot', 'text')])

    movies = kmdb['movies']

    key_swap = {
        'Release Year': 'release_year',
        'Title': 'title',
        'Origin/Ethnicity': 'origin',
        'Director': 'director',
        'Cast': 'cast_and_crew',
        'Genre': 'genre',
        'Wiki Page': 'wiki_page',
        'Plot': 'plot',
    }
    for movie in movieData:
        movie['revision'] = 0
        for old_key, new_key in key_swap.items():
            movie[new_key] = movie.pop(old_key)

    movies.insert_many(movieData)

    return 'OK'


@app.route('/api/unstable/movies', methods=['GET', 'POST'])
def handle_movies_request():
    if request.method == 'GET':
        return list_movies(request)
    elif request.method == 'POST':
        return insert_movies(request)
    else:
        return 404


def get_movie(movie_id):
    movies = get_collection('movies')
    return movies.find_one({'_id': ObjectId(movie_id)})


def modify_movie(movie_id, request):
    patchData = request.json.get('patch', None)
    if patchData.get('revision') is None:
        return 'Must specify new resource revision', 400
    patchData['_id'] = movie_id

    record = get_movie(movie_id)

    if int(patchData.get('revision')) != int(record.get('revision', 0)) + 1:
        return 'Revision mismatch', 400

    record.update(patchData)

    get_collection('movies').replace_one({'_id': ObjectId(movie_id)}, record)

    return record


def delete_movie(movie_id):
    get_collection('movies').delete_one({'_id': ObjectId(movie_id)})

    return 1


@app.route('/api/unstable/movies/<movie_id>', methods=['GET', 'PATCH', 'DELETE'])
def handle_movie_request(movie_id):
    if request.method == 'GET':
        return {'movie': get_movie(movie_id)}
    elif request.method == 'PATCH':
        return {'movie': modify_movie(movie_id, request)}
    elif request.method == 'DELETE':
        return {'deleted': delete_movie(movie_id)}
    else:
        return 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
