let regras = [[]];
let inputRegra = 0;
let isCondicao = true;

const condicao = document.getElementsByClassName("regra-condicao");
const resultado = document.getElementsByClassName("regra-resultado");
const cor = document.getElementsByClassName("regra-cor");

function criarMatriz() {
  const linhas = document.getElementById("linhas").value;
  const colunas = document.getElementById("colunas").value;

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
            valor = valor.toFixed(2)
          } catch (error) {
            console.log("Erro ao converter",error)
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
}

function apagarChar() {
  const classe = isCondicao ? "regra-condicao" : "regra-resultado";
  const input = document.getElementsByClassName(classe)[inputRegra];

  input.value = input.value.slice(0, input.value.length - 1).trim();

  if (isCondicao) {
    regras[inputRegra][0] = input.value;
  } else {
    regras[inputRegra][1] = input.value;
  }
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
    console.log("Alguma condição vazia");
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

  novaCondicao.setAttribute("onclick", "inputRegra = regras.length - 1");
  novoResultado.setAttribute("onclick", "inputRegra = regras.length - 1");

  novaCor.setAttribute("onclick", "inputRegra = regras.length - 1");
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

function trocarTeclado(i) {
  const secoesTeclado = document.querySelectorAll(
    "div[id^='teclado-secao']"
  );
  for (let i = 0; i < secoesTeclado.length; i++) {
    secoesTeclado[i].style.display = "none";
  }

  secoesTeclado[i].style.display = "grid";
}