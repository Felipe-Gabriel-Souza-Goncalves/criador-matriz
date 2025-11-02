function somaSubtracaoMatrizes(mat1, mat2, operacao){

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
  const celulasAnimar = []

  // Soma as 2 matrizes
  mat1.forEach((linha, i) =>{
    mat3.push([])

    if(Array.isArray(linha)){

      linha.forEach((item, j) =>{

        if(operacao == "soma"){
          mat3[i][j] = item + mat2[i][j]  

          celulasAnimar.push([
            [[(i*mat1.length + j)], "resultado-soma-matriz"],
            [[(i*mat1.length + j)], "soma-matriz1"],
            [[(i*mat1.length + j)], "soma-matriz2"],
          ])

        } else if(operacao == "subtracao"){
          mat3[i][j] = item - mat2[i][j]  

          celulasAnimar.push([
            [[(i*mat1.length + j)], "resultado-subtracao-matriz"],
            [[(i*mat1.length + j)], "subtracao-matriz1"],
            [[(i*mat1.length + j)], "subtracao-matriz2"],
          ])

        }
      })

    // Se forem de 1 dimensão
    } else{

      if(operacao == "soma"){
        mat3[i] = linha + mat2[i]  
      } else if(operacao == "subtracao"){
        mat3[i] = linha - mat2[i]  
      }

    }
  
  })
  
  return {matriz: mat3, animacao: celulasAnimar}
}
 
function operacaoMatrizes(operacao){
  if(!operacao){
    console.log("Operação não fornecida")
    return
  }

  const eResultado = `resultado-${operacao}-matriz` 
  const {matriz, animacao} = somaSubtracaoMatrizes(
    matrizesOperacao[`${operacao}`][0],
    matrizesOperacao[`${operacao}`][1],
    `${operacao}`)
  
  matrizAnimada = animacao

  criarMatriz(matriz, eResultado)
}


