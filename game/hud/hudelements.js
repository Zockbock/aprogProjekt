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
        this.create_frame(4, 4, {ver:'║', hor: '═', corner:'╔╗╝╚'}).join('\n');

        this.x = (parms.x !== undefined) ? parms.x : 0;
        this.y = (parms.y !== undefined) ? parms.y : 0;

        this.frame_color = (parms.frame_color !== undefined) ? parms.frame_color : '#FFFFFF';
        this.frame_base = (parms.frame_char !== undefined) ? parms.frame_char : '0';


        this.frame = this.scene.add.text(this.x, this.y, this.text, {fontFamily: "Consolas", fontSize: 20, color:this.frame_color});
    }

    /**
     * Generates a frame with given width and height like this
     * 
     *  +---+
     *  |   |
     *  +---+ 
     * 
     * @param {Number} width The width of the frame in amount of character 
     * @param {Number} height The height of the frame in amount of character 
     * @param {Object} parms The look of the frame as values of an object:
     *  ver:    vertical characters (left and rigth)
     *  hor:    horizontal characters (top and bottom)
     *  corner: a String of 1 or 4 characters that 
     *          define(s) the look of the corners (clockwise)
     *  char:   a single character that fills the whole frame 
     *          (prioritised over every other argument)
     * @returns the frame as a String-Array
     */
    create_frame(width, height, parms={}){
        let frame = new Array();
        let line_text = '';
        
        // loop through all chars
        for(let h = 0; h < height; h++){
            for(let w = 0; w < width; w++){

                // Set frame chars
                // empty space
                if((w > 0 && w < width - 1) && (h > 0 && h < height - 1)){
                    line_text += ' ';
                }
                // whole frame same char
                else if(parms.char !== undefined && ((h == 0 || h == height - 1) || (w == 0 || w == width - 1))){
                    line_text += parms.char;
                }
                // corners
                else if((w == 0 || w == width - 1) && (h == 0 || h == height - 1)){
                    // one symbol for all corners
                    if(typeof parms.corner === 'string' && parms.corner.length < 4){
                        line_text += parms.corner[0];
                    } 
                    
                    // spevific char for every corner
                    else if(typeof parms.corner === 'string' && parms.corner.length == 4){
                        if(w == 0 && h == 0) line_text += parms.corner[0];
                        else if(w != 0 && h == 0) line_text += parms.corner[1];
                        else if(w != 0 && h != 0) line_text += parms.corner[2];
                        else if(w == 0 && h != 0) line_text += parms.corner[3];
                    }

                    // no corner char defined
                    else {
                        line_text += 'c';
                    }
                }
                //top bottom
                else if((w != 0 || w != width - 1) && (h == 0 || h == height - 1)){
                    line_text += parms.hor ? parms.hor : 't';
                } 
                // left right
                else if((h != 0 || h != height - 1) ){
                    line_text += parms.ver ? parms.ver : 'l';
                }
            }

            // next line
            frame.push(line_text);
            line_text = '';
        }

        return frame;
    }
}