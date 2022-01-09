export class SpeedMeter {
    constructor() {
        this.element = document.getElementById('speed-meter');
        this.speed = 0;
    }

    updateSpeed(speed) {
        this.speed = speed;
        var speedText = (Math.abs(speed) * 100).toFixed(2);
        this.element.innerHTML = "Velocidade: " + speedText + " km/h";
    }

    reset() {
        this.element.innerHTML = "";
        this.speed = 0;
    }
}