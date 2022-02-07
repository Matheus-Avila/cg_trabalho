export class InfoBox {
  constructor() {
    this.infoBox = this.buildInfoBox();
  }

  buildInfoBox() {
    var infoBox = document.createElement('div');
    infoBox.id = "InfoxBox";
    infoBox.style.padding = "6px 14px";
    infoBox.style.position = "fixed";
    infoBox.style.bottom = "0";
    infoBox.style.right = "0";
    infoBox.style.backgroundColor = "rgba(255,255,255,0.2)";
    infoBox.style.color = "white";
    infoBox.style.fontFamily = "sans-serif";
    infoBox.style.userSelect = "none";
    infoBox.style.textAlign = "left";

    return infoBox;
  }

  showGameplayInfoBox() {
    this.add("Rock 'n Roll Racing - Gameplay Mode");
    this.addParagraph();
    this.add("Press X to accelerate");
    this.add("Press left or right to change direction");
    this.add("Press down to brake or to back up");
    this.add("Press 1 2 3 4 to change between the tracks");
    this.add("Press space to change modes (gameplay or inspection)");
    this.show();
  }

  showInspectionInfoBox() {
    this.add("Rock 'n Roll Racing - Inspection Mode");
    this.addParagraph();
    this.add("Use mouse to interact:");
    this.add("Left button to rotate");
    this.add("Right button to translate (pan)");
    this.add("Scroll to zoom in/out");
    this.show();
  }

  add(text) {
    var textnode = document.createTextNode(text);
    this.infoBox.appendChild(textnode);
    this.addParagraph();
  }

  addParagraph() {
    const paragraph = document.createElement("br")
    this.infoBox.appendChild(paragraph);;
  }

  show() {
    document.body.appendChild(this.infoBox);
  }

  clear() {
    document.body.removeChild(this.infoBox);
    this.infoBox = this.buildInfoBox();
  }
}