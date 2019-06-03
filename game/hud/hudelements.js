/**
 * Class to draw text on canvas.
 */
class Hudtext {
    /**
     * Constructor of class Hudtext.
     * Adds a textelement with given parameters to the scene.
     * @param {Phaser.Scene} scene the scene that contains the text
     * @param {String} text the text to be written on screen
     * @param {Object} parms additional parameters
     */
    constructor(scene, text, parms={}) {
        this.scene = scene;

        this.x = (parms.x !== undefined) ? parms.x : 0;
        this.y = (parms.y !== undefined) ? parms.y : 0;

        this.color = (parms.color) ? parms.color : '#FFFFFF';

        this.text_ele = this.scene.add.text(this.x, this.y, text, {fontFamily: "Consolas", fontSize: 20, color:this.color});

        if(parms.origin == 'centered'){
            this.text_ele.setOrigin(0.5, 0);
        }

        if(Array.isArray(parms.origin)){
            this.text_ele.setOrigin(parms.origin[0], parms.origin[1]);
        }
    }

    /**
     * Sets the displayed text.
     * @param {String} newText text to be displayed
     */
    settext(newText) {
        this.text_ele.setText(newText);
    }
}

/**
 * Extends HudText.
 * Sets the text to countdown timer.
 * Text gets colored red when timer is at 10 or less.
 */
class Timer extends Hudtext {
    constructor(scene, text, max_time, parms={}){
        super(scene, text, parms);

        this.max_time = max_time;
        this.time = this.max_time;
        this.frame_cnt = 0;

        this.endtime = parms.endtime ? parms.endtime : 0;

        this.colorchangetime = parms.colorchangetime ? parms.colorchangetime : 10;

        this.ended = false;
    }

    update(){
        if(this.time == this.endtime && this.frame_cnt == 60){
            this.ended = true;
        }

        if(this.time > this.endtime && this.frame_cnt == 60){
            this.time--;
        }

        if(this.frame_cnt >= 60){
            this.frame_cnt = 0;
        }
        this.frame_cnt++;

        
        if(this.time <= this.colorchangetime){
            this.text_ele.setColor('#FF0000');
        }
        
        
        this.settext(this.time);
    }
}

/**
 * Extends HudText.
 * Sets text to 'Highscore: ' + the highscore variable
 */
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
    /**
     * Creates FramedText object.
     * The FramedText object generates a symbol frame with given parameters
     * 
     * @param {Phaser.Scene} scene 
     * @param {String[]} text 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Object} parms 
     */
    constructor(scene, text, width, height, parms={}){
        this.scene = scene;

        let margin = parms.margin ? parms.margin : 0;

        //{ver:'║', hor: '═', corner:'╔╗╝╚'}
        this.text = fillframe(create_frame(width, height, parms), text, margin).join('\n');

        this.x = (parms.x !== undefined) ? parms.x : 0;
        this.y = (parms.y !== undefined) ? parms.y : 0;

        this.frame_color = (parms.frame_color !== undefined) ? parms.frame_color : '#FFFFFF';
        this.frame_base = (parms.frame_char !== undefined) ? parms.frame_char : '0';

        this.frame = this.scene.add.text(this.x, this.y, this.text, {fontFamily: "Consolas", fontSize: 20, color:this.frame_color});

        if(parms.origin !== undefined){
            this.frame.setOrigin(parms.origin[0], parms.origin[1]);
        }
    }
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
function create_frame(width, height, parms={}){
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
                
                // specific char for every corner
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

/**
 * Fills a frame with text.
 * @param {String[]} frame The Frame as a String Array
 * @param {String[]} text The Text to be filled in as a String array
 * @param {Number} [margin=0] the gap in spaces put before and behind all text lines
 * @returns {String[]} The frame filled with text as a string array
 */
function fillframe(frame, text, margin=0) {
    let filledFrame = new Array();

    for(let l = 0; l < frame.length; l++){
        if(l < text.length + 1 && l > 0){
            let line = '';
            let charindex = 0;
            
            // go through caracters
            for(let c = 0; c < frame[l].length; c++){
                // when all chars inserted 
                if(charindex >= text[l - 1].length){
                    line += frame[l][c];
                }
                // keep first char(s) / left border + margin
                else if(c < 1 + margin){
                    line += frame[l][c];
                }
                // keep last char(s) / right border + margin
                else if(c >= frame[l].length - (1 + margin)){
                    line += frame[l][c];
                }
                // fill middle part of the frame line with given text
                else {
                    line += text[l - 1][charindex];
                    charindex++;
                } 
            }
            filledFrame.push(line);
        }
        else {
            filledFrame.push(frame[l]);
        }

        //console.log(filledFrame);
    }

    return filledFrame;
}