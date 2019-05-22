class Hudtext {
    constructor(scene, text, parms={}) {
        this.scene = scene;

        this.x = (parms.x) ? parms.x : 10;
        this.y = (parms.y) ? parms.y : 10;

        this.color = (parms.color) ? parms.color : '#FFFFFF'

        this.text_ele = this.scene.add.text(this.x, this.y, text, {fontFamily: "Consolas", fontSize: 20, color:this.color});
    }

    settext(newText) {
        this.text_ele.setText(newText);
    }
}