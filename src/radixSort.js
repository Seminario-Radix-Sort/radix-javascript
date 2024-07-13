// radixSort.js
const fs = require('fs');
const { leituraArquivo } = require('./arquivos');

function calcularTabelaSaidaRadix(tamanhos, tabelaSaida) {
    const ordens = ["Aleatorio", "Crescente", "Decrescente"];
    const tipos = ["", "-RangeMenor", "-RangeMaior", "-CEP", "-Iguais", "-Extremo"];
    let nomeArquivo = "";

    tabelaSaida += "Tamanho/Tipo,Aleatorio,Aleatorio-RangeMenor,Aleatorio-RangeMaior,Aleatorio-CEP,Aleatorio-Iguais,Aleatorio-Extremo,Crescente,Crescente-RangeMenor,Crescente-RangeMaior,Crescente-CEP,Crescente-Iguais,Crescente-Extremo,Decrescente,Decrescente-RangeMenor,Decrescente-RangeMaior,Decrescente-CEP,Decrescente-Iguais,Decrescente-Extremo\n";
    let tempoTotal = 0.0;

    tamanhos.forEach(tamanho => {
        tabelaSaida += `${tamanho},`;

        ordens.forEach(ordem => {
            tipos.forEach(tipo => {
                nomeArquivo = `datasets/${ordem.toLowerCase()}s/${tamanho}${ordem}${tipo}.txt`;
                const vetor = [];

                leituraArquivo(vetor, nomeArquivo);

                let tempoMedio = 0.0;
                for (let i = 0; i < 10; i++) {
                    const vetorCopia = [...vetor];
                    const inicio = new Date().getTime();
                    radixSort(vetorCopia);
                    const fim = new Date().getTime();
                    const tempo = (fim - inicio) / 1000;
                    tempoTotal += tempo;
                    tempoMedio += tempo;
                }

                const media = tempoMedio / 10.0;
                tabelaSaida += `${media.toFixed(8)},`;
            });
        });

        tabelaSaida += "\n";
    });

    tabelaSaida += `Tempo Total,${tempoTotal.toFixed(10)}\n`;
    tabelaSaida += `Tempo Médio Total,${(tempoTotal / 720).toFixed(8)}\n`;
    return tabelaSaida;
}

function radixSort(vetor) {
    function achaMaior(vetor) {
        let maior = 0;
        vetor.forEach(i => {
            if (i > maior) {
                maior = i;
            }
        });
        return maior;
    }

    function countingSort(vetor, exp) {
        const saida = new Array(vetor.length).fill(0);
        const count = new Array(10).fill(0);

        vetor.forEach(i => {
            count[Math.floor(i / exp) % 10]++;
        });

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = vetor.length - 1; i >= 0; i--) {
            saida[count[Math.floor(vetor[i] / exp) % 10] - 1] = vetor[i];
            count[Math.floor(vetor[i] / exp) % 10]--;
        }

        for (let i = 0; i < vetor.length; i++) {
            vetor[i] = saida[i];
        }
    }

    let maior = achaMaior(vetor);
    let exp = 1;

    while (Math.floor(maior / exp) > 0) {
        countingSort(vetor, exp);
        exp *= 10;
    }
}

module.exports = { calcularTabelaSaidaRadix, radixSort };
