/*
  Maker100 Robotics - WebBLE Game Controller
  ble-v001

  Based on the BLE structure used in:
  webmcu-ai/on-device-ble-sensor-fusion-nano33

  XIAO ESP32-S3 / Seeed-style wiring:
    D6 = push button to 3V3
    D5 = external LED through resistor to GND
    Built-in LED is also used

  Browser protocol:
    ESP32 -> webpage: LEFT
    webpage -> ESP32: HIT
    webpage -> ESP32: RESET

  This is a deliberately small BLE version for the Maker100 class.
  It uses the same BLE service/control UUIDs as the existing
  on-device sensor-fusion project, plus its result characteristic.

  Requires:
    NimBLE-Arduino by h2zero
*/

#include <Arduino.h>
#include <NimBLEDevice.h>

const int myButtonPin = D6;
const int myLedPin = D5;

#define MY_BLE_SERVICE_UUID       "7e400001-b2c3-5d4e-af60-9b3c7d8eaf20"
#define MY_BLE_CONTROL_CHAR_UUID  "7e400002-b2c3-5d4e-af60-9b3c7d8eaf20"
#define MY_BLE_RESULT_CHAR_UUID   "7e400006-b2c3-5d4e-af60-9b3c7d8eaf20"

const char* myDeviceName = "ESP32-Fusion-01";

NimBLECharacteristic* myControlChar = nullptr;
NimBLECharacteristic* myResultChar = nullptr;

bool myLastButtonState = false;
bool myLedState = false;

void mySetLed(bool myState) {

  myLedState = myState;

  // XIAO built-in LED is commonly active LOW.
  digitalWrite(LED_BUILTIN, myState ? LOW : HIGH);

  // External LED on D5 is active HIGH.
  digitalWrite(myLedPin, myState ? HIGH : LOW);
}

void mySendResult(const char* myMessage) {

  if (!myResultChar) {
    return;
  }

  myResultChar->setValue(myMessage);
  myResultChar->notify();

  Serial.print("BLE -> WEB: ");
  Serial.println(myMessage);
}

class MyControlCallbacks : public NimBLECharacteristicCallbacks {

  void onWrite(NimBLECharacteristic* myCharacteristic,
               NimBLEConnInfo& myConnInfo) override {

    std::string myValue = myCharacteristic->getValue();

    if (myValue.length() == 0) {
      return;
    }

    String myCommand = String(myValue.c_str());
    myCommand.trim();
    myCommand.toUpperCase();

    Serial.print("WEB -> BLE: ");
    Serial.println(myCommand);

    if (myCommand == "HIT") {
      mySetLed(true);
      mySendResult("LED_ON");
    }

    if (myCommand == "RESET") {
      mySetLed(false);
      mySendResult("LED_OFF");
    }

    if (myCommand == "PING") {
      mySendResult("PONG");
    }
  }
};

void myStartBLE() {

  NimBLEDevice::init(myDeviceName);

  NimBLEServer* myServer = NimBLEDevice::createServer();

  NimBLEService* myService =
    myServer->createService(MY_BLE_SERVICE_UUID);

  myControlChar =
    myService->createCharacteristic(
      MY_BLE_CONTROL_CHAR_UUID,
      NIMBLE_PROPERTY::WRITE
    );

  myResultChar =
    myService->createCharacteristic(
      MY_BLE_RESULT_CHAR_UUID,
      NIMBLE_PROPERTY::READ |
      NIMBLE_PROPERTY::NOTIFY
    );

  myControlChar->setCallbacks(new MyControlCallbacks());

  myResultChar->setValue("BLE_V001_READY");

  myService->start();

  NimBLEAdvertising* myAdvertising =
    NimBLEDevice::getAdvertising();

  myAdvertising->addServiceUUID(MY_BLE_SERVICE_UUID);
  myAdvertising->setName(myDeviceName);
  myAdvertising->start();

  Serial.println("BLE_V001_READY");
  Serial.print("Advertising as: ");
  Serial.println(myDeviceName);
}

void setup() {

  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(myLedPin, OUTPUT);
  pinMode(myButtonPin, INPUT_PULLDOWN);

  mySetLed(false);

  Serial.begin(115200);
  delay(500);

  myStartBLE();
}

void loop() {

  bool myButtonState = digitalRead(myButtonPin);

  // Send only once when the button changes from released to pressed.
  if (myButtonState && !myLastButtonState) {
    mySendResult("LEFT");
  }

  myLastButtonState = myButtonState;

  delay(10);
}
