from os.path import abspath, dirname
import pickle

from dbconn import *
import numpy as np
from sklearn.cluster import KMeans

from dbconn import *
import numpy as np
from sklearn.cluster import KMeans

from tags import generate_tag_dict
from models import save_model



def main():
    all_subjects = list(Subject.find())
    pass


if __name__ == "__main__":
    main()
