#!/bin/bash


# Auto compiles all the c and c++ files

cd foobar
emcc foobar.c -o foobar.js -s EXPORTED_FUNCTIONS='["_main", "_foo", "_bar"]' -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
cd ..

cd hello-cpp
em++ hello-cpp.cpp -o hello-cpp.js
cd ..

cd hello_world
emcc hello_world.c -o hello_world.js -s EXPORTED_FUNCTIONS='["_hello"]' -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]'
cd ..

cd math_string_array
emcc math_string_array.c -o math_string_array.js -s EXPORTED_FUNCTIONS='["_add", "_subtract", "_get_length", "_sum_array", "_malloc", "_free","_HEAP32"]' -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
cd ..

cd only-wasm
emcc only-wasm.c -s STANDALONE_WASM -s EXPORTED_FUNCTIONS='["_hello"]' -o only-wasm.wasm
cd ..

cd structs-if-for
emcc structs-if-for.c -o structs-if-for.js -s EXPORTED_FUNCTIONS='["_printPerson", "_classifyGrade", "_sumOfNumbers", "_countToN", "_malloc","_free"]' -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
cd ..









