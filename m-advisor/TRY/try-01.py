import numpy as np
from pymongo import MongoClient
from sklearn.cluster import KMeans

client = MongoClient()
db = client["movie-advisor"]

Subject = db["Subject"]
SubjectMark = db["SubjectMark"]

def main():
    subject_type = "tv"

    print("Loading watched %ss..." % subject_type)
    subjects = list(Subject.find({ "subjectType": subject_type }))
    print("%d %ss were loaded." % (len(subjects), subject_type))

    print("Loading watched list...")
    watched_ids = [ subject["subjectId"] for subject in SubjectMark.find({ "subjectType": subject_type }, [ "subjectId" ])]
    print("%d %ss were in the watched list." % (len(watched_ids), subject_type))

    print("Loading watched %ss for training..." % subject_type)
    training_subjects = list(Subject.find({ "subjectType": subject_type, "subjectId": { "$in": watched_ids } }))
    print("%d %ss were loaded." % (len(training_subjects), subject_type))

    print("Loading feature dictonary...")
    feature_values = {}
    for subject in subjects:
        if subject["countries"]:
            for i, name in enumerate(subject["countries"]):
                if i > 4:
                    # We only focus on the leading countries
                    break
                feature_values[name] = feature_values.get(name, 0) + 1
        if subject["genres"]:
            for i, name in enumerate(subject["genres"]):
                if i > 4:
                    # We only focus on the leading genres
                    break
                feature_values[name] = feature_values.get(name, 0) + 1
        if subject["casts"]:
            for i, name in enumerate(subject["casts"]):
                if i > 5:
                    # We only focus on the leading persons
                    break
                feature_values[name] = feature_values.get(name, 0) + 1
        if subject["directors"]:
            for i, name in enumerate(subject["directors"]):
                if i > 3:
                    # We only focus on the leading directors
                    break
                feature_values[name] = feature_values.get(name, 0) + 1
    print("%d feature values were loaded." % len(feature_values))

    selected_feature_valued = {}
    for name, times in feature_values.items():
        if times > 2:
            selected_feature_valued[name] = len(selected_feature_valued)
    print("%d of them were selected as feature values." % len(selected_feature_valued))

    training_dataset, training_labels = convert_to_dataset(training_subjects, selected_feature_valued)
    n_cluster = 10
    kmeans = KMeans(n_cluster)
    results = kmeans.fit_predict(training_dataset)
    for cluster_index in range(n_cluster):
        print("\n")
        print("***************")
        print("* Group %d" % (cluster_index + 1))
        print("***************")
        for subject_index, result in enumerate(results):
            if result == cluster_index:
                print(training_labels[subject_index][0])
        print("\n")






def convert_to_dataset(subjects, feature_values):
    print("Converting subjects to dataset...")
    labels = []
    dataset = []
    dim = len(feature_values)
    for subject in subjects:
        vec = np.zeros((dim,))
        cast_count = len(subject["casts"])
        director_count = len(subject["directors"])
        country_count = len(subject["countries"])
        for i, name in enumerate(subject["casts"]):
            if name in feature_values:
                index = feature_values[name]
                weight = ((cast_count - i) / cast_count) ** 2
                vec[index] += weight
        for i, name in enumerate(subject["directors"]):
            if name in feature_values:
                index = feature_values[name]
                weight = ((director_count - i) / director_count) ** 2
                vec[index] += weight
        if vec.sum() == 0:
            continue
        for i, name in enumerate(subject["countries"]):
            if name in feature_values:
                index = feature_values[name]
                vec[index] += ((country_count - i) / country_count) ** 2
        for i, name in enumerate(subject["genres"]):
            if name in feature_values:
                index = feature_values[name]
                vec[index] += (10 - 1) * 10
        dataset.append(vec)
        labels.append(
            (subject["title"], subject["casts"])
        )

    return (np.array(dataset), labels)


if __name__ == "__main__":
    main()
