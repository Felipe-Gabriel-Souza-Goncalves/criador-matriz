function acharDeterminante(mat){

  if(mat.length != mat[0].length){
    alert("As matrizes devem ser quadradas")
    return
  }

  let dp = 0
  let ds = 0

  // Diagonal Principal
  for(let i = 0; i < mat.length; i++) {

    let diagonalAtual = 1
    
    for(let j = 0; j < mat[0].length; j++){

      // console.log(mat[(j) % mat.length][(j+i) % mat.length] )

      diagonalAtual *= mat[(j) % mat.length][(j+i) % mat.length] 

    }

    console.log(diagonalAtual)
    dp += diagonalAtual
  }

  // Diagonal Secundária
  for(let i = mat.length - 1; i > -1; i--) {

    let diagonalAtual = 1

    for(let j = mat.length -1 ; j > -1; j--){

      // console.log(mat[(j + mat.length) % mat.length][(j-i + mat.length) % mat.length])
      diagonalAtual *= mat[(j + mat.length) % mat.length][(j-i + mat.length) % mat.length] 

    }

    ds += diagonalAtual
  }

  const determinante = dp - ds
  return {determinante, dp, ds}
}
