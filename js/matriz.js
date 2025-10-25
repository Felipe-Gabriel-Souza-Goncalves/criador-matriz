let regras = [[]];
let lengthOp = [];
let currentTeclado = 0
let inputRegra = 0;
let isCondicao = true;

const condicao = document.getElementsByClassName("regra-condicao");
const resultado = document.getElementsByClassName("regra-resultado");
const cor = document.getElementsByClassName("regra-cor");

function criarMatriz(matriz, grid = null, regra = false) {
  if(!matriz) return

  console.log("matriz recebida",matriz)
  
  const linhas = matriz.length || document.getElementById("linhas").value;
  const colunas = matriz[0].length || document.getElementById("colunas").value;
  const gridMatriz = grid != null ? grid : "grid"

  document.getElementById(gridMatriz).style.display = "grid"  
  document.getElementById(gridMatriz).style.gridTemplateRows = `repeat(${linhas}, minmax(${200 / linhas}px, 1fr))`;
  document.getElementById(gridMatriz).style.gridTemplateColumns = `repeat(${colunas}, minmax(${200 / colunas}px, 1fr))`;
  document.getElementById(gridMatriz).innerHTML = "";

  if(colunas > 7 || linhas > 7){
    document.getElementById("grid").style.width = "500px"
  }
  if(colunas > 13 || linhas > 13){
    document.getElementById("grid").style.width = "750px"
  }
  
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      const div = document.createElement("div");

      if(regra){
        // Valores / cores padrão
        div.innerText = 
          typeof(matriz[i][j].valor) == "number" ? matriz[i][j].valor : config.valorPadrao;
          
        div.style.background = 
          typeof(matriz[i][j].cor) == "string" ? matriz[i][j].cor : config.corPadrao;
      } else{

        div.innerText = 
          typeof(matriz[i][j]) == "number" ? matriz[i][j] : config.valorPadrao;
        div.style.background = config.corPadrao;
      }


      document.getElementById(gridMatriz).appendChild(div);
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

function gerarMatrizAleatoria(){
  const resposta = verificarLinhasColunas()
  if(!resposta) return

  const {linhas, colunas} = {...resposta}

  const min = parseInt(document.getElementById("aleatorio-valor-minimo").value)
  const max = parseInt(document.getElementById("aleatorio-valor-maximo").value)

  if(max < min) return

  const matrizGerada = []
  
  for(let i = 1; i <= linhas; i++){
    matrizGerada.push([])
    for(let j = 1; j <= colunas; j++){

      const alcance = Math.abs(max - min)
      const valor = Math.floor(Math.random()*alcance+1 + min) 

      matrizGerada[i-1].push(valor)

    }
  }

  criarMatriz(matrizGerada)

  ultimaMatriz = matrizGerada
}

function verificarLinhasColunas(){
  const linhas = document.getElementById("linhas").value;
  const colunas = document.getElementById("colunas").value;

  if((linhas <= 0 || linhas > 20) || (colunas <= 0 || colunas > 20)){
    document.getElementById("grid").innerHTML = "<strong>Linhas e colunas devem ser de 1 a 20</strong>"
    document.getElementById("grid").style.gridTemplateRows = `1fr`;
    document.getElementById("grid").style.gridTemplateColumns = `1fr`;

    (linhas <= 0 || linhas > 20) ?  document.getElementById("linhas").focus() : document.getElementById("colunas").focus()

    return false
  }
  
  return {linhas, colunas}
}