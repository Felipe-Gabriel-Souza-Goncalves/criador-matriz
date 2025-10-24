let ultimaMatriz = undefined
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

    matrizesSalvas.push({
        nome: "Matriz " + (matrizesSalvas.length + 1).toString().padStart(2, 0),
        matriz: ultimaMatriz,
        linhas: ultimaMatriz.length,
        colunas: ultimaMatriz[0].length,
        determinante: undefined,
    })

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

function carregarMatrizesSalvas(){
    const minhasMatrizes = document.getElementById("minhas-matrizes")
    minhasMatrizes.innerHTML = ""

    matrizesSalvas.forEach((item, i) =>{
        const containerMatriz = document.createElement("div")
        containerMatriz.classList.add("item-minha-matriz")

        const tamanho = document.createElement("sub")
        tamanho.innerHTML = item.linhas + "x" + item.colunas

        const nome = document.createElement("span")
        nome.innerHTML = item.nome + "<sub>"+ tamanho.innerHTML + "</sub>" + " - Determinante: Indefinido"


        const carregar = document.createElement("button")
        carregar.innerText = "Carregar"
        // carregar.click = carregarMatriz(item.matriz)

        containerMatriz.appendChild(nome)
        containerMatriz.appendChild(carregar)

        minhasMatrizes.appendChild(containerMatriz)
    })
}

function apagarMatrizes(){
    matrizesSalvas = []
    carregarMatrizesSalvas()
    alert("Matrizes apagadas")

}