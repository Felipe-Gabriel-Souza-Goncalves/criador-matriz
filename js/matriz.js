const condicao = document.getElementsByClassName("regra-condicao");
const resultado = document.getElementsByClassName("regra-resultado");
const cor = document.getElementsByClassName("regra-cor");

async function criarMatriz(matriz, grid = null, regra = false, animacaoAtiva = config.animacaoAtiva) {
  if (!matriz) return;

  const linhas = matriz.length || document.getElementById("linhas").value;
  const colunas = matriz[0].length || document.getElementById("colunas").value;
  const gridMatriz = grid != null ? grid : "grid";

  document.getElementById(gridMatriz).style.display = "grid";
  document.getElementById(gridMatriz).style.gridTemplateRows = `repeat(${linhas}, minmax(${200 / linhas}px, 1fr))`;
  document.getElementById(gridMatriz).style.gridTemplateColumns = `repeat(${colunas}, minmax(${200 / colunas}px, 1fr))`;
  document.getElementById(gridMatriz).innerHTML = "";

  if (colunas > 7 || linhas > 7) {
    document.getElementById("grid").style.width = "500px";
  }
  if (colunas > 13 || linhas > 13) {
    document.getElementById("grid").style.width = "750px";
  }

  if (!animacaoAtiva) {
    for (let i = 0; i < linhas; i++) {
      for (let j = 0; j < colunas; j++) {
        const div = document.createElement("div");

        if (regra) {
          // Valores / cores padrão
          div.innerText =
            typeof matriz[i][j].valor == "number" ? matriz[i][j].valor : config.valorPadrao;

          div.style.background =
            typeof matriz[i][j].cor == "string" ? matriz[i][j].cor : config.corPadrao;
        } else {
          div.innerText = typeof matriz[i][j] == "number" ? matriz[i][j] : config.valorPadrao;
          div.style.background = config.corPadrao;
        }

        document.getElementById(gridMatriz).appendChild(div);
      }
    }
  } else {
    alterarCorAnimacao()
    
    for (let i = 0; i < linhas; i++) {
      for (let j = 0; j < colunas; j++) {
        const div = document.createElement("div");

        div.innerText = typeof matriz[i][j] == "number" ? matriz[i][j] : config.valorPadrao;

        document.getElementById(gridMatriz).appendChild(div);

        for (let conjunto of matrizAnimada[i * colunas + j]) {

          const celulasGrid = document.querySelectorAll(`#${conjunto[1]} div`);

          for (let n = 0; n < conjunto[0].length; n++) {

            // console.log("Celula: " , celulasGrid[conjunto[0][n]], conjunto[0][n], conjunto[0])
            // console.log(conjunto, conjunto[0][n], conjunto[0][n][n], celulasGrid)

            if(Array.isArray(conjunto[0][n])){
              conjunto[0][n].forEach(indexCelula =>{
                celulasGrid[indexCelula].classList.add("celula-animada");
              })
            } else{
              celulasGrid[conjunto[0][n]].classList.add("celula-animada");
            }
          }
        }

        await new Promise((resolve, reject) => {
          setTimeout(() => {resolve();}, config.intervaloAnimacao * 1000);
        });

        const celulasAnimadas = document.querySelectorAll(".celula-animada");

        for (let k = 0; k < celulasAnimadas.length; k++) {
          celulasAnimadas[k].classList.remove("celula-animada");
        }

        div.style.background = config.corPadrao;
      }
    }
  }

  ultimaMatriz = structuredClone(matriz);
}

function gerarMatrizAleatoria() {
  const resposta = verificarLinhasColunas();
  if (!resposta) return;

  const { linhas, colunas } = { ...resposta };

  const min = parseInt(document.getElementById("aleatorio-valor-minimo").value);
  const max = parseInt(document.getElementById("aleatorio-valor-maximo").value);

  if (max < min) return;

  const matrizGerada = [];

  for (let i = 1; i <= linhas; i++) {
    matrizGerada.push([]);
    for (let j = 1; j <= colunas; j++) {
      const alcance = Math.abs(max - min);
      const valor = Math.floor(Math.random() * alcance + 1 + min);

      matrizGerada[i - 1].push(valor);
    }
  }

  criarMatriz(matrizGerada, null, false, false);

  ultimaMatriz = matrizGerada;
}

function verificarLinhasColunas() {
  const linhas = document.getElementById("linhas").value;
  const colunas = document.getElementById("colunas").value;

  if (linhas <= 0 || linhas > 20 || colunas <= 0 || colunas > 20) {
    document.getElementById("grid").innerHTML =
      "<strong>Linhas e colunas devem ser de 1 a 20</strong>";
    document.getElementById("grid").style.gridTemplateRows = `1fr`;
    document.getElementById("grid").style.gridTemplateColumns = `1fr`;

    linhas <= 0 || linhas > 20
      ? document.getElementById("linhas").focus()
      : document.getElementById("colunas").focus();

    return false;
  }

  return { linhas, colunas };
}
