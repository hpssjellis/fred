emcc math_string_array.c -o math_string_array.js -s EXPORTED_FUNCTIONS='["_add", "_subtract", "_get_length", "_sum_array"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap","malloc"]'
