/**
 * wrapper for text inputs
 * (keyboard on mobile or DOM input field in browser)
 *
 * Based on PIXI.Input InputObject by Sebastian Nette,
 * see https://github.com/SebastianNette/PIXI.Input
 *
 * @class InputWrapper
 * @memberof GOWN
 * @static
 */

function InputWrapper(manager, name) {
    this.manager = manager;
    this.name = name;
}
module.exports = InputWrapper;

/**
 * Focus the text input
 *
 * @function GOWN.InputWrapper.focus
 */
InputWrapper.prototype.focus = function(tagName) {
    // TODO: needed?
};

/**
 * Blur the text input
 *
 * @function GOWN.InputWrapper.blur
 */
InputWrapper.prototype.blur = function() {
    // TODO: needed?
};

InputWrapper.prototype.destroy = function() {
    // remove DOM or events
    this.removeEventListener();
};

/**
 * Grabs the data from the keystroke
 * @private
 */
InputWrapper.prototype.getKeyData = function (event) {
    return {
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        key: event.key,
        originalEvent: event
    };
};
