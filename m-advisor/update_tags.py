from os.path import abspath, dirname
import pickle

from dbconn import *
import numpy as np
from sklearn.cluster import KMeans

from dbconn import *
import numpy as np
from sklearn.cluster import KMeans

from tags import generate_tag_dict
from models import convert_to_dataset_and_labels, load_model



def main():
    all_subjects = list(Subject.find())
    subjects_to_be_updated = {}
    update_tags(subjects_to_be_updated, all_subjects, "country", [ "countries" ])
    update_tags(subjects_to_be_updated, all_subjects, "genre", [ "genres" ])
    update_tags(subjects_to_be_updated, all_subjects, "artist", [ "directors", "writers", "casts" ])
    save_tags(subjects_to_be_updated)
    pass


def update_tags(subjects_to_be_updated, subjects, tag_type, subset_fields):
    print("Updating %s tags..." % tag_type)
    print("Converting dataset...")
    dataset, labels = convert_to_dataset_and_labels(subjects, tag_type, subset_fields)
    print("Converted to %d x %d dataset." % dataset.shape)
    print("Loading KMeans model...")
    model = load_model(tag_type + "-cluster")
    group_indices = model.predict(dataset)
    index = 0
    print("Updating data using predicted values...")
    for group_index in group_indices:
        subject_id = labels[index]
        if subject_id not in subjects_to_be_updated:
            subjects_to_be_updated[subject_id] = {}
        subject = subjects_to_be_updated[subject_id]
        tag_name = "%sTag" % tag_type
        subject[tag_name] = int(group_index)
        index += 1
    print("Done.\n")


def save_tags(subjects):
    print("Saving tags...")
    for subjectId, subject in subjects.items():
        Subject.update_one({ "subjectId": subjectId }, { "$set": subject })
    print("Done.")


if __name__ == "__main__":
    main()
