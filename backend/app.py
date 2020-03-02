# flask_web/app.py

from flask import Flask
from flask import request
import psycopg2
import uuid

app = Flask(__name__)


POSTGRES_CONNECTION = "host=0.0.0.0 dbname=postgres user=postgres password=password"
COLUMNS = ['id', 'release_year', 'title', 'origin', 'director', 'cast_of_characters', 'genre', 'wiki_page', 'plot', 'revision']


def table_exists(table_name, cursor):
    cursor.execute("SELECT to_regclass('public.kmdb');")
    return cursor.fetchone()[0]


def row_to_json(row):
    record = {}
    for idx, item in enumerate(row):
        record[COLUMNS[idx]] = item
    return record


def rows_to_json(rows):
    json_data = []
    for row in rows:
        json_data.append(row_to_json(row))
    return json_data


@app.route('/')
def hello_world():
    return 'Hey, we have Flask in a Docker container!'


def list_movies(request):
    page_size = int(request.args.get('pageSize', 50))
    start_index = int(request.args.get('offset', 0))
    conn = psycopg2.connect(POSTGRES_CONNECTION)
    cur = conn.cursor()
    cur.execute("SELECT * FROM kmdb;")
    cur.scroll(start_index)
    rows = cur.fetchmany(page_size)
    return {'movies': rows_to_json(rows), 'offset': start_index}


def insert_movies(request):
    movieData = None
    try:
        movieData = request.json.get('movies', None)
        if movieData is None:
            return 'Required key "movies" not found', 400
    except TypeError as e:
        print(e)
        return 'Request body format invalid', 400

    conn = psycopg2.connect(POSTGRES_CONNECTION)
    cur = conn.cursor()

    if not table_exists('kmdb', cur):
        cur.execute("CREATE TABLE kmdb (id char (36) PRIMARY KEY, release_year smallint, title varchar, origin varchar, director varchar, cast_of_characters text, genre varchar, wiki_page varchar, plot text, revision integer);")

    for movie in movieData:
        movie['id'] = str(uuid.uuid4())
        cur.execute("""INSERT INTO kmdb (id, release_year, title, origin, director, cast_of_characters, genre, wiki_page, plot, revision) VALUES (%(id)s, %(Release Year)s, %(Title)s, %(Origin/Ethnicity)s, %(Director)s, %(Cast)s, %(Genre)s, %(Wiki Page)s, %(Plot)s, 0);""", movie)

    conn.commit()

    return 'OK'


"""
def delete_movies(request):
    print('Im here')
    id_list = request.json.get('ids', None)
    print(id_list)
    conn = psycopg2.connect(POSTGRES_CONNECTION)
    cur = conn.cursor()
    print('ready to execute')
    cur.execute("DELETE FROM kmdb WHERE id IN %s", (id_list,))
    rowcount = cur.rowcount
    conn.commit()

    return rowcount
"""


@app.route('/api/unstable/movies', methods=['GET', 'POST'])
def handle_movies_request():
    if request.method == 'GET':
        return list_movies(request)
    elif request.method == 'POST':
        return insert_movies(request)
    else:
        return 404


def get_movie(movie_id):
    conn = psycopg2.connect(POSTGRES_CONNECTION)
    cur = conn.cursor()
    cur.execute("SELECT * FROM kmdb WHERE id = %s", (movie_id,))
    retVal = row_to_json(cur.fetchone())
    return retVal


def modify_movie(movie_id, request):
    patchData = request.json.get('patch', None)
    if patchData.get('revision') is None:
        return 'Must specify new resource revision', 400
    patchData['id'] = movie_id

    conn = psycopg2.connect(POSTGRES_CONNECTION)
    cur = conn.cursor()
    cur.execute("SELECT * FROM kmdb WHERE id = %s", (movie_id,))
    record = row_to_json(cur.fetchone())
    print(patchData)
    print(record)

    if int(patchData.get('revision')) != int(record.get('revision', 0)) + 1:
        return 'Revision mismatch', 400

    record.update(patchData)

    cur.execute("""UPDATE kmdb SET (release_year, title, origin, director, cast_of_characters, genre, wiki_page, plot, revision) = (%(release_year)s, %(title)s, %(origin)s, %(director)s, %(cast_of_characters)s, %(genre)s, %(wiki_page)s, %(plot)s, %(revision)s) WHERE id = %(id)s;""", record)
    conn.commit()

    return record


def delete_movie(movie_id):
    conn = psycopg2.connect(POSTGRES_CONNECTION)
    cur = conn.cursor()
    cur.execute("DELETE FROM kmdb WHERE id = %s", (movie_id,))
    rowcount = cur.rowcount
    conn.commit()

    return rowcount


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
