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
        matriz: ultimaMatriz,
        linhas: ultimaMatriz.length,
        colunas: ultimaMatriz[0].length,
        determinante: undefined,
    })

    console.log(matrizesSalvas)
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