import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutoVO

def get_autos():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for automobile in content['automobiles']:
        AutoVO.objects.update_or_create(
            vin=automobile["vin"]
        )

def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_autos()
            pass
        except Exception as e:
            print('except error', e, file=sys.stderr)

        time.sleep(5)


if __name__ == "__main__":
    poll()
