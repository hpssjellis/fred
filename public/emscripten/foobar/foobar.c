#include <emscripten.h>
#include <stdlib.h> // Include standard library for rand()
#include <time.h>   // Include time library to seed random number generator

EMSCRIPTEN_KEEPALIVE
const char* foo() {
    return "foo";
}

EMSCRIPTEN_KEEPALIVE
const char* bar() {
    return "bar";
}

EMSCRIPTEN_KEEPALIVE
int main() {
    // Seed the random number generator
    srand(time(NULL));
    // Return a random number
    return rand();
}
