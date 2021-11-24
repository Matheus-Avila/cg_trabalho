import { Track } from "../classes/track.js";

export class timeCheck{
    constructor(){
        this.numVoltas = 0;
    }

    numVolta = function(){
        this.numVoltas += 1;
        console.log(this.numVoltas, "/", 4);
    }

    voltaConcluida = function(track){
        for (var i = 1; i < track.blocks.length-1; i++) {
            track.blocks[i].crossed = false
        }
        this.numVolta()
    }
    checkVolta = function(track){
        var i;
        for (i = 0; i < track.blocks.length-1; i++) {
            if(track.blocks[i].crossed == false) return false; //Passou direto por algum bloco. Volta nao computada 
        }
        this.voltaConcluida(track);// Volta concluida! Reinicie crossed e compute a volta
        return true;
    }

    
}