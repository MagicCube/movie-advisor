# -*- coding: utf-8 -*-

from scrapy import Field, Item

class MovieItem(Item):
    mediaType = Field()
    title = Field()
    fullTitle = Field()
    year = Field()
    imageUrl = Field()
    imdb = Field()
    countries = Field()
    genres = Field()
    directors = Field()
    casts = Field()
    rating = Field()
    addTime = Field()

    # pianyuan.net
    py_id = Field()
    py_url = Field()



class TvItem(MovieItem):
    pass
