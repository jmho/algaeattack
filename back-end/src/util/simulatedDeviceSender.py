import requests

endpoint = 'http://localhost:8000/api/v1/dataProcessor/logEntry'
dataEntries = {
    "safe":
    {
    "name": "Device1",
    "salinity": 1,
    "sampleDepth": 1,
    "waterTemp": 3,
    },
    "moderate":
    {
    "name": "Device2",
    "salinity": 1000,
    "sampleDepth": 3,
    "waterTemp": 120,
    },
    "unsafe":
    {
    "name": "Device3",
    "salinity": 1,
    "sampleDepth": 5,
    "waterTemp": 3,
    },
    
}

for danger in dataEntries:
    x = requests.post(endpoint, json = dataEntries[danger])
    print(f'{danger} - {x.text}')