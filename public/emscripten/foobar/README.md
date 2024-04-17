emcc foobar.c -o foobar.js -s EXPORTED_FUNCTIONS='["_main", "_foo", "_bar"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'



//emcc foobar.c -o foobar.js




ChatGPT says to write it like

```

#include <stdio.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
void foo(void) {
    printf("foo\n");
}

EMSCRIPTEN_KEEPALIVE
void bar(void) {
    printf("bar\n");
}

int main() {
    printf("hello, world!\n");
    return 0;
}
```
