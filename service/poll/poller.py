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
# Import models from service_rest, here.
# from service_rest.models import Something

def get_autos():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for automobile in content['autos']:
        AutoVO.objects.update_or_create(
            defaults={"vin": automobile["vin"]}
        )

def poll():
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            get_autos()
            pass
        except Exception as e:
            print('except error', e, file=sys.stderr)

        time.sleep(5)


if __name__ == "__main__":
    poll()
