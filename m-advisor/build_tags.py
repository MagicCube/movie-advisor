from dbconn import *

def main():
    (countries, genres, artists) = collect_tags()
    print("Removing old tags...")
    Tag.remove({})
    print("Saving tags...")
    save_tags("country", countries)
    save_tags("genre", genres)
    save_tags("artist", artists)
    print("All tags are now saved.")


def collect_tags():
    print("Collecting tags for global...")
    subjects = Subject.find()
    artists = {}
    countries = {}
    genres = {}
    # Basic counting
    for subject in subjects:
        tick(subject, "directors", 3, artists)
        tick(subject, "writers", 3, artists)
        tick(subject, "casts", 10, artists)
        tick(subject, "countries", 5, countries)
        tick(subject, "genres", 10, genres)
    # Extract valuable tags
    artists = select_valuable_tags(artists)
    countries = select_valuable_tags(countries, threshold=100)
    genres = select_valuable_tags(genres, threshold=2)
    print("Countries: %d" % len(countries))
    print("Genres: %d" % len(genres))
    print("Artists: %d" % len(artists))
    print("Total tags: %d" % (len(artists) + len(genres) + len(countries)))
    print()
    return (countries, genres, artists)


def select_valuable_tags(dict, max_count = 999999, threshold = 1):
    results = []
    items = dict.items()
    items = sorted(items, key=lambda item: item[1], reverse=True)
    for name, count in items:
        if count > threshold and len(results) < max_count:
            results.append({
                "name": name,
                "count": count
            })
        else:
            break
    return results


def tick(subject, field, max_position, value_dict):
    if field not in subject:
        return
    values = subject[field]
    if values:
        position = 0
        for value in values:
            if field == "genres" and value == "剧情":
                continue
            position += 1
            if position > max_position:
                break
            value_dict[value] = value_dict.get(value, 0) + 1


def save_tags(tag_type, tags):
    for tag in tags:
        Tag.insert({
            "name": tag["name"],
            "tagType": tag_type,
            "count": tag["count"]
        })
    pass



if __name__ == "__main__":
    main()
