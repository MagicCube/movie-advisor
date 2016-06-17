from os.path import abspath, dirname
import pickle

import numpy as np

from tags import generate_tag_dict

def load_model(name):
    filename = "%s/models/%s.model" % (abspath(dirname(__file__)), name)
    with open(filename, "rb") as fr:
        return pickle.load(model, fr)

def save_model(name, model):
    filename = "%s/models/%s.model" % (abspath(dirname(__file__)), name)
    with open(filename, "wb") as fw:
        pickle.dump(model, fw)
    print("Model saved in %s." % filename)





def convert_to_dataset_and_labels(subjects, tag_type, subset_fields, n_top):
    tags = generate_tag_dict(tag_type)
    dim = len(tags)
    dataset = []
    labels = []
    subject_index = 0
    for subject in subjects:
        vec = np.zeros((dim,))
        for field in subset_fields:
            if field in subject:
                sub_set = subject[field]
                sub_set_count = len(sub_set)
                sub_set_position = 0;
                for item in sub_set:
                    if item in tags:
                        weight = (sub_set_count - sub_set_position) / sub_set_count
                        vec[tags[item]] += weight ** 2
                    sub_set_position += 1
        if np.sum(vec) > 0:
            dataset.append(vec)
            labels.append(subject["subjectId"])
    if n_top > 0 and len(dataset) > n_top:
        dataset = dataset[:n_top]
    return np.array(dataset), labels
