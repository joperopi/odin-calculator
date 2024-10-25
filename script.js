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

numpad.addEventListener("click", function(e) {
    if (e.target.className.includes("btn")) {
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
        } else if (
            values[1] === "+" ||
            values[1] === "-" ||
            values[1] === "×" ||
            values[1] === "÷" ) {
                let secondHalf = values.splice(2);
                console.log("second half ",secondHalf)
                if (secondHalf.length === 0) {
                    values[1] = operationChoice;
                } else {
                    let first = Number(values[0]);
                    let second = Number(secondHalf);
                    if (values[1] === "+") {
                        values.splice(0);
                        values.push(add(first, second), operationChoice);
                    } else if (values[1] === "-") {
                        values.splice(0);
                        values.push(subtract(first, second), operationChoice);
                    } else if (values[1] === "×") {
                        values.splice(0);
                        values.push(multiply(first, second), operationChoice);
                    } else if (values[1] === "÷") {
                        values.splice(0);
                        values.push(divide(first, second), operationChoice);
                        if (values[0] === "ERROR") {
                            values.pop();
                        }
                    }
                }
        } else {
            let firstHalf = values.reduce((a, b) => a.toString() + b.toString());
            values.splice(0);
            values.push(firstHalf,operationChoice)
        }
        displayMain.innerText = values.join("");
        console.log(values);
    }
})