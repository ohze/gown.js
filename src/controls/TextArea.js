var InputControl = require('./InputControl'),
    KeyboardManager = require('../interaction/KeyboardManager');
/**
 * A text entry control that allows users to enter and edit multiple lines of
 * uniformly-formatted text with the ability to scroll.
 *
 * @class TextInput
 * @extends GOWN.InputControl
 * @memberof GOWN
 * @constructor
 * @param [theme] theme for the text area {GOWN.Theme}
 * @param [skinName=TextArea.SKIN_NAME] name of the text area skin {String}
 */

function TextArea(isWeb, theme, skinName) {
    /**
     * The valid text area states
     *
     * @private
     * @type String[]
     * @default InputControl.stateNames
     */
    this._validStates = this._validStates || InputControl.stateNames;
    // show and load background image as skin (exploiting skin states)
    /**
     * The skin name
     *
     * @type String
     * @default TextArea.SKIN_NAME
     */
    this._skinName = skinName || TextArea.SKIN_NAME;
    InputControl.call(this, isWeb, theme, {type: 'input', mode: "textarea"});

    // this._fromPos = this.textOffset.clone();
    // this._toPos = this.textOffset.clone();
    // this._fromText = this.textOffset.clone();
    // this._toText = this.textOffset.clone();
    /**
     * @private
     * @type PIXI.Point
     */
    this._fromPos = new PIXI.Point(0, 0);

    /**
     * @private
     * @type PIXI.Point
     */
    this._toPos = new PIXI.Point(0, 0);

    /**
     * @private
     * @type PIXI.Point
     */
    this._fromText = new PIXI.Point(0, 0);

    /**
     * @private
     * @type PIXI.Point
     */
    this._toText = new PIXI.Point(0, 0);
}

TextArea.prototype = Object.create(InputControl.prototype);
TextArea.prototype.constructor = TextArea;
module.exports = TextArea;

/**
 * Default text area skin name
 *
 * @static
 * @final
 * @type String
 */
TextArea.SKIN_NAME = 'text_area';

/**
 * Update the selection
 *
 * @private
 */
TextArea.prototype.updateSelectionBg = function() {
    if (!this.hasFocus) {
        return;
    }
    var selection = KeyboardManager.wrapper.selection;
    var start = selection[0],
        end = selection[1];
    this.selectionBg.clear();
    if (start === end) {
        return;
    }
    if (start < end) {
        this._drawSelectionBg(start, end);
    } else if (start > end) {
        this._drawSelectionBg(end, start);
    }
};

/**
 * Calculate position in Text
 */

/**
 * Calculate position in Text
 *
 * @param textPos Position in the text {Number}
 * @param [position] Position object that gets returned {PIXI.Point}
 * @returns {PIXI.Point} returns the Line and Position in line
 */
TextArea.prototype.textToLinePos = function(textPos, position) {
    var lines = this.getLines();
    var x = 0;
    for (var y = 0; y < lines.length; y++) {
        var lineLength = lines[y].length;
        if (lineLength < textPos) {
            textPos -= lineLength + 1;
        } else {
            x = textPos;
            break;
        }
    }

    if (!position) {
        position = new PIXI.Point(x, y);
    } else {
        position.x = x;
        position.y = y;
    }
    return position;
};

/**
 * New selection over multiple lines
 *
 * @param fromTextPos Start position {Number}
 * @param toTextPos End position {Number}
 * @private
 */
TextArea.prototype._drawSelectionBg = function (fromTextPos, toTextPos) {
    this.textToPixelPos(fromTextPos, this._fromPos);
    this.textToPixelPos(toTextPos, this._toPos);

    this.selectionBg.beginFill(0x0080ff);
    if (this._toPos.y === this._fromPos.y) {
        this.selectionBg.drawRect(
            this._fromPos.x,
            this._fromPos.y,
            this._toPos.x - this._fromPos.x,
            this.lineHeight());
        return;
    }

    this.textToLinePos(fromTextPos, this._fromText);
    this.textToLinePos(toTextPos, this._toText);
    var lines = this.getLines();
    // draw till the end of the line
    var startPos = this._fromText.x;
    for (var i = this._fromText.y; i < this._toText.y; i++) {
        var text = lines[i];
        this.selectionBg.drawRect(
            startPos > 0 ? this._fromPos.x : 0,
            i * this.lineHeight(),
            this.textWidth(text.substring(startPos, text.length)),
            this.lineHeight());
        startPos = 0;
    }
    this.selectionBg.drawRect(0,
        this._toPos.y,
        this._toPos.x,
        this.lineHeight());
};

/**
 * Get the text lines as an array
 *
 * @returns {Array|*} Returns an array with one text line per array element
 */
TextArea.prototype.getLines = function() {
    var wrappedText = this.pixiText.wordWrap(this.text);
    return wrappedText.split(/(?:\r\n|\r|\n)/);
};
