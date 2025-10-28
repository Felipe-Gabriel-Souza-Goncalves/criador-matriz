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

function abrirSecao(secao = null, secaoAuxiliar = null){

  document.getElementById("grid").style.display = "none"
  document.getElementById("container-criacao-matrizes").style.display = "none"
  
  document.getElementById("container-minhas-matrizes").style.display = "none"
  document.getElementById("container-regras-matrizes").style.display = "none"
  document.getElementById("container-aleatorio-matrizes").style.display = "none"
  document.getElementById("container-soma-matrizes").style.display = "none"
  document.getElementById("container-subtracao-matrizes").style.display = "none"
  document.getElementById("container-multiplicacao-matrizes").style.display = "none"
  document.getElementById("container-determinante-matrizes").style.display = "none"


  if(secao != null){
    document.getElementById(`${secao}`).style.display = "block"
  }

  if(secaoAuxiliar != null){
    secaoAuxiliar.forEach(secao =>{
      document.getElementById(`${secao}`).style.display = "block"
    })
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

(() =>{
  const height = window.innerWidth
})