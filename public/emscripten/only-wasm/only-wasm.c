#include <stdio.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
void hello() {
    printf("Hello, World!\n");
}

EMSCRIPTEN_KEEPALIVE
int main() {
    // Empty main function
    return 0;
}
