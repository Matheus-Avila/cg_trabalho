import { InfoBox } from "../../libs/util/util.js";

export function showInfoxBox() {
    var infoBox = new InfoBox();
    infoBox.add("Rock 'n Roll Racing");
    infoBox.addParagraph();   
    infoBox.add("Use mouse to interact with the camera:");
    infoBox.add("* Left button to rotate");
    infoBox.add("* Right button to translate (pan)");
    infoBox.add("* Scroll to zoom in/out.");
    infoBox.addParagraph();
    infoBox.add("Press 1 or 2 to change between the tracks.");

    infoBox.show();
}