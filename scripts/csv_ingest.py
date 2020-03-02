import csv


def ingest_csv(filename):
    with open(filename) as csvfile:
        movies = csv.DictReader(csvfile)
        for row in movies:
            print(row['Release Year'])


def main():
    import argparse

    arg_parser = argparse.ArgumentParser(description="Kevin's Movie Database CSV ingest tool")
    arg_parser.add_argument('filename', type=str, help="Path to CSV file to ingest")

    args = arg_parser.parse_args()

    ingest_csv(args.filename)


if __name__ == '__main__':
    main()
