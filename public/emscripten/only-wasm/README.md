emcc only-wasm.c -s STANDALONE_WASM -s EXPORTED_FUNCTIONS='["_hello"]' -o only-wasm.wasm
