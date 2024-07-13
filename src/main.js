// main.js
const { calcularTabelaSaidaRadix } = require('./radixSort');
const { escritaArquivo } = require('./arquivos');

function main() {
    const nomeArquivoSaida = "datasets/tempoExecucao-JavaScript";
    let tabelaSaida = "";

    console.log("Calculando tabela de saída do Radix Sort...");
    tabelaSaida = calcularTabelaSaidaRadix([10000, 100000, 500000, 1000000], tabelaSaida);
    escritaArquivo(nomeArquivoSaida, tabelaSaida);
    console.log("Tabela de saída do Radix Sort calculada com sucesso!");
}

main();