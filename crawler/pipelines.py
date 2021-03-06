# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import config
import pymongo

from crawler.items import MovieItem, TvItem

class MongoDbPipeline(object):
    def __init__(self):
        mongodb_settings = config.setting("mongodb")
        connection = pymongo.MongoClient(
            mongodb_settings["host"],
            mongodb_settings["port"]
        )
        db = connection[mongodb_settings["db"]]
        collection = db["Subject"]
        # Build indices
        collection.create_index([ ("subjectType", pymongo.ASCENDING) ])
        collection.create_index([ ("title", pymongo.ASCENDING) ])
        collection.create_index([ ("fullTitle", pymongo.ASCENDING) ])
        collection.create_index([ ("imdb", pymongo.ASCENDING) ])
        collection.create_index([ ("py_url", pymongo.ASCENDING) ])
        self.collection = collection

    def process_item(self, item, spider):
        if type(item) == TvItem:
            item["subjectType"] = "tv"
        else:
            item["subjectType"] = "movie"
        cursor = self.collection.find({ "py_url": item["py_url"] })
        if cursor.count() == 0:
            self.collection.insert(dict(item))
        else:
            print("DUPLICATED SUBJECT FOUND: %s" % item["py_url"])
        return item
