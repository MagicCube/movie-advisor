from pymongo import ASCENDING, MongoClient

__client = MongoClient()
db = __client["movie-advisor"]
Subject = db["Subject"]
SubjectMark = db["SubjectMark"]

Tag = db["Tag"]
Tag.create_index([ ("order", ASCENDING) ])
Tag.create_index([ ("name", ASCENDING) ])
Tag.create_index([ ("tagType", ASCENDING) ])
