---
title: 'Building VirtuCAN: A Virtual CAN Bus Simulation Using AVR Microcontrollers'
date: '2024-03-08'
excerpt: 'Learn how to create VirtuCAN, a virtual CAN bus simulation over UART using AVR microcontrollers. This article covers project setup, implementation details, and practical usage.'
author: 'YEZZFUSL'
---
In the world of automotive and industrial automation, the Controller Area Network (CAN) bus plays a crucial role in facilitating communication between various electronic control units (ECUs). However, working with actual CAN hardware can be challenging and expensive, especially for educational or prototyping purposes. This is where VirtuCAN comes in – a virtual CAN bus simulation that runs over UART using AVR microcontrollers.

In this article, we'll walk through the process of creating VirtuCAN from scratch, exploring its implementation, features, and practical applications.

## Project Overview

VirtuCAN(https://github.com/yezzfusl/VirtuCAN) is an open-source project that simulates a CAN bus environment using two AVR microcontrollers (such as those found on Arduino boards) communicating over UART. This setup allows developers and students to experiment with CAN protocol concepts without the need for specialized CAN hardware.

Key features of VirtuCAN include:

1. 29-bit message ID support
2. Up to 8 bytes of data per message
3. CRC-16 for error detection
4. Timeout-based reception
5. Start and end bytes for message framing
6. Basic arbitration simulation

## Setting Up the Project Structure

To begin, let's set up our project structure:
- VirtuCAN/
- ├── src/
- │   ├── transmitter.c
- │   ├── receiver.c
- │   ├── uart.c
- │   └── can_protocol.c
- ├── inc/
- │   ├── uart.h
- │   └── can_protocol.h
- ├── Makefile
- ├── .gitignore
- ├── LICENSE
- └── README.md

This structure separates our source files, header files, and build configuration, making the project easy to navigate and maintain.

## Implementing the CAN Protocol

The heart of VirtuCAN lies in its CAN protocol implementation. Let's break down the key components:

### Message Format

We'll define our CAN message structure in `can_protocol.h`:

```c
typedef struct {
    uint32_t id;        // 29-bit identifier
    uint8_t data[8];    // Up to 8 bytes of data
    uint8_t dlc;        // Data length code
    uint16_t crc;       // CRC-16 checksum
} CANMessage;
```

### Message Framing
To reliably transmit CAN messages over UART, we'll use start and end bytes:
```c
#define START_BYTE 0x7E
#define END_BYTE   0x7F
```
### CRC Calculation
```c
uint16_t calculate_crc16(uint8_t *data, uint8_t length) {
    uint16_t crc = 0xFFFF;
    for (uint8_t i = 0; i < length; i++) {
        crc ^= (uint16_t)data[i] << 8;
        for (uint8_t j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc <<= 1;
            }
        }
    }
    return crc;
}
```

### Message Transmission
The `transmit_can_message` function in `can_protocol.c` will handle the process of sending a CAN message:
```c
void transmit_can_message(CANMessage *msg) {
    uart_transmit(START_BYTE);
    
    // Transmit ID (29 bits)
    for (int i = 3; i >= 0; i--) {
        uart_transmit((msg->id >> (i * 8)) & 0xFF);
    }
    
    // Transmit DLC
    uart_transmit(msg->dlc);
    
    // Transmit data
    for (int i = 0; i < msg->dlc; i++) {
        uart_transmit(msg->data[i]);
    }
    
    // Calculate and transmit CRC
    msg->crc = calculate_crc16((uint8_t*)msg, sizeof(CANMessage) - sizeof(uint16_t));
    uart_transmit(msg->crc >> 8);
    uart_transmit(msg->crc & 0xFF);
    
    uart_transmit(END_BYTE);
}
```

### Message Reception
The receiver will implement a state machine to handle message reception:
```c
typedef enum {
    WAITING_FOR_START,
    RECEIVING_ID,
    RECEIVING_DLC,
    RECEIVING_DATA,
    RECEIVING_CRC,
    WAITING_FOR_END
} ReceiverState;

void receive_can_message(void) {
    static ReceiverState state = WAITING_FOR_START;
    static CANMessage rx_msg;
    static uint8_t byte_count = 0;
    
    if (uart_data_available()) {
        uint8_t received_byte = uart_receive();
        
        switch (state) {
            case WAITING_FOR_START:
                if (received_byte == START_BYTE) {
                    state = RECEIVING_ID;
                    byte_count = 0;
                }
                break;
            
            case RECEIVING_ID:
                rx_msg.id = (rx_msg.id << 8) | received_byte;
                if (++byte_count == 4) {
                    state = RECEIVING_DLC;
                }
                break;
            
            // ... (implement other states)
            
            case WAITING_FOR_END:
                if (received_byte == END_BYTE) {
                    // Message successfully received
                    process_received_message(&rx_msg);
                    state = WAITING_FOR_START;
                }
                break;
        }
    }
}
```

### Implementing CAN Bus Arbitration
One of the key features of CAN is its arbitration mechanism, which resolves conflicts when multiple nodes attempt to transmit simultaneously. In our virtual implementation, we'll simulate this process using a simple priority-based approach:
```c
bool attempt_transmission(CANMessage *msg) {
    // Simulate a random delay to mimic real-world timing variations
    _delay_ms(rand() % 10);
    
    // Check if the bus is idle (no ongoing transmissions)
    if (is_bus_idle()) {
        // Attempt to gain bus access
        set_bus_state(TRANSMITTING);
        
        // Simulate the arbitration process
        for (int i = 28; i >= 0; i--) {
            bool our_bit = (msg->id >> i) & 0x01;
            bool bus_bit = read_bus_state();
            
            if (our_bit == 1 && bus_bit == 0) {
                // We lost arbitration
                set_bus_state(IDLE);
                return false;
            }
            
            // Write our bit to the bus
            write_bus_state(our_bit);
            _delay_us(BIT_TIME);
        }
        
        // We won arbitration, proceed with message transmission
        transmit_can_message(msg);
        return true;
    }
    
    return false;
}
```
This function simulates the arbitration process by comparing each bit of the message ID with the current bus state. If a node detects a dominant bit (0) while trying to transmit a recessive bit (1), it loses arbitration and backs off.

### Building and Uploading the Project
To simplify the build process, we'll use a Makefile:
```makefile
MCU = atmega328p
F_CPU = 16000000UL
BAUD = 9600
PROGRAMMER = arduino

CFLAGS = -Os -DF_CPU=$(F_CPU) -DBAUD=$(BAUD) -mmcu=$(MCU)
LDFLAGS = -mmcu=$(MCU)

SRC = src/uart.c src/can_protocol.c
TRANSMITTER_SRC = $(SRC) src/transmitter.c
RECEIVER_SRC = $(SRC) src/receiver.c

all: transmitter.hex receiver.hex

transmitter.hex: $(TRANSMITTER_SRC)
	avr-gcc $(CFLAGS) $(TRANSMITTER_SRC) -o transmitter.elf
	avr-objcopy -O ihex -R .eeprom transmitter.elf transmitter.hex

receiver.hex: $(RECEIVER_SRC)
	avr-gcc $(CFLAGS) $(RECEIVER_SRC) -o receiver.elf
	avr-objcopy -O ihex -R .eeprom receiver.elf receiver.hex

upload_transmitter: transmitter.hex
	avrdude -p $(MCU) -c $(PROGRAMMER) -P /dev/ttyACM0 -U flash:w:transmitter.hex

upload_receiver: receiver.hex
	avrdude -p $(MCU) -c $(PROGRAMMER) -P /dev/ttyACM1 -U flash:w:receiver.hex

clean:
	rm -f *.elf *.hex
```

This Makefile allows us to build and upload both the transmitter and receiver code to their respective Arduino boards.


### Practical Usage
- To use VirtuCAN:

1. Connect two Arduino Uno boards via their UART pins (TX to RX, RX to TX, and GND to GND).
2. On the transmitter Arduino, connect a pushbutton to digital pin 2 (PD2) and GND.
3. On both Arduinos, connect an LED with a current-limiting resistor to digital pin 13 (PB5) and GND.
4. Build and upload the transmitter and receiver code to their respective Arduinos.
5. Press the button on the transmitter Arduino to send a CAN message.
6. The LED on the transmitter will toggle to indicate a message was sent.
7. If the message is successfully received, the LED on the receiver will toggle.


### Conclusion
VirtuCAN provides a valuable tool for learning and experimenting with CAN bus concepts without the need for specialized hardware. By implementing core CAN features like message formatting, error detection, and arbitration, it offers a realistic simulation environment for developers and students alike.
As you continue to work with VirtuCAN, consider expanding its capabilities by adding support for:

1. Multiple nodes on the virtual bus
2. Different message priorities and arbitration scenarios
3. Error injection for testing robustness
4. Integration with real CAN hardware for hybrid setups

By exploring these advanced topics, you'll gain a deeper understanding of CAN bus technology and its applications in modern embedded systems.
Remember, while VirtuCAN is an excellent learning tool, it's important to transition to real CAN hardware when developing for production environments. The skills and knowledge gained from working with VirtuCAN will provide a solid foundation for working with actual CAN systems in the future.


