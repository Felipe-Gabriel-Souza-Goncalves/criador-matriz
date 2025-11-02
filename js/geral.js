const config = {  
  configPadrao: {
    valorPadrao: 1,
    corPadrao: "#efefef",
    animacaoAtiva: false,
    intervaloAnimacao: 0.5,
    animacaoCor: "#cecece",
  },
  atalhoAberto: false,
  asideAberto: false,
  elementOpened: undefined,
  valorPadrao: 1,
  corPadrao: "#efefef",
  animacaoAtiva: true,
  intervaloAnimacao: 0.4,
  animacaoCor: "#cecece",
}

let matrizAnimada = undefined

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
      document.getElementById("spanAlteracoes").style.display = "none"
    }, 500)
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

function fecharElemento() {
  if (config.elementOpened == undefined) {
    toggleAside();
  } else {
    try {
      const element = config.elementOpened;
      element.style.display = "none";

      config.elementOpened = undefined;
    } catch (error) {
      console.log("Elemento não encontrado");
    }
  }
}


function alterarConfig(att = null, value = null, callback = undefined){
  if(att == null || value == null) return

  config[att] = value
  alert("Configuração alterada")

  document.getElementById("spanAlteracoes").style.display = "none"

  if(callback){
    callback()
  }
}

function configPadrao(){
  Object.keys(config.configPadrao).forEach(att => {
    // console.log(`${att}: ${config[att]} x ${config.configPadrao[att]}`);
    config[att] = config.configPadrao[att]
  });

  atualizarListaConfig()
}

function atualizarListaConfig(){
  const configuracoes = [
    ['valorPadrao', 'inputValorPadrao'],
    ['corPadrao', 'inputCorPadrao']
    ['animacaoAtiva', 'inputAnimacaoAtiva']
  ]

  configuracoes.forEach(row => {
    document.getElementById(`${row[1]}`).value = config[row[0]]
  })
}

function liberarSalvarConfig(element, indexImg){
  const input = document.getElementById(`${element}`)
  document.getElementById("spanAlteracoes").style.display = "block"

}

// Callbacks de configuração
function alterarCorAnimacao(){
  for (const sheet of document.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (rule.selectorText === '.celula-animada') {
        rule.style.backgroundColor = config.animacaoCor;
        break;
      }
    }
  }
}

function atualizarSpanConfig(idSpan, idInput, pre = "", suf = ""){
  document.getElementById(`${idSpan}`).innerText = 
  pre + document.getElementById(`${idInput}`).value + suf
}