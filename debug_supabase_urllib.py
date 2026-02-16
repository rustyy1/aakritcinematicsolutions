import urllib.request
import json

url = "https://vharvahgmlilbuppwjdh.supabase.co/rest/v1/portfolio?select=*"
headers = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoYXJ2YWhnbWxpbGJ1cHB3amRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMDgzMDAsImV4cCI6MjA4NTc4NDMwMH0.e9qrPlfkRM-FfdQhD1DLV4dSB33vcR8fFoGGc7lf8ms",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoYXJ2YWhnbWxpbGJ1cHB3amRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMDgzMDAsImV4cCI6MjA4NTc4NDMwMH0.e9qrPlfkRM-FfdQhD1DLV4dSB33vcR8fFoGGc7lf8ms"
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        data = response.read()
        print(json.dumps(json.loads(data), indent=2))
except Exception as e:
    print(f"Error: {e}")
