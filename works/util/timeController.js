import { LapNumber } from "../util/enums.js";
let contagem = 0;
let contagemTotal = 0;
var element = document.getElementById('clock');
var minutes;
var secs;
var elementTotal = document.getElementById('clockTotal');
var minutesTotal;
var secsTotal;
var melhorVoltaSecs;
var melhorVoltaMins = -1;

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

        element.innerHTML = '';
        elementTotal.innerHTML = '';
        document.getElementById('1volta').innerHTML = '';
        document.getElementById('2volta').innerHTML = '';
        document.getElementById('3volta').innerHTML = '';
        document.getElementById('4volta').innerHTML = '';
    }

    numVolta = function () {
        this.numVoltas += 1;
        var volta_atual;
        switch (this.numVoltas) {
            case 1:
                volta_atual = LapNumber.one;
                break;
            case 2:
                volta_atual = LapNumber.two;
                break;
            case 3:
                volta_atual = LapNumber.three;
                break;
            case 4:
                volta_atual = LapNumber.four;
                break;
            default:
                break;
        }
        
        var element = document.getElementById(volta_atual);
        var tempoVolta = volta_atual + '-' + minutes + ':' + secs;
        contagem = 0;
        element.innerHTML = tempoVolta;
        if(minutes*60 + secs <= melhorVoltaMins*60 + melhorVoltaSecs || melhorVoltaMins == -1){
            console.log("Eu!");
            var elementBestLap = document.getElementById('melhor-volta');
            var textBestLap = 'Melhor volta- ' + minutes + ':' + secs;
            elementBestLap.innerHTML = textBestLap;
        }
    
        if (this.numVoltas == 4) {
            contagem = -1;
        }
    }

    resetCrossedBlocks = function(track) {
        for (var i = 0; i < track.blocks.length; i++) {
            track.blocks[i].crossed = false;
        }
    }

    checkLapCompleted = function (track) {
        var totalTrackBlocks = track.blocks.length;
        var totalBlocksCrossed = 0;

        for (var i = 0; i < track.blocks.length; i++) {
            if (track.blocks[i].crossed) 
                totalBlocksCrossed++;
        }

        if (totalBlocksCrossed >= totalTrackBlocks * 0.75)
        {
            this.resetCrossedBlocks(track);
            this.numVolta();
            return true;
        }

        return false;   
    }

    updateCounter = function () {
        if (contagem < 0) {
            element.innerHTML = 'Corrida concluída!!';
        } else {
            contagem++;
            minutes = Math.floor(contagem / 6000);
            secs = Math.floor(contagem / 100);
            if (secs >= 60) secs = secs % 60;
            var buffer = 'Volta Atual: ' + minutes + ':' + secs;
            element.innerHTML = buffer;

            contagemTotal++;
            minutesTotal = Math.floor(contagemTotal / 6000);
            secsTotal = Math.floor(contagemTotal / 100);
            if (secsTotal >= 60) secsTotal = secsTotal % 60;
            var bufferTotal = 'Tempo total: ' + minutesTotal + ':' + secsTotal;
            elementTotal.innerHTML = bufferTotal;
        }
    }
}