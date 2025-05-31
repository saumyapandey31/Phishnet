import re
from urllib.parse import urlparse

def extract_features(url):
    return [
        len(url),
        url.count('.'),
        int(bool(re.search(r'\d', url))),
        int(bool(re.search(r'http|https', url))),
        len(urlparse(url).netloc),
    ]
