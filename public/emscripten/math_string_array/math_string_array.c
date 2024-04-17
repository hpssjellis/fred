#include <stdio.h>
#include <emscripten.h>
#include <string.h>

// Addition and subtraction functions
EMSCRIPTEN_KEEPALIVE
int add(int a, int b) {
    return a + b;
}

EMSCRIPTEN_KEEPALIVE
int subtract(int a, int b) {
    return a - b;
}

// String length function
EMSCRIPTEN_KEEPALIVE
int get_length(const char* str) {
    return strlen(str);
}

// Array sum function
EMSCRIPTEN_KEEPALIVE
int sum_array(int* array, int length) {
    int sum = 0;
    for (int i = 0; i < length; i++) {
        sum += array[i];
    }
    return sum;
}
