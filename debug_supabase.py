import requests
import json

url = "https://vharvahgmlilbuppwjdh.supabase.co/rest/v1/portfolio?select=*"
headers = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoYXJ2YWhnbWxpbGJ1cHB3amRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMDgzMDAsImV4cCI6MjA4NTc4NDMwMH0.e9qrPlfkRM-FfdQhD1DLV4dSB33vcR8fFoGGc7lf8ms",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoYXJ2YWhnbWxpbGJ1cHB3amRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMDgzMDAsImV4cCI6MjA4NTc4NDMwMH0.e9qrPlfkRM-FfdQhD1DLV4dSB33vcR8fFoGGc7lf8ms"
}

response = requests.get(url, headers=headers)
if response.status_code == 200:
    print(json.dumps(response.json(), indent=2))
else:
    print(f"Error: {response.status_code}")
    print(response.text)
