#!/bin/bash
rm -f data/movies_raw.json
scrapy crawl pianyuan.mv -o data/movies_raw.json
