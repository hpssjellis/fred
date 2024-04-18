



emcc foobar.c -o foobar.js -s EXPORTED_FUNCTIONS='["_main", "_foo", "_bar"]' -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'


.



## Other possible compiles.

// emcc foobar.c -o foobar.js

// emcc foobar.c -o foobar.js -s EXPORTED_FUNCTIONS='["_main", "_foo", "_bar"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -s MODULARIZE=1 -s 'EXPORT_NAME="Module"'


