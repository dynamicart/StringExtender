/*
 * $Id: string-extender.js,v 0.5 2014/12/04 12:25:01 Janos Szentgyorgyi $
 *
 *  Licensed under the Apache License.
 *    http://www.apache.org/licenses/
 *
 */
var StringExtender = {
    _debug: true,
    _original: '',
    _extended: '',
    _cmdTable: {
        // Str reverse
        m0: function(s, that){
            that.log('str reverse');
            return s.split("").reverse().join("");
        },
        // SecondFlip
        m1: function(s, that){
            // 01 23 45 67 8
            // ga lá da lm a > ag ál ag ml a
            that.log('second flip');
            var flipCount = parseInt(s.length/2);
            var flippedText = '';
            for(var i = 0; i < flipCount; i++){
                flippedText += s[(i*2)+1];
                flippedText += s[(i*2)];
            }
            if ((s.length/2%2)>0){
                flippedText += s.slice(-1);
            }
            return flippedText;
        },
        // Base64 Encoding
        m2: function(s, that){
            that.log('base64 encode');
            return Base64.encode(s);
        }
    },
    _commands: {},
    buildCommands: function(){
        for(var i = 0; i < this._original.length; i++){
            var cmd = this._original.charCodeAt(i).toString().slice(-1);
            this._commands[Object.keys(this._commands).length] = 'm'+cmd;
        }
        this.log(Object.keys(this._commands).length+" possible step left");
    },
    extend: function(original){
        this._original = Base64.encode(original);
        this._commands = {};
        this.log("original text: "+original);
        var extendedText = this._original;

        this.buildCommands();

        var steps = 0;
        for(var i = 0; i < Object.keys(this._commands).length; i++){
            if (this._commands[i] === undefined){continue;}
            var fn = this._cmdTable[this._commands[i]];
            if (typeof(fn) === 'function'){
                extendedText = fn(extendedText, this);
                this.log(extendedText);
                steps++;
            }
        }

        this.log(steps+" step done");

        this._extended = extendedText;
        return extendedText;
    },
    log: function(msg){
        if (this._debug){console.log(msg);}
    }
};