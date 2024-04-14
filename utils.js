
const modsTable = {
  0: "dec",
  1: "bin",
  2: "hex"
}
const symbolsTable = {
  0: "x",
  1: "/",
  2: "-",
  3: "+",
  4: "="
}

/** @param buttons {HTMLDivElement[]} */
function SetButtonsDisabled(buttons, disabled = true, cls = "disabled") {
  buttons.forEach((v) => {
    if (disabled) {
      v.classList.add(cls)
    } else {
      v.classList.remove(cls)
    }
  }) 
}

/** @param obj {HTMLDivElement} */
function setText(obj, value) {
  obj.innerHTML = value;
}



/** @param bits {HTMLDivElement[]} */
function setBits(bits, decimal=0) {
  let binary = (+decimal).toString(2)

  bits.forEach((bit) => {
    setText(bit, "0")
  })

  let tmp = Array.from(bits).slice(0 - binary.length)

  tmp.forEach((bit, i) => {
    setText(bit, binary.charAt(i))
  })

}
