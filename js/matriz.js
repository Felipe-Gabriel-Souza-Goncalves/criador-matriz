let regras = [[]];
let lengthOp = [];
let currentTeclado = 0
let inputRegra = 0;
let isCondicao = true;

const tecladoOrganizado = [
  [
   "1", "2", "3", "4", "5", 
   "6", "7", "8", "9", "0", 
   "(", ")", ">", "<", ".",
   "i", "j", "+", "-", 
  ],
  [
    ["/", "/", "÷"], 
    ["*", "*", "×"], 
    ["=", "==", "="], 
    ["p", "Math.PI", "π"], 
    ["e", "Math.E", "e"], 
    ["s", "Math.sin(", "sen("], 
    ["c", "Math.cos(", "cos("], 
    ["t", "Math.tan(", "tg("], 
  ],

  [
    ["Backspace", apagarChar],
    ["ArrowLeft", trocarTeclado],
    ["ArrowRight", trocarTeclado],
    ["Enter", criarMatriz]
  ]
];



const condicao = document.getElementsByClassName("regra-condicao");
const resultado = document.getElementsByClassName("regra-resultado");
const cor = document.getElementsByClassName("regra-cor");

function criarMatriz() {
  const linhas = document.getElementById("linhas").value;
  const colunas = document.getElementById("colunas").value;

  if((linhas <= 0 || linhas > 20) || (colunas <= 0 || colunas > 20)){
    document.getElementById("grid").innerHTML = "<strong>Linhas e colunas devem ser de 1 a 20</strong>"
    document.getElementById("grid").style.gridTemplateRows = `1fr`;
    document.getElementById("grid").style.gridTemplateColumns = `1fr`;
    return
  }

  document.getElementById("grid").style.gridTemplateRows = `repeat(${linhas}, minmax(${200 / linhas}px, 1fr))`;
  document.getElementById("grid").style.gridTemplateColumns = `repeat(${colunas}, minmax(${200 / colunas}px, 1fr))`;
  document.getElementById("grid").innerHTML = "";

  for (let i = 1; i <= linhas; i++) {
    for (let j = 1; j <= colunas; j++) {
      const div = document.createElement("div");

      // Valores / cores padrão
      div.innerText = "1";
      div.style.background = "#efefef";
      
      regras.forEach((regra) => {
        const pertence = returnRule(i, j, regra[0]);
        if (pertence) {
          let valor = returnRule(i, j, regra[1]);

          

          try {
            valor = parseFloat(valor)
            
            if(Number.isInteger(valor)) valor = parseInt(valor)
            else valor = valor.toFixed(2)
            

            if(isNaN(valor)){
              document.getElementById("grid").innerHTML = "<strong>Erro na regra</strong>";
              return 
            }
          } catch (error) {
            console.log(error)
          }

          div.innerText = valor;
          div.style.background = regra[2];

          const widthDiv = window.getComputedStyle(div).getPropertyValue("width") 
          
        }
      });

      document.getElementById("grid").appendChild(div);
    }
  }
}

function digitarRegra(char, charShow = null) {
  if (isCondicao == true) {
    if (!regras[inputRegra][0]) regras[inputRegra][0] = "";
    regras[inputRegra][0] += char;

    // Atualizar elemento
    document.getElementsByClassName("regra-condicao")[inputRegra].value += charShow || char;

  } else {
    if (!regras[inputRegra][1]) regras[inputRegra][1] = "";
    regras[inputRegra][1] += char;

    // Atualizar elemento
    document.getElementsByClassName("regra-resultado")[inputRegra].value += charShow || char;
  }

  lengthOp.push([char.length, (charShow ? charShow.length : char.length)])

}



function apagarChar() {
  const classe = isCondicao ? "regra-condicao" : "regra-resultado";
  const input = document.getElementsByClassName(classe)[inputRegra];
  const lengthOfChar = lengthOp[lengthOp.length - 1]

  if(input.value === "") return
  
  input.value = input.value.slice(0, (input.value.length - lengthOfChar[1])).trim();


  if (isCondicao) {
    regras[inputRegra][0] = regras[inputRegra][0].slice(0, regras[inputRegra][0].length - lengthOfChar[0])
  } else {
    regras[inputRegra][1] = regras[inputRegra][1].slice(0, regras[inputRegra][1].length - lengthOfChar[0])
  }

  lengthOp.pop()
}

function limparRegra() {
  const classe = isCondicao ? "regra-condicao" : "regra-resultado";
  const input = document.getElementsByClassName(classe)[inputRegra];

  input.value = "";

  if (isCondicao) {
    regras[inputRegra][0] = "";
  } else {
    regras[inputRegra][1] = "";
  }
}

function criarInputRegra() {
  const ultimaCondicao = condicao[condicao.length - 1].value;
  const ultimoResultado = resultado[resultado.length - 1].value;

  if (!ultimaCondicao.trim() || !ultimoResultado.trim()) {
    document.getElementById("grid").innerHTML = "<strong>Alguma condição vazia</strong>";
    return;
  }

  regras.push([]);

  const novaCondicao = document.createElement("input");
  const novoResultado = document.createElement("input");
  const novaCor = document.createElement("input");

  novaCondicao.readOnly = true;
  novoResultado.readOnly = true;
  novaCor.type = "color";

  novaCondicao.classList.add("regra-condicao");
  novoResultado.classList.add("regra-resultado");
  novaCor.classList.add("regra-cor");

  novaCondicao.setAttribute("onfocus", `isCondicao = true; inputRegra = ${regras.length - 1}`);
  novoResultado.setAttribute("onfocus", `isCondicao = false; inputRegra = ${regras.length - 1}`);

  novaCor.setAttribute("onclick", `inputRegra = ${regras.length - 1}`);
  novaCor.setAttribute(
    "onchange",
    "regras[inputRegra][2] = cor[inputRegra].value"
  );

  document.getElementById("regras-condicoes").appendChild(novaCondicao);
  document.getElementById("regras-resultados").appendChild(novoResultado);
  document.getElementById("regras-cores").appendChild(novaCor);
}

function returnRule(i = null, j = null, rule) {
  try {
    const resultado = eval(rule);
    return resultado;
  } catch (error) {
    console.log(resultado);
  }
}

function trocarTeclado(i = null) {

  if(i == null){
    currentTeclado = (currentTeclado + 1) % 2
  }

  const secoesTeclado = document.querySelectorAll(
    "div[id^='teclado-secao']"
  );
  for (let i = 0; i < secoesTeclado.length; i++) {
    secoesTeclado[i].style.display = "none";
  }

  secoesTeclado[i || currentTeclado].style.display = "grid";
}

document.body.addEventListener("keydown", (e) =>{

  if(tecladoOrganizado[0].includes(e.key)){
    if(e.target.classList.contains('regra-condicao') == false &&
       e.target.classList.contains('regra-resultado') == false){
      return
    }
    
    digitarRegra(e.key)
    return

  } else {

    tecladoOrganizado[1].forEach(set =>{
    if(e.target.classList.contains('regra-condicao') == false &&
      e.target.classList.contains('regra-resultado') == false){
      return
    }
      
      if(set.includes(e.key)){
        digitarRegra(set[1], set[2])
        return

      }
    })

    tecladoOrganizado[2].forEach(set =>{
      if(set.includes(e.key)){
        (set[1])();
        return
      }
    })

  }


  
})