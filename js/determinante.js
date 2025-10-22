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

    for(let j = 0; j < mat[0].length; j++){

      dp += mat[(j+i) % mat.length][(j+i) % mat.length] 

    }
  }

  // // DS
  for(let i = mat.length - 1; i > -1; i--) {

    for(let j = mat.length -1 ; j > -1; j--){

      ds += mat[(j-i + mat.length) % mat.length][(j-i + mat.length) % mat.length] 

    }
  }

  
}
