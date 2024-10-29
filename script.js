/*I forgot to write down the pseudocode, so this is more like my
thought process rather than proper pseudocode 

1 - Take user input as array items
2 - Join the array items when an operator is selected, then add the operator as another item
3 - Take following input as more array items
4 - This makes it so the first array item is always the first half of the equation, the second
item is always the operator and everything after that is the second half of the equation.
5 - Join everything starting from the third item and call the proper calculation based on which
operator is in between
6 - Return result plus an operator if it was selected instead of =

This was the pseudo-pseudocode, turns out there's a lot more to a calculator than it seems, so
I added to the code as unintended behaviour was found, which made it kinda messy in the end.
*/

let displayMain = document.getElementById("displayMain");
let topRow = document.getElementById("toprow");
let numpad = document.getElementById("numpad");
let operations = document.getElementById("operations")

let values = [];
let operationChoice = "";

// functions to execute operations

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a , b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return "ERROR";
    }
    return a / b;
}

// this calls the individual functions to execute them with the given values.

function operate(a, b, c) {
    if (c === "+") {
        return add(a,b);
    }else if (c === "-") {
        return subtract(a,b);
    }else if (c === "×") {
        return multiply(a,b);        
    }else if (c === "÷") {
        return divide(a,b);
    }
}

// undo clears the latest item on the values array. Because the first
// half of the equation gets turned into a single array item after an
// operator is selected, this checks if the latest item is longer than
// 1 character in length. If it is, it gets split back into individual
// array items.

function undoDisplay() {
    if (values[values.length-1].length > 1) {
        values = values[values.length-1].split("");
    }
    values.pop();
    console.log(values);
    displayMain.innerText = values.join("");
}

// clear display

function clearDisplay() {
    values.splice(0);
    displayMain.innerText = values;
}

// this checks if the second value isn't an operator.

function checkOperator() {
    if (values[1] !== "-" &&
        values[1] !== "+" &&
        values[1] !== "×" &&
        values[1] !== "÷") {
            return true;
    }
}

// topRow listener for the undo and clear buttons

topRow.addEventListener("click", function(e) {
    if (e.target.className.includes("btn")) {
        if (e.target.innerText === "UNDO") {
            undoDisplay();
        } else {
            clearDisplay();
        }
    }
})

// numpad listener. It does several things:
// 1 - clear ERROR when user tries to type a number right after getting the error
// 2 - clear a number if the user types it and presses = without selecting an operator
// 3 - replace 0 with selected number when 0 isn't followed by a period or an operator
// 4 - keep user from typing more than one period. this works for both sides of the
//     equation because it checks only for an array item with only a period, which can
//     only happen on the first half if the user is still typing, then works again on the
//     second half because the first half is turned into a single array item
// 5 - now the input should be good, it gets added to the display and the operationChoice
//     is cleared

numpad.addEventListener("click", function(e) { 
    if (e.target.className.includes("btn")) {
        if (values[0] === "ERROR" && operationChoice === "=") {
            values.pop();
        }

        if (operationChoice === "=" && checkOperator() === true) { 
            values.pop()
        }

        if (values[0] == "0" &&
            values[1] !== "." &&
            checkOperator() === true) {
            values.splice(0, 1);
        }

        if (values.includes(".") && e.target.innerText === ".") {
        } else {
            values.push(e.target.innerText);
        }

        displayMain.innerText = values.join("");
        operationChoice = "";
    }
})

// operations listener. This is a massive frankenstein abomination of a function.
// 1 = if the display is empty and the user selects an operator,
//     push 0 followed by the operator
// 2 = if the second item is an operator, start working on the equation:
//       - first puts everything after values[1] into secondHalf
//       - if the secondHalf is empty, then if the operation choice 
//         isn't =, then replaces current operator with new one
//       - else it gets the first half and second half, calls operate(),
//         clears the array and pushes the return value
//       - next bit deals with user selecting an operator with an equation
//         already typed. This calls the operate function, and adds the
//         chosen operator besides the result unless the result is an error
// 3 = this bit deals with the regular operation of (number 1), (operator),
//     (number 2). It gets called when no operator has been typed yet.
//       - gets what's already been typed and joins it into a single array item
//       - if the result of this is an error or a single period, defaults to 0
//       - clears the array, if the user input =, push the first half as is. If
//         user input an operator, push first half and operator
// 4 = check if it's an integer. If it isn't, default to two decimal numbers
// 5 = finally, push result into display 

operations.addEventListener("click", function(e) {
    if (e.target.className.includes("btn")) {
        operationChoice = e.target.innerText; 
        if (values.length === 0 && operationChoice !== "=") {
            values.push(0, operationChoice); 
        } else if (
            values[1] === "+" ||
            values[1] === "-" ||
            values[1] === "×" ||
            values[1] === "÷") {
                let secondHalf = values.splice(2).join("");
                if (secondHalf.length === 0) {
                    if (operationChoice !== "=") { 
                        values[1] = operationChoice;
                    }
                } else {
                    let first = Number(values[0]);
                    let second = Number(secondHalf);
                    let returnValue = operate(first, second, values[1]);
                    values.splice(0);
                    values.push(returnValue);
                    if (operationChoice !== "=") {
                        if (values[0] === "ERROR") {
                            values = ["ERROR"];
                        } else {
                            values.push(operationChoice);
                        }
                    }
                    
                }  
        } else {
            let firstHalf = values.reduce((a, b) => a.toString() + b.toString());
            if (firstHalf === "ERROR" || firstHalf == ".") {
                firstHalf = 0;
            }
            values.splice(0);
            if (operationChoice === "="){
                values.push(firstHalf);
            }else {
                values.push(firstHalf,operationChoice);
            }
        }

        if (Number.isInteger(Number(values[0])) !== true && isNaN(values[0]) !== true) {
            values[0] = Number(values[0]).toFixed(2).toString();
        }
        
        displayMain.innerText = values.join("");
    }
})