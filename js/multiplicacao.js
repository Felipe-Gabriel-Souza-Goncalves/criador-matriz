function multiplicarMatrizes(mat1, mat2){

  // VERIFICAÇÕES
  // Se ambos são arrays
  if(!Array.isArray(mat1) || !Array.isArray(mat2)){
    alert("Ambos os parâmetros devem ser arrays")
    return
  }

  // Se ambos tem ao menos 1 valor
  if(mat1.length == 0 || mat2.length == 0){
    alert("Ambas as matrizes devem ter ao menos 1 valor")
    return
  }


  // Se tem o mesmo tamanho
  if(mat1.length !== mat2.length){
    alert("Ambas as matrizes devem ter o mesmo tamanho")
    return
  }

  // Se for um array bidimensional
  if(mat1[0][0] !== undefined){

    let temMesmoTamanho = true

    // Itera para procurar linhas de tamanhos diferentes
    mat1.forEach((linha, i) =>{
      if(!temMesmoTamanho) return
      if(linha.length !== mat2[i].length) temMesmoTamanho = false
    })

    if(!temMesmoTamanho){
      alert("Ambas as matrizes devem ter o mesmo tamanho")
      return
    }

    // Se forem 
  } else if(mat1[0].length !== mat2[0].length){
    alert("Ambas as matrizes devem ter o mesmo tamanho")
    return
  }

  const mat3 = []
  const equacao = []

  mat1.forEach((linha, i) =>{
    mat3.push([])
    equacao.push([])
    linha.forEach((coluna, j) =>{
      const valorCelula = []
      const subequacao = []

      linha.forEach((correspondente, k) =>{
        valorCelula.push(correspondente * mat2[k][j])
        subequacao.push(correspondente+"*"+mat2[k][j]+"+")
      })

      const valorInicial = 0
      const somaTotal = valorCelula.reduce((prev, curr) => prev+curr, valorInicial)

      mat3[i].push(somaTotal)
      equacao[i].push(subequacao)
    })
  })
  return mat3
}

function carregarMultiplicacao(){
  const resultado = "resultado-multiplicacao-matriz"
  const matriz = multiplicarMatrizes(
    matrizesOperacao["multiplicacao"][0],
    matrizesOperacao["multiplicacao"][1]
  )

  criarMatriz(matriz, resultado)
}
