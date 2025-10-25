let regras = [[]];
let lengthOp = [];
let currentTeclado = 0
let inputRegra = 0;
let isCondicao = true;

const condicao = document.getElementsByClassName("regra-condicao");
const resultado = document.getElementsByClassName("regra-resultado");
const cor = document.getElementsByClassName("regra-cor");

function criarMatriz(matriz) {
  if(!matriz) return
  
  const linhas = document.getElementById("linhas").value;
  const colunas = document.getElementById("colunas").value;

  document.getElementById("grid").style.gridTemplateRows = `repeat(${linhas}, minmax(${200 / linhas}px, 1fr))`;
  document.getElementById("grid").style.gridTemplateColumns = `repeat(${colunas}, minmax(${200 / colunas}px, 1fr))`;
  document.getElementById("grid").innerHTML = "";


  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      const div = document.createElement("div");

      // Valores / cores padrão
      div.innerText = matriz[i][j].valor || config.valorPadrao;
      div.style.background = matriz[i][j].cor || config.corPadrao;


      document.getElementById("grid").appendChild(div);
    }
  }

  ultimaMatriz = structuredClone(matriz)
}

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


function fecharElemento(){
  if(config.elementOpened == undefined){
    toggleAside()
  } else{
    try {
      const element = config.elementOpened
      element.style.display = "none"
      
      config.elementOpened = undefined
    } catch (error) {
      console.log("Elemento não encontrado")
    }
  }
}



function toggleAtalhos(){
  const bgAtalhos = document.getElementById('bg-card-atalhos')
  
  config.atalhoAberto = !config.atalhoAberto
  config.atalhoAberto ? bgAtalhos.style.display = 'block' : bgAtalhos.style.display = 'none'

  if(config.atalhoAberto){
    config.elementOpened = bgAtalhos
    document.querySelector("#card-atalhos button").focus()
  }
  
}

