#include <stdio.h>
#include <emscripten.h>

typedef struct {
    int id;
    char name[100];
} Person;

EMSCRIPTEN_KEEPALIVE
void printPerson(Person* p) {
    printf("ID: %d, Name: %s\n", p->id, p->name);
}

EMSCRIPTEN_KEEPALIVE
const char* classifyGrade(int grade) {
    if (grade >= 90) {
        return "Excellent";
    } else if (grade >= 70) {
        return "Good";
    } else if (grade >= 50) {
        return "Average";
    } else {
        return "Fail";
    }
}

EMSCRIPTEN_KEEPALIVE
int sumOfNumbers(int limit) {
    int sum = 0;
    for (int i = 1; i <= limit; i++) {
        sum += i;
    }
    return sum;
}

EMSCRIPTEN_KEEPALIVE
int countToN(int n) {
    int myCount = 0;
    int myTotal = 0;
    while (myCount < n) {
        myCount += 1;    // add count to the old count
        myTotal += myCount;
        printf("%d ", myCount);
    }
    return myTotal;
}
