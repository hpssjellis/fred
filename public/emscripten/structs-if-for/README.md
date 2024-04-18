emcc structs-if-for.c -o structs-if-for.js -s EXPORTED_FUNCTIONS='["_printPerson", "_classifyGrade", "_sumOfNumbers", "_countToN", "_malloc","_free"]' -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
