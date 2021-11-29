let contagem = 0;
let contagemTotal = 0;
var element = document.getElementById('clock');
var minutes;
var secs;
var mili;
var elementTotal = document.getElementById('clockTotal');
var minutesTotal;
var secsTotal;
var miliTotal;

export class timeCheck {
    constructor() {
        this.numVoltas = 0;
    }

    reset = function () {
        this.numVoltas = 0;
        contagem = 0;
        contagemTotal = 0;
        minutes = 0;
        secs = 0;
        mili = 0;

        element.innerHTML = '';
        elementTotal.innerHTML = '';
        document.getElementById('1volta').innerHTML = '';
        document.getElementById('2volta').innerHTML = '';
        document.getElementById('3volta').innerHTML = '';
        document.getElementById('4volta').innerHTML = '';
    }

    numVolta = function () {
        this.numVoltas += 1;
        if (this.numVoltas == 1) {
            var element = document.getElementById('1volta');
            var tempoVolta1 = 'Tempo 1° volta: ' + minutes + ':' + secs + ':' + mili;
            contagem = 0;
            element.innerHTML = tempoVolta1;
        }
        if (this.numVoltas == 2) {
            var element = document.getElementById('2volta');
            var tempoVolta2 = 'Tempo 2° volta: ' + minutes + ':' + secs + ':' + mili;
            contagem = 0;
            element.innerHTML = tempoVolta2;
        }
        if (this.numVoltas == 3) {
            var element = document.getElementById('3volta');
            var tempoVolta3 = 'Tempo 3° volta: ' + minutes + ':' + secs + ':' + mili;
            contagem = 0;
            element.innerHTML = tempoVolta3;
        }
        if (this.numVoltas == 4) {
            var element = document.getElementById('4volta');
            var tempoVolta4 = 'Tempo 4° volta: ' + minutes + ':' + secs + ':' + mili;
            contagem = -1;
            element.innerHTML = tempoVolta4;
        }
        console.log(this.numVoltas, "/", 4);
        if (this.numVoltas == 4) console.log("Fim de jogo!");
    }

    voltaConcluida = function(track){
        for (var i = 1; i < track.blocks.length-1; i++) {
            track.blocks[i].crossed = false;
        }

        this.numVolta();
    }

    checkVolta = function (track) {
        var i;
        for (i = 0; i < track.blocks.length-1; i++) {
            if(track.blocks[i].crossed == false) return false; //Passou direto por algum bloco. Volta nao computada 
        }
        this.voltaConcluida(track); // Volta concluida! Reinicie crossed e compute a volta
        return true;
    }

    updateCounter = function () {
        if (contagem < 0) {
            element.innerHTML = 'Corrida concluída!!';
        } else {
            contagem++;
            minutes = Math.floor(contagem / 6000);
            secs = Math.floor(contagem / 100);
            mili = contagem % 100;
            if (secs >= 60) secs = secs % 60;
            var buffer = 'Volta Atual: ' + minutes + ':' + secs + ':' + mili;
            element.innerHTML = buffer;

            contagemTotal++;
            minutesTotal = Math.floor(contagemTotal / 6000);
            secsTotal = Math.floor(contagemTotal / 100);
            miliTotal = contagemTotal % 100;
            if (secsTotal >= 60) secsTotal = secsTotal % 60;
            var bufferTotal = 'Tempo total: ' + minutesTotal + ':' + secsTotal + ':' + miliTotal;
            elementTotal.innerHTML = bufferTotal;
        }
    }
}