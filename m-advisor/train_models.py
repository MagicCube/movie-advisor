from os.path import abspath, dirname
import pickle

from dbconn import *
from sklearn.cluster import KMeans

from models import convert_to_dataset_and_labels, save_model


def main():
    all_subjects = list(Subject.find())
    train_cluster_model(all_subjects, 20, "country", [ "countries" ])
    train_cluster_model(all_subjects, 100, "genre", [ "genres" ])
    train_cluster_model(all_subjects, 100, "artist", [ "directors", "writers", "casts" ])


def train_cluster_model(subjects, n_clusters, tag_type, subset_fields, n_top = 0):
    print("Training %s cluster model..." % tag_type)
    print("Converting dataset...")
    dataset, labels = convert_to_dataset_and_labels(subjects, tag_type, subset_fields, n_top = n_top)
    print("Converted to %d x %d dataset." % dataset.shape)
    print("Clustering %d records into %d groups..." % (len(dataset), n_clusters))
    model = KMeans(n_clusters)
    model.fit(dataset)
    save_model(tag_type + "-cluster", model)
    print()


if __name__ == "__main__":
    main()
