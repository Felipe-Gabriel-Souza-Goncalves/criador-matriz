let regras = [[]];
let lengthOp = [];
let currentTeclado = 0
let inputRegra = 0;
let isCondicao = true;

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

  const classe = (isCondicao ? "regra-condicao" : "regra-resultado")
  const input = document.getElementsByClassName(classe)[inputRegra]

  lengthOp.push([char.length, (charShow ? charShow.length : char.length), input])
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

function limparTodasRegras(){
  document.getElementById("container-regras").innerHTML = `
            <div class="conjunto-regras">
              <input
                type="text"
                class="regra-condicao"
                onfocus="isCondicao = true; inputRegra = 0"
                placeholder="Ex: i>j"
              />
              <input
                type="text"
                class="regra-resultado"
                onfocus="isCondicao = false; inputRegra = 0"
                placeholder="Ex: 2×i + 3"
              />
              <input
                type="color"
                class="regra-cor"
                onclick="inputRegra = 0"
                onchange="regras[inputRegra][2] = cor[inputRegra].value"
                value="#efefef"
              />
            </div>
          `
  lengthOp = []
  regras = [[]]
  inputRegra = 0
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

  novaCondicao.placeholder = "Ex: i>j"
  novoResultado.placeholder = "Ex: 2×i + 3"
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
  novaCor.value = "#efefef"

  const div = document.createElement("div")
  div.classList.add("conjunto-regras")


  div.appendChild(novaCondicao);
  div.appendChild(novoResultado);
  div.appendChild(novaCor);

  document.getElementById("container-regras").appendChild(div)
}

function returnRule(i = null, j = null, rule) {
  try {
    let resultado = eval(rule);

    if(resultado == undefined){
      rule.replaceAll('i', i)
      rule.replaceAll('j', j)
      
      resultado = eval(rule)
      console.log(resultado)
    }
    if(resultado == undefined) throw new Error("Resultado undefined")
    
    return resultado;
  } catch (error) {
    console.log("Erro:",resultado);
  }
}

function guardarRegras(){
  const condicoes = document.getElementsByClassName("regra-condicao")
  const resultados = document.getElementsByClassName("regra-resultado")
  const cores = document.getElementsByClassName("regra-cor")

  if(condicoes.length != resultados.length || 
     condicoes.length != cores.length ||
     resultados.length != cores.length
  ) {
    return
  }

  regras = []

  for(let i = 0; i < condicoes.length; i++){
    if(condicoes[i].value !== "",
       resultados[i].value !== "",
       cores[i].value !== ""){
   
      regras.push([condicoes[i].value, resultados[i].value, cores[i].value])
    }
  }
}

function gerarMatrizComRegra(){

  const linhas = document.getElementById("linhas").value;
  const colunas = document.getElementById("colunas").value;

  if((linhas <= 0 || linhas > 20) || (colunas <= 0 || colunas > 20)){
    document.getElementById("grid").innerHTML = "<strong>Linhas e colunas devem ser de 1 a 20</strong>"
    document.getElementById("grid").style.gridTemplateRows = `1fr`;
    document.getElementById("grid").style.gridTemplateColumns = `1fr`;

    (linhas <= 0 || linhas > 20) ?  document.getElementById("linhas").focus() : document.getElementById("colunas").focus()

    return
  }
  
  guardarRegras()

  // Número de linhas e colunas são válidos
  if(!linhas || !colunas || isNaN(linhas) || isNaN(colunas)) return
      
  const regrasIgnorar = []
  const matrizGerada = []

    // Itera pelas regras, ignora as inválidas
  if(regras[0].length !== 0 && regras[0][0] !== ""){  

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

  for(let i = 1; i <= linhas; i++){

    matrizGerada.push([])
    
    for(let j = 1; j <= colunas; j++){
        
        let valor = config.valorPadrao
        let cor = config.corPadrao

        regras.forEach((regra, k) => {
          if(regrasIgnorar.includes(k)) return
          if(regra.length == 0) return

          const pertence = returnRule(i, j, regra[0]);
          if (pertence) {

            valor = returnRule(i, j, regra[1]);
            cor = regra[2]
            
            try {
              valor = parseFloat(valor)
              valor = valor % 1 === 0 ? parseInt(valor) : valor
              // if(Number.isInteger(valor)) valor = parseInt(valor)
              // else valor = valor.toFixed(2)
              
              if(isNaN(valor)){
                document.getElementById("grid").innerHTML = "<strong>Erro na regra</strong>";
                return 
              }
            } catch (error) {
              document.getElementById("grid").innerHTML = "<strong>Erro na regra</strong>";
              console.log(error)
            }
          }
        });

        matrizGerada[i-1].push({valor, cor})
    }
  }

  criarMatriz(matrizGerada, null, true, false)
}