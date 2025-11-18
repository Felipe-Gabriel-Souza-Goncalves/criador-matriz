function criarMatrizLayout(){
  const linhas = document.getElementById("linhas").value;
  const colunas = document.getElementById("colunas").value;
  

  if((linhas <= 0 || linhas > 20) || (colunas <= 0 || colunas > 20)){
    document.getElementById("grid").innerHTML = "<strong>Linhas e colunas devem ser de 1 a 20</strong>"
    document.getElementById("grid").style.gridTemplateRows = `1fr`;
    document.getElementById("grid").style.gridTemplateColumns = `1fr`;

    (linhas <= 0 || linhas > 20) ?  document.getElementById("linhas").focus() : document.getElementById("colunas").focus()

    return
  }

  document.getElementById("container-personalizado-matrizes").setAttribute("data-linhas", linhas)
  document.getElementById("container-personalizado-matrizes").setAttribute("data-colunas", colunas)

  document.getElementById("grid").style.gridTemplateRows = `repeat(${linhas}, minmax(${200 / linhas}px, 1fr))`;
  document.getElementById("grid").style.gridTemplateColumns = `repeat(${colunas}, minmax(${200 / colunas}px, 1fr))`;
  document.getElementById("grid").innerHTML = "";


  for (let i = 1; i <= linhas; i++) {
    for (let j = 1; j <= colunas; j++) {
      const div = document.createElement("div");

      // Valores / cores padrão
      div.style.background = config.corPadrao;

      const input = document.createElement("input")
      input.type = "number"
      input.classList.add("input-matriz-personalizada")
      input.setAttribute("onfocusout", "matrizFinalizada()")

      div.appendChild(input)
      document.getElementById("grid").appendChild(div);
    }
  }
}

function matrizFinalizada(){
  const campo = document.getElementsByClassName("input-matriz-personalizada")
  const salvarPersonalizado = document.getElementById("salvar-personalizado")
  const matrizPersonalizada = []

  for(let i = 0; i < campo.length; i++){
    if(campo[i].value == "" || isNaN(campo[i].value)){
      salvarPersonalizado.style.display = "none"
      ultimaMatriz = undefined
      return
    }
  }

  const containerPersonalizado = document.getElementById("container-personalizado-matrizes")
  
  const linhas = parseInt(containerPersonalizado.getAttribute("data-linhas"))
  const colunas = parseInt(containerPersonalizado.getAttribute("data-colunas"))

  for (let i = 0; i < linhas; i++) {
    matrizPersonalizada.push([]);
    for (let j = 0; j < colunas; j++) {
      const valor = campo[i*colunas + j].value
      matrizPersonalizada[i].push(valor)
    }
  }

  salvarPersonalizado.style.display = "unset"
  ultimaMatriz = structuredClone(matrizPersonalizada)

}
