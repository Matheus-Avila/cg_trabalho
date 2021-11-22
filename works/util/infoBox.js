import { InfoBox } from "../../libs/util/util.js";

export function showInfoxBox() {
    var infoBox = new InfoBox();
    infoBox.add("Basic Scene");
    infoBox.addParagraph();
    infoBox.add("Use mouse to interact:");
    infoBox.add("* Left button to rotate");
    infoBox.add("* Right button to translate (pan)");
    infoBox.add("* Scroll to zoom in/out.");

    infoBox.show();
}