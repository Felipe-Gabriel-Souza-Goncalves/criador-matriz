function digitarRegra(char, charShow = null) {
  if (isCondicao == true) {
    if (!regras[inputRegra][0]) regras[inputRegra][0] = "";
    regras[inputRegra][0] += char;

    // Atualizar elemento
    document.getElementsByClassName("regra-condicao")[inputRegra].value += charShow || char;

  } else {
    if (!regras[inputRegra][1]) regras[inputRegra][1] = "";
    regras[inputRegra][1] += char;

    // Atualizar elemento
    document.getElementsByClassName("regra-resultado")[inputRegra].value += charShow || char;
  }

  const classe = (isCondicao ? "regra-condicao" : "regra-resultado")
  const input = document.getElementsByClassName(classe)[inputRegra]

  lengthOp.push([char.length, (charShow ? charShow.length : char.length), input])
}

function limparRegra() {
  const classe = isCondicao ? "regra-condicao" : "regra-resultado";
  const input = document.getElementsByClassName(classe)[inputRegra];

  input.value = "";

  if (isCondicao) {
    regras[inputRegra][0] = "";
  } else {
    regras[inputRegra][1] = "";
  }
}

function limparTodasRegras(){
  document.getElementById("container-regras").innerHTML = `
            <div class="conjunto-regras">
              <input
                type="text"
                class="regra-condicao"
                readonly
                onfocus="isCondicao = true; inputRegra = 0"
                placeholder="Ex: i>j"
              />
              <input
                type="text"
                class="regra-resultado"
                readonly
                onfocus="isCondicao = false; inputRegra = 0"
                placeholder="Ex: 2×i + 3"
              />
              <input
                type="color"
                class="regra-cor"
                onclick="inputRegra = 0"
                onchange="regras[inputRegra][2] = cor[inputRegra].value"
                value="#efefef"
              />
            </div>
          `
  lengthOp = []
  regras = [[]]
  inputRegra = 0
}


function criarInputRegra() {
  const ultimaCondicao = condicao[condicao.length - 1].value;
  const ultimoResultado = resultado[resultado.length - 1].value;

  if (!ultimaCondicao.trim() || !ultimoResultado.trim()) {
    document.getElementById("grid").innerHTML = "<strong>Alguma condição vazia</strong>";
    return;
  }

  regras.push([]);

  const novaCondicao = document.createElement("input");
  const novoResultado = document.createElement("input");
  const novaCor = document.createElement("input");

  novaCondicao.readOnly = true;
  novaCondicao.placeholder = "Ex: i>j"
  novoResultado.readOnly = true;
  novoResultado.placeholder = "Ex: 2×i + 3"
  novaCor.type = "color";

  novaCondicao.classList.add("regra-condicao");
  novoResultado.classList.add("regra-resultado");
  novaCor.classList.add("regra-cor");

  novaCondicao.setAttribute("onfocus", `isCondicao = true; inputRegra = ${regras.length - 1}`);
  novoResultado.setAttribute("onfocus", `isCondicao = false; inputRegra = ${regras.length - 1}`);

  novaCor.setAttribute("onclick", `inputRegra = ${regras.length - 1}`);
  novaCor.setAttribute(
    "onchange",
    "regras[inputRegra][2] = cor[inputRegra].value"
  );
  novaCor.value = "#efefef"

  const div = document.createElement("div")
  div.classList.add("conjunto-regras")


  div.appendChild(novaCondicao);
  div.appendChild(novoResultado);
  div.appendChild(novaCor);

  document.getElementById("container-regras").appendChild(div)
}

function returnRule(i = null, j = null, rule) {
  try {
    let resultado = eval(rule);

    if(resultado == undefined){
      rule.replaceAll('i', i)
      rule.replaceAll('j', j)
      
      resultado = eval(rule)
    }
    if(resultado == undefined) throw new Error("Resultado undefined")
    

    return resultado;
  } catch (error) {
    console.log(resultado);
  }
}