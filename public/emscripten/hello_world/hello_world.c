#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
const char* hello() {
    return "Hello, World!";
}


EMSCRIPTEN_KEEPALIVE
int main() {
    // Empty main function
    return 0;
}
