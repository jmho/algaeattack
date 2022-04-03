import requests

endpoint = 'http://localhost:8000/api/v1/dataProcessor/logEntry'
dataEntry = {
    "name": "Device1",
    "salinity": 1,
    "sampleDepth": 2,
    "waterTemp": 3,
    "windSpeed": 7
}

x = requests.post(endpoint, json = dataEntry)

print(x.text)