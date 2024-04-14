const backStepNumber = document.querySelector(".backStep .number");
const backStepSymbol = document.querySelector(".backStep .symbol");
const hexadecimalNumber = document.querySelector(".hexadecimal .number");
const decimalNumber = document.querySelector(".decimal .number");

const bits = document.querySelectorAll(".byte span");

const mathButtons = document.querySelectorAll(".math");
const hexButtons = document.querySelectorAll(".hex");
const decButtons = document.querySelectorAll(".dec");
const binButtons = document.querySelectorAll(".bin");
const modButtons = document.querySelectorAll(".mod");

const navButtons = document.querySelectorAll(".nav");

let currentMod = "dec";
let currentNumber = "0";
let historyNumber = "0";
let currentSymbol = "";
let currentMinus = false;

const minusSwitch = document.querySelector(".switch");

function setMod(mod) {
  currentMod = modsTable[mod];
  UpdateButtons();
}

function UpdateButtons() {
  SetButtonsDisabled(modButtons, false, "selected");
  if (currentMod == "bin") {
    SetButtonsDisabled(hexButtons, true);
    SetButtonsDisabled(decButtons, true);
    SetButtonsDisabled(binButtons, false);
    modButtons[1].classList.add("selected");
  }
  if (currentMod == "dec") {
    SetButtonsDisabled(hexButtons, true);
    SetButtonsDisabled(decButtons, false);
    SetButtonsDisabled(binButtons, false);
    modButtons[0].classList.add("selected");
  }
  if (currentMod == "hex") {
    SetButtonsDisabled(hexButtons, false);
    SetButtonsDisabled(decButtons, false);
    SetButtonsDisabled(binButtons, false);
    modButtons[2].classList.add("selected");
  }
  if (currentMinus == true) {
    minusSwitch.classList.add("selected");
  } else minusSwitch.classList.remove("selected");
}
function UpdateCounters() {
  setText(decimalNumber, returnMinus(currentMinus) + currentNumber);
  setText(
    hexadecimalNumber,
    returnMinus(currentMinus) + (+currentNumber).toString(16).toUpperCase(),
  );
  setText(backStepNumber, historyNumber);
  setText(backStepSymbol, currentSymbol);
  setBits(bits, currentNumber, currentMinus);
}
function updateAll() {
  UpdateCounters();
  UpdateButtons();
}
updateAll();

function setSymbol(i) {
  let symbol = symbolsTable[i];
  if (symbol == "=") {
    if (currentSymbol == "x") currentSymbol = "*";
    currentNumber = Math.round(
      eval(historyNumber + currentSymbol + `(${((currentMinus) ? "-" : "")}${currentNumber})`),
    );
    if (currentNumber < 0) {
      currentMinus = true;
      currentNumber = Math.abs(currentNumber)
    }
    historyNumber = "";
    currentSymbol = "";
    updateAll();
    return;
  }
  currentSymbol = symbol;
  historyNumber = `(${((currentMinus) ? "-" : "")}${currentNumber})`;
  currentNumber = "0";
  currentMinus = false;
  updateAll();
}

modButtons.forEach((b, i) => {
  b.addEventListener("click", () => {
    setMod(i);
  });
});
mathButtons.forEach((b, i) => {
  b.addEventListener("click", () => {
    setSymbol(i);
  });
});

function insertNumber(num) {
  if (currentMod == "bin") {
    let tmp = (+currentNumber).toString(2) + num.toString();
    currentNumber = parseInt(tmp, 2).toString();
  }
  if (currentMod == "dec") {
    let tmp = (+currentNumber).toString() + num.toString();
    currentNumber = parseInt(tmp).toString();
  }
  if (currentMod == "hex") {
    let tmp = (+currentNumber).toString(16) + num.toString();
    currentNumber = parseInt(tmp, 16).toString();
  }

  updateAll();
}
function removeNumber() {
  if (currentMod == "bin") {
    let tmp = (+currentNumber).toString(2).slice(0, -1);
    currentNumber = parseInt(tmp, 2).toString();
  }
  if (currentMod == "dec") {
    let tmp = (+currentNumber).toString().slice(0, -1);
    currentNumber = parseInt(tmp).toString();
  }
  if (currentMod == "hex") {
    let tmp = (+currentNumber).toString(16).slice(0, -1);
    currentNumber = parseInt(tmp, 16).toString();
  }
  if (currentNumber == "NaN") currentNumber = 0;

  updateAll();
}

binButtons.forEach((b) => {
  b.addEventListener("click", () => {
    if (b.classList.contains("disabled")) return;
    insertNumber(b.innerHTML);
  });
});
decButtons.forEach((b) => {
  b.addEventListener("click", () => {
    if (b.classList.contains("disabled")) return;
    insertNumber(b.innerHTML);
  });
});
hexButtons.forEach((b) => {
  b.addEventListener("click", () => {
    if (b.classList.contains("disabled")) return;
    insertNumber(b.innerHTML);
  });
});

navButtons.forEach((b, i) => {
  b.addEventListener("click", () => {
    if (i == 0) {
      removeNumber();
    }
    if (i == 1) {
      currentNumber = "0";
      historyNumber = "";
      currentSymbol = "";
    }

    updateAll();
  });
});

minusSwitch.addEventListener("click", () => {
  currentMinus = !currentMinus;
  updateAll();
});
