import { InfoBox } from "../../libs/util/util.js";

export function showInfoxBox() {
    var infoBox = new InfoBox();
    infoBox.add("Rock 'n Roll Racing");
    infoBox.addParagraph();
    infoBox.add("Press 1 or 2 to change between the tracks.");

    infoBox.show();
    return infoBox;
}
export function addText( info, text){
    info.add(text);
    info.show();
}