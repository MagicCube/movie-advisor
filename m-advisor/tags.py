from pymongo import ASCENDING
from dbconn import *

__tag_cache__ = {}

def generate_tag_dict(tag_type):
    if tag_type in __tag_cache__:
        return __tag_cache__[tag_type]
    dict = {}
    tags = Tag.find({ "tagType": tag_type }).sort("order", ASCENDING)
    i = 0
    for tag in tags:
        dict[tag["name"]] = i
        i += 1
    __tag_cache__[tag_type] = dict
    return dict
