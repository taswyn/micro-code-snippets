// pass a locally scoped argument using bind, to a named function
// NOTE that the parameter becomes the FIRST argument of the callee

var callbackFunction = function (arrayToSlice, elementFromEmpties, indexFromEmpties) {
    console.log({ arrayToSlice, indexFromEmpties });
}

var testFunction = () => {
    let targetEmptiesArray = Array();
    for (let i = 0; i < 5; i++) {
        targetEmptiesArray.push(i);
    }

    let arrayToSlice = Array();
    for (let i = 0; i < 20; i++) {
        arrayToSlice.push(i);
    }

    console.log({ arrayToSlice, targetEmptiesArray });
    console.log(this.arrayToSlice);

    targetEmptiesArray.forEach(callbackFunction.bind(null, arrayToSlice));
}

testFunction()

/*
{arrayToSlice: Array(20), targetEmptiesArray: Array(5)}
VM19986:13 (20) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
VM20093:4 {arrayToSlice: Array(20), indexFromEmpties: 0}
VM20093:4 {arrayToSlice: Array(20), indexFromEmpties: 1}
VM20093:4 {arrayToSlice: Array(20), indexFromEmpties: 2}
VM20093:4 {arrayToSlice: Array(20), indexFromEmpties: 3}
VM20093:4 {arrayToSlice: Array(20), indexFromEmpties: 4}
*/

// pass a locally scoped argument using this as thisArg of forEach, to a named function
// NOTE: must access the argument as a member of this
// if wanting to use the argument as its own name directly, must re-inialize in
// callee's own scope:

var callbackFunction = function (elementFromEmpties, indexFromEmpties) {
    let arrayToSlice = this.arrayToSlice;
    console.log({ arrayToSlice, indexFromEmpties });
}

var testFunction = () => {
    let targetEmptiesArray = Array();
    for (let i = 0; i < 5; i++) {
        targetEmptiesArray.push(i);
    }

    let arrayToSlice = Array();
    for (let i = 0; i < 20; i++) {
        arrayToSlice.push(i);
    }

    console.log({ arrayToSlice, targetEmptiesArray });
    console.log(this.arrayToSlice);

    targetEmptiesArray.forEach(callbackFunction, this);
}


// failing to do so results in the following behavior:

var callbackFunction = function (elementFromEmpties, indexFromEmpties) {
    console.log(arrayToSlice);
    let arrayToSlice = this.arrayToSlice;
    console.log({ arrayToSlice, indexFromEmpties });
}
/* VM15086:2 Uncaught ReferenceError: Cannot access 'arrayToSlice' before initialization
    at callbackFunction (<anonymous>:2:13)
    at Array.forEach (<anonymous>)
    at testFunction (<anonymous>:15:24)
    at <anonymous>:1:1
*/

// pass a locally scoped argument using it AS the thisArg of forEach, to a named function
// this provides some interesting isolation, nothing else is leaked
// from the original context
var callbackFunction = function (elementFromEmpties, indexFromEmpties) {
    arrayToSlice = this;
    console.log({ arrayToSlice, indexFromEmpties });
}

var testFunction = () => {
    let targetEmptiesArray = Array();
    for (let i = 0; i < 5; i++) {
        targetEmptiesArray.push(i);
    }

    let arrayToSlice = Array();
    for (let i = 0; i < 20; i++) {
        arrayToSlice.push(i);
    }

    console.log({ arrayToSlice, targetEmptiesArray });
    console.log(this.arrayToSlice);

    targetEmptiesArray.forEach(callbackFunction, arrayToSlice);
}


// Just use an anonymous function?
// NOTE: this can be a problem later if we decide to extrapolate these out into
// named functions, because of the related scope assumptions made here

// Arrow function works
var testFunction = () => {
    let targetEmptiesArray = Array();
    for (let i = 0; i < 5; i++) {
        targetEmptiesArray.push(i);
    }

    let arrayToSlice = Array();
    for (let i = 0; i < 20; i++) {
        arrayToSlice.push(i);
    }

    console.log({ arrayToSlice, targetEmptiesArray });

    targetEmptiesArray.forEach((elementFromEmpties, indexFromEmpties) => {
        console.log({ arrayToSlice, indexFromEmpties });
    });
}

// Old style anonymous definition works
var testFunction = () => {
    let targetEmptiesArray = Array();
    for (let i = 0; i < 5; i++) {
        targetEmptiesArray.push(i);
    }

    let arrayToSlice = Array();
    for (let i = 0; i < 20; i++) {
        arrayToSlice.push(i);
    }

    console.log({ arrayToSlice, targetEmptiesArray });

    targetEmptiesArray.forEach(function (elementFromEmpties, indexFromEmpties) {
        console.log({ arrayToSlice, indexFromEmpties });
    });
}