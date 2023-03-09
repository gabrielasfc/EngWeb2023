import json

with open("dataset-extra1.json") as f:
    people = json.load(f)

for ind, p in enumerate(people["pessoas"]):
    p["id"] = f"p{ind}"

with open("dataset-extra2.json", "w") as f:
    json.dump(people, f)