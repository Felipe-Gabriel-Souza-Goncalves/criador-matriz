const config = {  
  configPadrao: {
    valorPadrao: 1,
    corPadrao: "#efefef",
  },
  atalhoAberto: false,
  asideAberto: false,
  elementOpened: undefined,
  valorPadrao: 1,
  corPadrao: "#efefef",

}

const matriz1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

const matriz2 = [
  [11, 22, 33],
  [44, 55, 66],
  [77, 88, 99],
]

const matriz3 = [
  [4, 8, 3],
  [7, 2, 6],
  [1, 5, 9],
]

function toggleAside(){
  config.asideAberto = !config.asideAberto

  if(config.asideAberto){
    config.elementOpened = document.querySelector("aside")

    document.querySelector("aside").style.display = "block"
    setTimeout(() => {
      document.querySelector("aside").style.left = "0px"
    }, 5)
    
  } else{
    config.elementOpened = undefined 

    document.querySelector("aside").style.left = "-300px"
    setTimeout(() => {
      document.querySelector("aside").style.display = "none"
    }, 500)
  }
}

function abrirSecao(secao = null){
  document.getElementById("container-soma-matrizes").style.display = "none"
  document.getElementById("container-subtracao-matrizes").style.display = "none"
  document.getElementById("container-multiplicacao-matrizes").style.display = "none"
  document.getElementById("container-determinante-matrizes").style.display = "none"
  document.getElementById("minhas-matrizes").style.display = "none"

  if(secao != null){
    document.getElementById(`${secao}`).style.display = "block"
  }

}

function alterarConfig(att, value){
  if(!att || !value) return

  config[att] = value
  alert("Configuração alterada")
}

function configPadrao(){
  Object.keys(config.configPadrao).forEach(att => {
    console.log(`${att}: ${config[att]} x ${config.configPadrao[att]}`);
    config[att] = config.configPadrao[att]
  });
}

function atualizarListaConfig(){
  const configuracoes = document.getElementById("container-configuracoes")
}