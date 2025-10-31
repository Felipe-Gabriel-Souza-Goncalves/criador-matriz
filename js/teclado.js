const tecladoOrganizado = [
  [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "(", 
    ")", ">", "<", ".", "i", "j", "+", "-",
  ],

  [
    // ["/", "/", "÷"],
    // ["*", "*", "×"],
    // ["=", "==", "="],
    ["p", "Math.PI", "π", 0],
    ["e", "Math.E", "e", 1],
    ["s", "Math.sin(", "sen(", 2],
    ["c", "Math.cos(", "cos(", 3],
    ["t", "Math.tan(", "tg(", 4],
  ],

  [
    // ["Delete", limparRegra, 5],
    // ["Backspace", apagarChar, 6],
    // ["ArrowLeft", trocarTeclado, 7],
    // ["ArrowRight", trocarTeclado, 8],
    // ["/", criarMatriz, 9],
    ["Escape", fecharElemento, 9],
    ["a", toggleAtalhos, 10],
  ],
];


function apagarChar() {

  if(lengthOp.length === 0) return

  const [lengthEval, lengthInput, input] = [...lengthOp[lengthOp.length - 1]]

  if(input.value === "") return
  input.value = input.value.slice(0, (input.value.length - lengthInput)).trim();

  if (isCondicao) {
    regras[inputRegra][0] = regras[inputRegra][0].slice(0, regras[inputRegra][0].length - lengthEval)
  } else {
    regras[inputRegra][1] = regras[inputRegra][1].slice(0, regras[inputRegra][1].length - lengthEval)
  }

  lengthOp.pop()
}


document.body.addEventListener("keydown", (e) => {
  const tecla = e.key.length == 1 ? e.key.toLocaleLowerCase() : e.key;

    tecladoOrganizado[2].forEach((set, i) => {
    if (
      config.atalhoAberto == true &&
      set.includes(tecla) &&
      tecla !== "a" &&
      tecla !== "Escape"
    ) {
      try {
        const element =
          document.getElementsByClassName("button-atalho")
        element.classList.add("button-atalho-ativo");
        setTimeout(() => {
          element.classList.remove("button-atalho-ativo")
        }, 200);
        return;
      } catch (error) {
        console.log("elemento não encontrado\n");
      }
    }
    if (set[0] == tecla && tecla == "a") {
      fecharElemento();
      toggleAtalhos();
    } else if (set[0] == tecla && tecla == "Escape") {
      fecharElemento();
    } else if (set.includes(tecla) && config.elementOpened)
      set[1]();
      return;
    })
})
