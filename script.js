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
    return a / b;
}

numpad.addEventListener("click", function(e) {
    if (e.target.className.includes("btn")) {
        console.log(e.target.innerText);
        values.push(e.target.innerText);
        displayMain.innerText = values.join("");
        console.log(values);
    }
})