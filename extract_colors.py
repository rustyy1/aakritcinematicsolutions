import urllib.request
import re
import collections

url = "https://www.behance.net/gallery/243595025/Brand-Identity"
try:
    req = urllib.request.Request(
        url, 
        data=None, 
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    )
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8', errors='ignore')
        
    hex_colors = re.findall(r'#[0-9a-fA-F]{6}', html)
    print("Found colors:")
    for color, count in collections.Counter(hex_colors).most_common(20):
        print(f"{color}: {count}")
        
except Exception as e:
    print(f"Error: {e}")
