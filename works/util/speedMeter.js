export class SpeedMeter {
    constructor() {
        this.element = document.getElementById('speed-meter');
        this.speed = 0;
    }

    updateSpeed(speed) {
        this.speed = speed;
        this.element.innerHTML = "Velocidade: " + (speed * 100).toFixed(2);
    }

    reset() {
        this.element.innerHTML = "";
        this.speed = 0;
    }
}