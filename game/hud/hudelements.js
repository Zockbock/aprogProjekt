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

        if(parms.origin_x !== undefined){
            this.text_ele.setOrigin(parms.origin_x, 0);
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


class Highscore extends Hudtext {
    constructor(scene, highscore, parms={}){
        super(scene, `Highscore: --`, parms)
        
        this.highscore = highscore;

        this.settext(`Highscore: ${this.highscore}`);
    }

    update(){
        if(this.highscore < coinscnt){
            this.highscore = coinscnt;
            this.settext(`Highscore: ${this.highscore}`);
        }
    }
}



class FramedText {
    constructor(scene, text, parms={}){
        this.scene = scene;

        this.text = //text;
        this.create_frame({width:15, height:10, ver:'║', hor: '═', corner:'╔╗╝╚'});

        this.x = (parms.x !== undefined) ? parms.x : 0;
        this.y = (parms.y !== undefined) ? parms.y : 0;

        this.frame_color = (parms.frame_color !== undefined) ? parms.frame_color : '#FFFFFF';
        this.frame_base = (parms.frame_char !== undefined) ? parms.frame_char : '0';


        this.frame = this.scene.add.text(this.x, this.y, this.text, {fontFamily: "Consolas", fontSize: 20, color:this.frame_color});
    }

    create_frame(parms={}){
        let frame_text = '';
        
        // loop through all chars
        for(let h = 0; h < parms.height; h++){
            for(let w = 0; w < parms.width; w++){

                // Set frame chars
                // whole frame same char
                if(parms.char !== undefined && ((h == 0 || h == parms.height - 1) || (w == 0 || w == parms.width - 1))){
                    frame_text += parms.char;
                }
                // corners
                else if((h == 0 || h == parms.height - 1) && (w == 0 || w == parms.width - 1)){
                    // one symbol for all corners
                    if(typeof parms.corner === 'string' && parms.corner.length < 4){
                        frame_text += parms.corner[0];
                    } 
                    
                    // spevific char for every corner
                    else if(typeof parms.corner === 'string' && parms.corner.length == 4){
                        if(w == 0 && h == 0) frame_text += parms.corner[0];
                        else if(w != 0 && h == 0) frame_text += parms.corner[1];
                        else if(w != 0 && h != 0) frame_text += parms.corner[2];
                        else if(w == 0 && h != 0) frame_text += parms.corner[3];
                    }

                    // no corner char defined
                    else {
                        frame_text += 'c';
                    }
                }
                // left right
                else if((h != 0 || h != parms.height - 1) && (w == 0 || w == parms.width - 1)){
                    frame_text += parms.ver ? parms.ver : 'l';
                } 
                //top bottom
                else if((h == 0 || h == parms.height - 1)){
                    frame_text += parms.hor ? parms.hor : 't';
                } 
                // everything inside
                else {
                    frame_text += ' ';
                }
            }

            // add linebreak
            frame_text += '\n';
        }

        return frame_text;
    }
}