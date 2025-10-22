const matriz1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

const matriz2 = [
  [11, 22, 33],
  [44, 55, 66],
  [77, 88, 99],
]

const matriz3 = [
  [4, 8, 3],
  [7, 2, 6],
  [1, 5, 9],
]

function acharDeterminante(mat){

  if(mat.length != mat[0].length){
    alert("As matrizes devem ser quadradas")
    return
  }

  let dp = 0
  let ds = 0

  // DP
  for(let i = 0; i < mat.length; i++) {

    let diagonalAtual = 1
    
    for(let j = 0; j < mat[0].length; j++){

      // console.log(mat[(j) % mat.length][(j+i) % mat.length] )

      diagonalAtual *= mat[(j) % mat.length][(j+i) % mat.length] 

    }

    console.log(diagonalAtual)
    dp += diagonalAtual
  }

  // // DS
  for(let i = mat.length - 1; i > -1; i--) {

    let diagonalAtual = 1

    for(let j = mat.length -1 ; j > -1; j--){

      // console.log(mat[(j + mat.length) % mat.length][(j-i + mat.length) % mat.length])
      diagonalAtual += mat[(j + mat.length) % mat.length][(j-i + mat.length) % mat.length] 

    }

    ds += diagonalAtual
  }

  console.log("DP", dp)
  console.log("DS", ds)
  console.log("DETERMINANTE", dp - ds)
}

console.log(acharDeterminante(matriz1))
// console.log(acharDeterminante(matriz2))
// console.log(acharDeterminante(matriz3))