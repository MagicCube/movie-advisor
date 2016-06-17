# -*- coding: utf-8 -*-

from scrapy import Field, Item

class MovieItem(Item):
    subjectId = Field()
    subjectType = Field()
    title = Field()
    fullTitle = Field()
    year = Field()
    imageUrl = Field()
    imdb = Field()
    countries = Field()
    genres = Field()
    directors = Field()
    writers = Field()
    casts = Field()
    rating = Field()
    addTime = Field()

    # pianyuan.net
    py_url = Field()


class TvItem(MovieItem):
    pass
