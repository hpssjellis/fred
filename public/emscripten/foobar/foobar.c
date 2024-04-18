#include <emscripten.h>

// Function that returns a constant string
EMSCRIPTEN_KEEPALIVE
const char* foo() {
    return "foo";
}

// Function that returns another constant string
EMSCRIPTEN_KEEPALIVE
const char* bar() {
    return "bar";
}

// Main function remains the same, but it's not necessary unless specifically called
EMSCRIPTEN_KEEPALIVE
const char* main() {
    return "hello, world!";
}

