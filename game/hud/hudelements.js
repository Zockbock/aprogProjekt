class Hudtext {
    constructor(scene, text, parms={}) {
        this.scene = scene;

        this.x = (parms.x !== undefined) ? parms.x : 0;
        this.y = (parms.y !== undefined) ? parms.y : 0;

        this.color = (parms.color) ? parms.color : '#FFFFFF'

        this.text_ele = this.scene.add.text(this.x, this.y, text, {fontFamily: "Consolas", fontSize: 20, color:this.color});

        if(parms.origin == 'centered'){
            this.text_ele.setOrigin(0.5, 0);
        }
    }

    settext(newText) {
        this.text_ele.setText(newText);
    }
}


class Timer extends Hudtext {
    constructor(scene, text, max_time, parms={}){
        super(scene, text, parms);

        this.max_time = max_time;
        this.time = this.max_time;
        this.frame_cnt = 0;
    }

    update(){
        if(this.time > 0 && this.frame_cnt == 60){
            this.time--;
        }
        
        if(this.frame_cnt >= 60){
            this.frame_cnt = 0;
        }
        this.frame_cnt++;
        
        this.settext(this.time);
    }
}