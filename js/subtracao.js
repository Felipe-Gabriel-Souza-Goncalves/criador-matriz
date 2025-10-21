// const matriz1 = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ]

// const matriz2 = [
//   [11, 22, 33],
//   [44, 55, 66],
//   [77, 88, 99],
// ]

// const matriz3 = [
//   [4, 8, 3],
//   [7, 2, 6],
//   [1, 5, 9],
// ]

// function subtrairMatrizes(mat1, mat2){

//   // VERIFICAÇÕES
//   // Se ambos são arrays
//   if(!Array.isArray(mat1) || !Array.isArray(mat2)){
//     alert("Ambos os parâmetros devem ser arrays")
//     return
//   }

//   // Se ambos tem ao menos 1 valor
//   if(mat1.length == 0 || mat2.length == 0){
//     alert("Ambas as matrizes devem ter ao menos 1 valor")
//     return
//   }

//   // Se tem o mesmo tamanho
//   if(mat1.length !== mat2.length){
//     alert("Ambas as matrizes devem ter o mesmo tamanho")
//     return
//   }

//   // Se for um array bidimensional
//   if(mat1[0][0] !== undefined){

//     let temMesmoTamanho = true

//     // Itera para procurar linhas de tamanhos diferentes
//     mat1.forEach((linha, i) =>{
//       if(!temMesmoTamanho) return
//       if(linha.length !== mat2[i].length) temMesmoTamanho = false
//     })

//     if(!temMesmoTamanho){

//       /* EXEMPLO
//         mat1 = [
//           [1, 2],
//           [3, 4],
//         ]

//         mat2 = [
//           [1],
//           [2],
//         ]
//       */


//       alert("Ambas as matrizes devem ter o mesmo tamanho")
//       return
//     }

//     // Se forem 
//   } else if(mat1[0].length !== mat2[0].length){
//     alert("Ambas as matrizes devem ter o mesmo tamanho")
//     return
//   }

//   const mat3 = []

//   // Soma as 2 matrizes
//   mat1.forEach((linha, i) =>{
//     mat3.push([])

//     if(Array.isArray(linha)){

//       linha.forEach((item, j) =>{
//         mat3[i][j] = item - mat2[i][j]  
//       })

//     // Se forem de 1 dimensão
//     } else{
//       mat3[i][j] = linha - mat2[i]
//     }

//   })

  
//   mat3.forEach(row =>{
//     console.log(row)
//   })
//   console.log("\n")


//   return mat3
// }