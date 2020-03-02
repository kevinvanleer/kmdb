import csv
import requests


def ingest_csv(filename):
    with open(filename) as csvfile:
        movies = csv.DictReader(csvfile)
        response = requests.post('http://localhost:5000/api/unstable/movies', json={'movies': list(movies)})
        if response.status_code >= 400:
            print(response.status_code, response.text)


def main():
    import argparse

    arg_parser = argparse.ArgumentParser(description="Kevin's Movie Database CSV ingest tool")
    arg_parser.add_argument('filename', type=str, help="Path to CSV file to ingest")

    args = arg_parser.parse_args()

    ingest_csv(args.filename)


if __name__ == '__main__':
    main()
