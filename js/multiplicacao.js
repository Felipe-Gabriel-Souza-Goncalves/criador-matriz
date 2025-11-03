function multiplicarMatrizes(mat1, mat2) {
  // VERIFICAÇÕES
  // Se ambos são arrays
  if (!Array.isArray(mat1) || !Array.isArray(mat2)) {
    alert("Ambos os parâmetros devem ser arrays");
    return;
  }

  // Se ambos tem ao menos 1 valor
  if (mat1.length == 0 || mat2.length == 0) {
    alert("Ambas as matrizes devem ter ao menos 1 valor");
    return;
  }

  // Se tem o mesmo tamanho
  if (mat1.length !== mat2.length) {
    alert("Ambas as matrizes devem ter o mesmo tamanho");
    return;
  }

  // Se for um array bidimensional
  if (mat1[0][0] !== undefined) {
    let temMesmoTamanho = true;

    // Itera para procurar linhas de tamanhos diferentes
    mat1.forEach((linha, i) => {
      if (!temMesmoTamanho) return;
      if (linha.length !== mat2[i].length) temMesmoTamanho = false;
    });

    if (!temMesmoTamanho) {
      alert("Ambas as matrizes devem ter o mesmo tamanho");
      return;
    }

    // Se forem
  } else if (mat1[0].length !== mat2[0].length) {
    alert("Ambas as matrizes devem ter o mesmo tamanho");
    return;
  }

  const mat3 = [];
  const celulasAnimar = []

  mat1.forEach((linha, i) => {
    mat3.push([]);
    linha.forEach((coluna, j) => {
      const valorCelula = [];

      const celulasAnimacaoAtual = [[], []]

      linha.forEach((correspondente, k) => {

        // Multiplica como (matriz1[i][k] * matriz2[k][j]) para cada iteração

        // celulasAnimacaoAtual[0].push(correspondente)
        // celulasAnimacaoAtual[1].push(mat2[k][j])
        celulasAnimacaoAtual[0].push(i*linha.length + k)
        celulasAnimacaoAtual[1].push(k*mat2.length + j)

        // console.log(i,k + " -- " + k,j)

        valorCelula.push(correspondente * mat2[k][j]);
      });

      celulasAnimar.push([
        [[(i*mat1.length + j)], "resultado-multiplicacao-matriz"],
        [[celulasAnimacaoAtual[0]], "multiplicacao-matriz1"],
        [[celulasAnimacaoAtual[1]], "multiplicacao-matriz2"],
      ])



      const valorInicial = 0;
      const somaTotal = valorCelula.reduce(
        (prev, curr) => prev + curr,
        valorInicial
      );

      mat3[i].push(somaTotal);
    });
  });
  return {matriz: mat3, animacao: celulasAnimar};
}

function carregarMultiplicacao() {
  const resultado = "resultado-multiplicacao-matriz";
  const {matriz, animacao} = multiplicarMatrizes(
    matrizesOperacao["multiplicacao"][0],
    matrizesOperacao["multiplicacao"][1]
  );
  matrizAnimada = animacao

  console.log(matrizAnimada)

  criarMatriz(matriz, resultado, false, true);
}
