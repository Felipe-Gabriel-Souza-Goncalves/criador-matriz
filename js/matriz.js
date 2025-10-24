let regras = [[]];
let lengthOp = [];
let currentTeclado = 0
let inputRegra = 0;
let isCondicao = true;

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

      // console.log(cond, typeof cond, resul, typeof resul)
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

  const matrizGerada = []

  for (let i = 1; i <= linhas; i++) {

    matrizGerada.push([])
    
    for (let j = 1; j <= colunas; j++) {
      const div = document.createElement("div");

      // Valores / cores padrão
      div.innerText = config.valorPadrao;
      div.style.background = config.corPadrao;
      let valor = config.valorPadrao
      
      regras.forEach((regra, k) => {
        if(regrasIgnorar.includes(k)) return

        const pertence = returnRule(i, j, regra[0]);
        if (pertence) {

          valor = returnRule(i, j, regra[1]);

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

      matrizGerada[i - 1].push(valor)

      document.getElementById("grid").appendChild(div);
    }
  }

  ultimaMatriz = structuredClone(matrizGerada)
  console.log("ultima", ultimaMatriz)
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



function toggleAtalhos(){
  const bgAtalhos = document.getElementById('bg-card-atalhos')
  
  config.atalhoAberto = !config.atalhoAberto
  config.atalhoAberto ? bgAtalhos.style.display = 'block' : bgAtalhos.style.display = 'none'

  if(config.atalhoAberto){
    config.elementOpened = bgAtalhos
  }
  
}
