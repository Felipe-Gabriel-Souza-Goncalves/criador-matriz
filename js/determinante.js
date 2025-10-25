function acharDeterminante(mat){

  if(mat.length != mat[0].length){
    alert("As matrizes devem ser quadradas")
    return
  }

  let dp = 0
  let ds = 0

  // Diagonal Principal ⬊
  /*
   [⬊, x, x],    [x, ⬊, x],     [x, x, ⬊],
   [x, ⬊, x],    [x, x, ⬊],     [⬊, x, x],
   [x, x, ⬊],    [⬊, x, x],     [x, ⬊, x],
  */

  for(let i = 0; i < mat.length; i++) {

    let diagonalAtual = 1
    
    for(let j = 0; j < mat[0].length; j++){
      diagonalAtual *= mat[(j) % mat.length][(j+i) % mat.length] 
    }


    dp += diagonalAtual
  }

  // Diagonal Secundária
  /*
  [x, x, ↙],    [x, ↙, x],    [↙, x, x],
  [x, ↙, x],    [↙, x, x],    [x, x, ↙],
  [↙, x, x],    [x, x, ↙],    [x, ↙, x],
  */

  for(let i = 0; i < mat.length; i++) {

    let diagonalAtual = 1

    for(let j = mat.length -1 ; j > -1; j--){
      diagonalAtual *= mat[(i-j - 1 + mat.length) % mat.length][(j + mat.length) % mat.length] 
    }

    ds += diagonalAtual
  }

  const determinante = dp - ds
  return {determinante, dp, ds}
}
