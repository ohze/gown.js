var InputControl = require('./InputControl'),
    KeyboardManager = require('../interaction/KeyboardManager');
/**
 * The basic Text Input - based on PIXI.Input.
 * Input by Sebastian Nette, see https://github.com/SebastianNette/PIXI.Input
 *
 * @class TextInput
 * @extends GOWN.InputControl
 * @memberof GOWN
 * @constructor
 * @param [theme] theme for the text input {GOWN.Theme}
 * @param [skinName=TextInput.SKIN_NAME] name of the text input skin {String}
 */
function TextInput(isWeb, theme, skinName, options) {
    /**
     * The valid text input states
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
     * @default TextInput.SKIN_NAME
     */
    this._skinName = skinName || TextInput.SKIN_NAME;
    InputControl.call(this, isWeb, theme, options);
    this._displayAsPassword = false;
}

TextInput.prototype = Object.create(InputControl.prototype);
TextInput.prototype.constructor = TextInput;
module.exports = TextInput;

/**
 * Default text area skin name
 *
 * @static
 * @final
 * @type String
 */
TextInput.SKIN_NAME = 'text_input';

/**
 * Set display as password (show text with "*")
 *
 * @name GOWN.TextInput#displayAsPassword
 * @type bool
 */
Object.defineProperty(TextInput.prototype, 'displayAsPassword', {
    get: function () {
        return this._displayAsPassword;
    },
    set: function (displayAsPassword) {
        this._displayAsPassword = displayAsPassword;
        if (displayAsPassword) InputControl.prototype.inputType = "password";
        this.setPixiText(this._origText);
    }
});

/*
 * set display as password
 */
Object.defineProperty(TextInput.prototype, 'placeHolder', {
    set: function (value) {
        this._placeHolder = value;
        this.setPixiText(this._origText);
    }
});

/*
 * set display as password
 */
Object.defineProperty(TextInput.prototype, 'placeHolderStyle', {
    set: function (value) {
        this._placeHolderStyle = value;
        this.setPixiText(this._origText);
    }
});

/**
 * Get the text lines as an array
 *
 * @returns {Array|*} Returns an array with one text line per array element
 */
TextInput.prototype.getLines = function() {
    return [this.text];
};

TextInput.prototype.inputControlSetPixiText = InputControl.prototype.setPixiText;

TextInput.prototype.setPixiText = function(text) {
    if (this._displayAsPassword) {
        text = text.replace(/./gi, '*');
    }
    this.inputControlSetPixiText(text);
};

/**
 * Update the selection
 *
 * @private
 */
TextInput.prototype.updateSelectionBg = function() {
    if (!this.hasFocus) {
        return;
    }
    var selection = KeyboardManager.wrapper.selection;
    var start = selection[0],
        end = selection[1];

    this.selectionBg.clear();
    if (start !== end) {
        start = this.textWidth(this.text.substring(0, start));
        end = this.textWidth(this.text.substring(0, end));
        this.selectionBg.beginFill(0x0080ff);
        this.selectionBg.drawRect(start, 0, end - start, this.pixiText.height);
        this.selectionBg.x = this.pixiText.x;
        this.selectionBg.y = this.pixiText.y;
    }
};

/**
 * initiate all skins first
 * (to prevent flickering)
 *
 * @method preloadSkins
 */
TextInput.prototype.preloadSkins = function() {
    if (!this._validStates) {
        return;
    }
    for (var i = 0; i < this._validStates.length; i++) {
        var name = this._validStates[i];
        this.fromSkin(name, this.skinLoaded.bind(this));
    }
};

/**
 * skin has been loaded (see preloadSkins) and stored into the skinCache.
 * add to container, hide and resize
 *
 * @method skinLoaded
 */
TextInput.prototype.skinLoaded = function(skin) {
    this.addChildAt(skin, 0);
    skin.alpha = 0.0;
    if (this.width) {
        skin.width = this.width;
    } else if (skin.minWidth) {
        this.width = skin.width = skin.minWidth;
    } else { // trường hợp button không set width thì mặc định width = skin.width.
        this.width = skin.width;
    }
    if (this.height) {
        skin.height = this.height;
    } else if (skin.minHeight) {
        this.height = skin.height = skin.minHeight;
    } else { // trường hợp button không set width thì mặc định height = skin.height.
        this.height = skin.height;
    }
};

// TODO: autoSizeIfNeeded
