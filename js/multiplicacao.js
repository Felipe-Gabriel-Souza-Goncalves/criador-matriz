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

      /* EXEMPLO
        mat1 = [
          [1, 2],
          [3, 4],
        ]

        mat2 = [
          [1],
          [2],
        ]
      */


      alert("Ambas as matrizes devem ter o mesmo tamanho")
      return
    }

    // Se forem 
  } else if(mat1[0].length !== mat2[0].length){
    alert("Ambas as matrizes devem ter o mesmo tamanho")
    return
  }

  const somaLinhas = []
  const somaColunas = []
  
  const mat3 = []

  // Soma as 2 matrizes
  // mat1.forEach((linha, i) =>{
  //   mat3.push([])

  //   if(Array.isArray(linha)){

  //     let valorSomaLinha = 0

  //     linha.forEach((item, j) =>{

  //       let valorSomaColuna = 0
        
  //       mat1[0].forEach(coluna => {
  //         valorSomaColuna += coluna
  //       })

  //       // valoresLinha[j] = item 


  //     })

  //   // Se forem de 1 dimensão
  //   } else{



  //   }
  
  // })
  
  return mat3
}
