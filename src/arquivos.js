// arquivos.js
const fs = require('fs');

function leituraArquivo(vetor, nomeArquivo) {
    const data = fs.readFileSync(nomeArquivo, 'utf8');
    const linhasArquivo = data.split('\n');
    const linhaNumeros = linhasArquivo[linhasArquivo.length - 1].trim();

    linhaNumeros.split(", ").forEach(numero => {
        vetor.push(parseInt(numero, 10));
    });
}

function escritaArquivo(nomeArquivo, tabelaSaida) {
    const dataFormatada = new Date().toISOString().replace(/T/, '-').replace(/:/g, '-').split('.')[0];
    nomeArquivo += '-' + dataFormatada + '.csv';

    const conteudo = `Data e Hora de Geração: ${dataFormatada}\nTempos em segundos:\n${tabelaSaida}`;

    fs.writeFileSync(nomeArquivo, conteudo);
}

module.exports = { leituraArquivo, escritaArquivo };
