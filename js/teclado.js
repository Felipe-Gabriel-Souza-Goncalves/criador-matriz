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

// function trocarTeclado(i = null) {
//   if (i == null) {
//     currentTeclado = (currentTeclado + 1) % 2;
//   }

//   const secoesTeclado = document.querySelectorAll("div[id^='teclado-secao']");
//   for (let i = 0; i < secoesTeclado.length; i++) {
//     secoesTeclado[i].style.display = "none";
//   }

//   secoesTeclado[i || currentTeclado].style.display = "grid";
// }

// document.body.addEventListener("keydown", (e) => {
//   const tecla = e.key.length == 1 ? e.key.toLocaleLowerCase() : e.key;

//   tecladoOrganizado[1].forEach((set) => {
//     if (config.atalhoAberto == true && set.includes(tecla)) {
//       try {
//         const element =
//           document.getElementsByClassName("button-atalhos")[set[3]];
//         element.classList.add("button-atalho-ativo");

//         setTimeout(() => {
//           element.classList.remove("button-atalho-ativo");
//         }, 200);

//         return;
//       } catch (error) {
//         console.log("elemento não encontrado\n");
//       }
//     }

//     if (
//       e.target.classList.contains("regra-condicao") == false &&
//       e.target.classList.contains("regra-resultado") == false
//     ) {
//       return;
//     }

//     if (set.includes(tecla)) {
//       digitarRegra(set[1], set[2]);
//       return;
//     }
//   });

//   tecladoOrganizado[2].forEach((set, i) => {
//     if (
//       config.atalhoAberto == true &&
//       set.includes(tecla) &&
//       tecla !== "a" &&
//       tecla !== "Escape"
//     ) {
//       try {
//         const element =
//           document.getElementsByClassName("button-atalhos")[set[2]];
//         element.classList.add("button-atalho-ativo");

//         setTimeout(() => {
//           element.classList.remove("button-atalho-ativo");
//         }, 200);

//         return;
//       } catch (error) {
//         console.log("elemento não encontrado\n");
//       }
//     }

//     if (set[0] == tecla && tecla == "a") {
//       fecharElemento();
//       toggleAtalhos();
//     } else if (set[0] == tecla && tecla == "Escape") {
//       fecharElemento();
//     } else if (set.includes(tecla) && config.elementOpened == undefined) {
//       set[1]();
//       return;
//     }
//   });

// });

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
