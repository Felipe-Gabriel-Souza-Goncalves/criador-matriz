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
    ["p", "Math.PI", "π", 0], 
    ["e", "Math.E", "e", 1], 
    ["s", "Math.sin(", "sen(", 2], 
    ["c", "Math.cos(", "cos(", 3], 
    ["t", "Math.tan(", "tg(", 4], 
  ],

  [
    ["Backspace", apagarChar, 5],
    ["ArrowLeft", trocarTeclado, 6],
    ["ArrowRight", trocarTeclado, 7],
    ["Enter", criarMatriz, 8],
    ["Escape", fecharElemento, 9],
    ["a", toggleAtalhos, 10]
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

    (linhas <= 0 || linhas > 20) ?  document.getElementById("linhas").focus() : document.getElementById("colunas").focus()

    return
  }

  const regrasIgnorar = []

  // Itera pelas regras, ignora as inválidas
  if(regras[0].length !== 0){  

    regras.forEach((regra, i) => {
      const cond = returnRule(1, 1, regra[0])
      const resul = returnRule(1, 1, regra[1])

      if(typeof cond !== "boolean" || typeof resul != "number") regrasIgnorar.push(i); return
    })
    
    if(regras.length == regrasIgnorar.length){
      document.getElementById("grid").innerHTML = "<strong>Todos os conjuntos de regras possuem erro</strong>";
      return
    }
  }


  document.getElementById("grid").style.gridTemplateRows = `repeat(${linhas}, minmax(${200 / linhas}px, 1fr))`;
  document.getElementById("grid").style.gridTemplateColumns = `repeat(${colunas}, minmax(${200 / colunas}px, 1fr))`;
  document.getElementById("grid").innerHTML = "";

  for (let i = 1; i <= linhas; i++) {
    for (let j = 1; j <= colunas; j++) {
      const div = document.createElement("div");

      // Valores / cores padrão
      div.innerText = config.valorPadrao;
      div.style.background = config.corPadrao;
      
      regras.forEach((regra, k) => {
        if(regrasIgnorar.includes(k)) return

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
            document.getElementById("grid").innerHTML = "<strong>Erro na regra</strong>";
            console.log(error)
          }

          div.innerText = valor;
          div.style.background = regra[2];

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

  console.log(lengthOp)

  const classe = isCondicao ? "regra-condicao" : "regra-resultado";
  const input = document.getElementsByClassName(classe)[inputRegra];
  const lengthOfChar = lengthOp[lengthOp.length - 1]

  console.log(lengthOfChar)

  if(input.value === "") return
  
  input.value = input.value.slice(0, Math.max((input.value.length - lengthOfChar[1]), 1)).trim();


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

function fecharElemento(){
  if(config.elementOpened == undefined) return
  else{
    try {
      const element = config.elementOpened
      element.style.display = "none"
      
      config.elementOpened = undefined
    } catch (error) {
      console.log("Elemento não encontrado")
    }
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

function toggleAtalhos(){
  const bgAtalhos = document.getElementById('bg-card-atalhos')
  
  config.atalhoAberto = !config.atalhoAberto
  config.atalhoAberto ? bgAtalhos.style.display = 'block' : bgAtalhos.style.display = 'none'

  if(config.atalhoAberto){
    config.elementOpened = bgAtalhos
  }
  
}

document.body.addEventListener("keydown", (e) =>{

  const tecla = (e.key.length == 1) ? e.key.toLocaleLowerCase() : e.key
  // console.log(tecla)

  if(tecladoOrganizado[0].includes(tecla)){
    if(e.target.classList.contains('regra-condicao') == false &&
       e.target.classList.contains('regra-resultado') == false){
      return
    }
    
    digitarRegra(tecla)
    return

  } else {

    tecladoOrganizado[1].forEach(set =>{

      if(config.atalhoAberto == true && set.includes(tecla)){
        try {
          const element = document.getElementsByClassName("button-atalhos")[set[3]]
          // console.log(element)

          element.classList.add("button-atalho-ativo")

          setTimeout(() => {
            element.classList.remove("button-atalho-ativo")
          }, 200)

          return
        } catch (error) {
          console.log("elemento não encontrado\n")
        }
      }

      if(e.target.classList.contains('regra-condicao') == false &&
        e.target.classList.contains('regra-resultado') == false){
        return
      }
      
      if(set.includes(tecla)){
        digitarRegra(set[1], set[2])
        return

      }
    })

    tecladoOrganizado[2].forEach(set =>{

      if(config.atalhoAberto == true && set.includes(tecla) &&
        tecla !== "a" && tecla !== "Escape"){
        try {
          const element = document.getElementsByClassName("button-atalhos")[set[2]]
          // console.log(element)
          element.classList.add("button-atalho-ativo")

          setTimeout(() => {
            element.classList.remove("button-atalho-ativo")
          }, 200)

          return
        } catch (error) {
          console.log("elemento não encontrado\n")
        }
      }

      if(set.includes(tecla) && tecla == "a"){
        toggleAtalhos()
        return
      }

      if(set.includes(tecla) && tecla == "Escape"){
        fecharElemento()
        return
      }
      
      if(set.includes(tecla) && config.elementOpened == undefined){
        // console.log("rodando", set[1])
        
        (set[1])();        
        return
      }
    })
  }
})