import json
import requests

with open('dataset-extra1.json') as f:
    data = json.load(f)

for person in data['pessoas']:
    requests.post('http://localhost:3000/persons', json=person, headers={'Content-Type': 'application/json'})