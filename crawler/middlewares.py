# -*- coding: utf-8 -*-

import random
import base64
from crawler.settings import PROXIES

class RandomUserAgent(object):
    def __init__(self, agents):
        self.agents = agents

    @classmethod
    def from_crawler(cls, crawler):
        return cls(crawler.settings.getlist('USER_AGENTS'))

    def process_request(self, request, spider):
        request.headers.setdefault("User-Agent", random.choice(self.agents))

class ProxyMiddleware(object):
    def process_request(self, request, spider):
        proxy = random.choice(PROXIES)
        request.meta['proxy'] = "http://%s" % proxy['ip_port']
