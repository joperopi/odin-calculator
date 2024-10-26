let displayMain = document.getElementById("displayMain");
let displayLast = document.getElementById("displayLast");
let numpad = document.getElementById("numpad");
let operations = document.getElementById("operations")

let values = [];

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

numpad.addEventListener("click", function(e) {
    if (e.target.className.includes("btn")) {

        if (values[0] === "ERROR") {
            values.pop();
        }
        values.push(e.target.innerText);
        displayMain.innerText = values.join("");
        console.log(values);
    }
})

operations.addEventListener("click", function(e) {
    if (e.target.className.includes("btn")) {
        let operationChoice = e.target.innerText; //operationChoice is latest operation to be pressed
        if (values.length === 0 && !operationChoice === "=") {
            values.push(0, operationChoice); // if theres nothing at the time of pressing
            console.log("here");
        } else if (
            values[1] === "+" ||
            values[1] === "-" ||
            values[1] === "×" ||
            values[1] === "÷") {
                console.log("test")
                let secondHalf = values.splice(2).join("");
                if (secondHalf.length === 0) {
                    values[1] = operationChoice;
                    console.log("here");
                } else {
                    let first = Number(values[0]);
                    let second = Number(secondHalf);
                    let returnValue = operate(first, second, values[1]);
                    values.splice(0);
                    values.push(returnValue);
                    console.log("operation choice: ",operationChoice)
                    if (operationChoice === "+" ||
                        operationChoice === "-" ||
                        operationChoice === "×" ||
                        operationChoice === "÷") {
                        values.push(operationChoice);
                    }
                    
                }  
        } else {
            let firstHalf = values.reduce((a, b) => a.toString() + b.toString());
            values.splice(0);
            if (operationChoice === "="){
                values.push(firstHalf);
                console.log("here");
            }else {
                values.push(firstHalf,operationChoice);
                console.log("here");
            }
        }
        displayMain.innerText = values.join("");
        console.log(values);
    }
})