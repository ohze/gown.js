var Skinable = require('./Skinable'),
    InputController = require('../interaction/InputController');

function InputBase(isWeb, theme, settings) {
    settings = settings || {};
    this.stage = null;
    this.isWeb = isWeb;
    this._useTab = (settings.useTab || true);
    this._hasFocus = settings.hasFocus || false;
    this._tabIndex = settings.tabIndex || -1;
    this._tabGroup = settings._tabGroup || null;
    this._enterFunction = null;

    Skinable.call(this, theme);

    this.on("pointerup", this.onPointerUp, this);

}


InputBase.prototype = Object.create( Skinable.prototype );
InputBase.prototype.constructor = InputBase;
module.exports = InputBase;

InputBase.FocusIn = 'focusIn';

InputBase.FocusOut = 'focusOut';

/**
 * @property focusGroup
 * @type FocusGroup
 */
Object.defineProperty(InputBase.prototype, 'focusGroup', {
    get: function() {
        return this._tabGroup;
    },
    set: function(focusGroup) {
        this._tabGroup = focusGroup;
    }
});

Object.defineProperty(InputBase.prototype, 'enterFunction', {
    get: function() {
        return this._enterFunction;
    },
    set: function(enterFunction) {
        this._enterFunction = enterFunction;
    }
});

InputBase.prototype.stageMouseDown = function(e) {
    if(this._hasFocus) {
        console.log("stageMouseDown blur");
        this.blur();
    }
};


InputBase.prototype.onPointerUp = function(e) {
    console.log('onPointerUp');
    this.focus();
    if (e) e.data.originalEvent.preventDefault();
};

InputBase.prototype.onMove = function(e) {
};

InputBase.prototype.focus = function () {
    console.log('call focus1');
    if (!this._hasFocus) {
        this._hasFocus = true;
        var that = this;
        setTimeout(function () {
            that._bindEvents();
        }, 0);
        InputController.set(this);
        this.emit(InputBase.FocusIn);
        console.log('call focus');
    }
};

InputBase.prototype.blur = function () {
    if (this._hasFocus) {
        console.log('call blur');
        InputController.clear();
        this._hasFocus = false;
        this._clearEvents();
        this.emit(InputBase.FocusOut);
    }
};

/**
 * determine if the input has the focus
 *
 * @property hasFocus
 * @type Boolean
 */
Object.defineProperty(InputBase.prototype, 'hasFocus', {
    get: function() {
        return this._hasFocus;
    },
    set: function(focus) {
        this._hasFocus = focus;
    }
});

InputBase.prototype._rootStage = function () {
    var stage = this.stage || this;
    while(stage && (stage.stage || stage.parent)){
        if (stage.stage){
            stage = stage.stage;
        }else{
            stage = stage.parent;
        }
        if (stage && !stage.visible) return null;
    }
    return stage;
};

InputBase.prototype._bindEvents = function () {
    if (!this.stage) {
        this.stage = this._rootStage();
    }
    if (this.stage !== null) {
        this.stage.interactive = true;
        if(!this.isWeb) this.stage.on("pointerup", this.stageMouseDown, this);
    }
};

InputBase.prototype._clearEvents = function () {
    if (this.stage !== null) {
        if(!this.isWeb) this.stage.off("pointerup", this.stageMouseDown, this);
    }
};

InputBase.prototype.keyboardShowHandler = function(e){
    console.log('call _bindEvents1', this, e, this._hasFocus);
    if (this._hasFocus){
        console.log('call _bindEvents', this);
        this._bindEvents();
    }
};

