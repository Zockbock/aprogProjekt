class Hudtext {
    constructor(scene, text, parms={}) {
        this.scene = scene;

        this.x = (parms.x !== undefined) ? parms.x : 0;
        this.y = (parms.y !== undefined) ? parms.y : 0;

        this.color = (parms.color) ? parms.color : '#FFFFFF'

        this.text_ele = this.scene.add.text(this.x, this.y, text, {fontFamily: "Consolas", fontSize: 20, color:this.color});
    }

    settext(newText) {
        this.text_ele.setText(newText);
    }
}