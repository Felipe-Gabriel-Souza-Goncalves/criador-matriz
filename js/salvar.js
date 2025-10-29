let ultimaMatriz = undefined
let matrizesOperacao = {
    soma: [],
    subtracao: [],
    multiplicacao: [],
    determinante: []
}
let matrizesSalvas = []

function salvarMatriz(){
    if(ultimaMatriz == undefined) return

    let matrizesIguais = false
    matrizesSalvas.forEach(obj =>{
        if(obj.linhas == ultimaMatriz.length &&
           obj.colunas == ultimaMatriz[0].length)
        {
            compararMatriz(obj.matriz, ultimaMatriz)
        }
    })

    if(matrizesIguais){
        alert("Essa matriz já existe")
        return
    }

    const determinante = acharDeterminante(ultimaMatriz)

    matrizesSalvas.push({
        nome: "Matriz " + (matrizesSalvas.length + 1).toString().padStart(2, 0),
        matriz: ultimaMatriz,
        linhas: ultimaMatriz.length,
        colunas: ultimaMatriz[0].length,
        determinante: determinante || "Indefinido",
    })

    sessionStorage.setItem("matrizesSalvas", JSON.stringify(matrizesSalvas))

    alert("Matriz salva com sucesso")
    carregarMatrizesSalvas()
}

function compararMatriz(mat1, mat2){
    let matrizesIguais = true

    mat1.forEach((linha, i) =>{
        linha.forEach((celula, j) =>{
            if(celula != mat2[i][j]) matrizesIguais = false
        })
    })

    return matrizesIguais
}

function carregarMatrizesSalvas(carregar = false, local = null){

    const minhasMatrizes = local != null ?  
    document.getElementById(`${local}`) : document.getElementById("container-minhas-matrizes")

    minhasMatrizes.innerHTML = ""

    if(local != null){
        minhasMatrizes.style.display = "flex"
    }

    if(matrizesSalvas.length == 0){
        minhasMatrizes.innerHTML = "<p class='sem-matriz-salva'>Não há matrizes salvas</p>"
    }

    matrizesSalvas.forEach((item, i) =>{
        const containerMatriz = document.createElement("div")
        containerMatriz.classList.add("item-minha-matriz")

        const tamanho = document.createElement("sub")
        tamanho.innerHTML = item.linhas + "x" + item.colunas

        const nome = document.createElement("span")
        nome.innerHTML = item.nome + "<sub>"+ tamanho.innerHTML + "</sub>" + " - Determinante: Indefinido"

        containerMatriz.appendChild(nome)

        if (carregar) {
            const carregar = document.createElement("button")
            carregar.innerText = "Carregar"
            carregar.setAttribute("onclick", `carregarMatriz('${local}', ${JSON.stringify(item)})`)

            containerMatriz.appendChild(carregar)
        } else {
            const excluir = document.createElement("button")
            excluir.innerText = "Excluir"
            excluir.setAttribute("onclick", `excluirMatriz(${i})`)

            containerMatriz.appendChild(excluir)
        }


        minhasMatrizes.appendChild(containerMatriz)
    })
}

function apagarMatrizes(){
    matrizesSalvas = []
    sessionStorage.removeItem("matrizesSalvas")
    carregarMatrizesSalvas()
    alert("Matrizes apagadas")

}

function carregarMatriz(secao, obj){
    const grid = document.getElementById(`${secao}`)
    grid.classList.add("matriz-ocupada")
    grid.style.display = "grid"
    grid.innerHTML = ""

    grid.style.gridTemplateRows = `repeat(${obj.linhas}, minmax(${200 / obj.linhas}px, 1fr))`;
    grid.style.gridTemplateColumns = `repeat(${obj.colunas}, minmax(${200 / obj.colunas}px, 1fr))`;

    obj.matriz.forEach((linha, i) =>{
        linha.forEach((_, j) =>{
            const div = document.createElement("div");

            // Valores
            div.innerText = obj.matriz[i][j];
            
            grid.appendChild(div)
        })
    })

    const operacao = secao.split("-")[0]
    const index = parseInt(secao.charAt(secao.length - 1)) - 1

    matrizesOperacao[operacao][index] = obj.matriz
}

function excluirMatriz(i){
    matrizesSalvas.splice(i, 1)
    sessionStorage.setItem("matrizesSalvas", JSON.stringify(matrizesSalvas))
    carregarMatrizesSalvas()
}

document.addEventListener("DOMContentLoaded", () =>{
    if(sessionStorage.getItem("matrizesSalvas") != null){
        matrizesSalvas = JSON.parse(sessionStorage.getItem("matrizesSalvas"))
        carregarMatrizesSalvas()
    }
})