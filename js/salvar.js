let ultimaMatriz = undefined
let matrizesOperacao = {
    soma: [],
    subtracao: [],
    multiplicacao: [],
    determinante: []
}
let matrizesSalvas = [
    {
        "nome": "Matriz 1",
        "matriz":     [
            [1, 2, 1],
            [2, 1, 2],
            [1, 2, 3],
        ],
        "linhas": 3,
        "colunas": 3,
        "determinante": undefined,
    },
    
    {
        "nome": "Matriz 2",
        "matriz": [
            [11, 22, 33],
            [44, 55, 66],
            [77, 88, 99],
        ],
        "linhas": 3,
        "colunas": 3,
        "determinante": undefined,
    },
    
    {
        "nome": "Matriz 3",
        "matriz": [
            [4, 8, 3],
            [7, 2, 6],
            [1, 5, 9],
        ],
        "linhas": 3,
        "colunas": 3,
        "determinante": undefined,
    },
]

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

function carregarMatrizesSalvas(carregar = false, local = null){

    const minhasMatrizes = local != null ?  document.getElementById(`${local}`) : document.getElementById("minhas-matrizes")
    console.log(minhasMatrizes)
    minhasMatrizes.innerHTML = ""

    if(local != null){
        minhasMatrizes.style.display = "flex"
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
            excluir.click = excluirMatriz(id)

            containerMatriz.appendChild(excluir)
        }


        minhasMatrizes.appendChild(containerMatriz)
    })
}

function apagarMatrizes(){
    matrizesSalvas = []
    carregarMatrizesSalvas()
    alert("Matrizes apagadas")

}

function carregarMatriz(secao, obj){
    const grid = document.getElementById(`${secao}`)
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

    console.log(matrizesOperacao)


}

function excluirMatriz(id){
    console.log("testing")
}