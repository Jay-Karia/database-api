from pyfirmata import Arduino
import requests
import time

PORT: str = 'COM3' # Replace with desired port (find out your port either using arduino ide or device manager
RFID_SCANNER_PIN: int = 0 # Replace with used pin
api_url: str = "http://localhost:3000/api/store"


board: Arduino = Arduino(port)

while True:
    on: int = board.digital[RFID_SCANNER_PIN].read()
    if on:
        print("Scanned")
        requests.post(url=url, data={"name": "hello world"}) # Replace with desired data and url
    else:
        print("not scanned")
    time.sleep(1)

