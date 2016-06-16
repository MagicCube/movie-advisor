# -*- coding: utf-8 -*-

from scrapy import Field, Item

class MovieItem(Item):
    id = Field()
    title = Field()
    year = Field()
    imageUrl = Field()
    imdb = Field()
    countries = Field()
    genres = Field()
    directors = Field()
    casts = Field()
    rating = Field()

    # pianyuan.net
    py_url = Field()
