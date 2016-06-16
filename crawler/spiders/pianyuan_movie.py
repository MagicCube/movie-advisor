# -*- coding: utf-8 -*-

import re

import scrapy
from scrapy import Request
from scrapy.linkextractors import LinkExtractor

from crawler.items import MovieItem

class PianyuanMovieSpider(scrapy.Spider):
    name = "pianyuan.mv"
    allowed_domains = [ "pianyuan.net" ]
    start_urls = (
        "http://pianyuan.net/mv?p=1",
    )

    def parse(self, response):
        next_page_url = response.urljoin(response.xpath('//ul[@class="pagination"]/li[@class="active"]/following-sibling::li/a/@href').extract_first())
        yield Request(next_page_url, callback=self.parse)

        for link in response.css("h5 a"):
            title = link.css("::text").extract_first()
            py_url = response.urljoin(link.css("::attr(href)").extract_first())
            movie = MovieItem({
                "title": title,
                "py_url": py_url
            })
            yield Request(py_url, callback=self.parse_movie_detail, meta={ "movie": movie })


    def parse_movie_detail(self, response):
        movie = response.meta["movie"]
        search_result = re.search(r'm_([a-zA-Z0-9]+)\.html', response.url)
        if search_result:
            id = search_result.group(1)
        else:
            id = response.url
        movie["py_id"] = id
        img_url = response.css("a.thumbnail img::attr(src)").extract_first()
        if img_url.startswith("//"):
            img_url = "http:" + img_url
        h1 = response.css("h1::text").extract_first().strip()
        if h1:
            movie["fullTitle"] = h1
            search_result = re.search(r'\((\d{4})\)', h1)
            if search_result:
                movie["year"] = int(search_result.group(1))
                movie["fullTitle"] = h1.replace("(%d)" % movie["year"], "").strip()
        movie["imageUrl"] = img_url
        score = response.css(".score .sum b::text").extract_first() + response.css(".score .sum::text").extract_first()
        try:
            movie["rating"] = float(score)
        except ValueError:
            movie["rating"] = 0.0
        for li in response.css("ul.detail li"):
            field_name = li.css("strong::text").extract_first().strip()[:-1]
            div = li.css("div")
            field_value = div.css("::text").extract_first().strip()
            if field_name == "imdb":
                movie["imdb"] = div.css("a::text").extract_first()
            elif field_name == "地区":
                movie["countries"] = field_value.split(",")
            elif field_name == "类型":
                movie["genres"] = field_value.split(",")
            elif field_name == "导演":
                movie["directors"] = div.css("a::text").extract()
            elif field_name == "主演":
                movie["casts"] = div.css("a::text").extract()
        return movie
