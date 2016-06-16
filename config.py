import json
from os.path import abspath, dirname

__config__ = None

def load_config():
    print("Loading config")
    with open(dirname(abspath(__file__)) + "/config.js") as fr:
        global __config__
        __config__ = json.load(fr)

def settings():
    global __config__
    if not __config__:
        load_config()
    return __config__

def setting(key):
    config = settings()
    return config[key]
