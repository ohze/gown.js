export = GOWN;

declare module GOWN {
    import Container = PIXI.Container
    import Graphics = PIXI.Graphics
    import Sprite = PIXI.Sprite
    import DisplayObject = PIXI.DisplayObject
    import Point = PIXI.Point
    import Text = PIXI.Text
    import TextStyle = PIXI.TextStyle
    import TextureDictionary = PIXI.loaders.TextureDictionary
    import TextStyleOptions = PIXI.TextStyleOptions
    import Texture = PIXI.Texture
    export var loader: PIXI.loaders.Loader;

    export class KeyboardManager extends EventEmitter {
        constructor(renderer, options);

    }

    export namespace utils {

        export class InputWrapper {

            constructor(manager, name);

            focus(): void;

            blur(): void;

            destroy(): void;

            getKeyData(): Object;
        }

        export class DOMInputWrapper extends InputWrapper {
            static platform: string;

            constructor(manager);
        }

        export class SliderData {
            value: number;
            target: PIXI.Sprite;
        }
    }


    export class Control extends Container {
        redraw(): void;

        setTheme(theme: Theme);

        enabled: boolean;
        protected _enabled:boolean;
        visible:boolean;
    }

    export class Skinable extends Control {
        constructor(theme)

        controlSetTheme: void;
        skinCache: Object;

        theme: Theme;

        getSkin(comp, state): any;

        setTheme(theme: Theme): void

        changeSkin(skin: DisplayObject): void

        preloadSkins(): void

        fromSkin(name, callback): void

        skinName: string;
        invalidState: boolean;
    }

    export class ScaleContainer extends Container {
        constructor(texture, rect);

        width: number;
        height: number;

        redraw(): void;
    }


    export class CheckBox extends Skinable {
        constructor(preselected, theme, skinName?);

        static SKIN_NAME: string;
        static UP: string;
        static DOWN: string;
        static HOVER: string;
        static DISABLE: string;
        static SELECTED_UP: string;
        static SELECTED_DOWN: string;
        static SELECTED_HOVER: string;
        static SELECTED_DISABLE: string;
        static OUT: string;

        mousedown(): void;

        mouseup(): void;

        mousemove(): void;

        mouseover(): void;

        mouseout(): void;

        currentState: string;

        selected: boolean;

        toggleSelected(): void;

        handleEvent(type): void;
    }

    export class Check extends ToggleButton {
        constructor(theme, skinName?);

        static SKIN_NAME: string;
    }

    export class Radio extends ToggleButton {
        constructor(theme, skinName?);

        _selected: boolean;

        toggleGroup: any;
    }

    export class InputBase extends Skinable {
        constructor(isWeb, theme, settings);
        stage: Container;

        enterFunction: Function;

        static FocusIn: string;
        static FocusOut: string;
    }

    export class InputController {
        static remove(tabGroup: string);

        static register(item: DisplayObject, tabIndex: number, tabGroup: string);

        static fireTab();
    }

    export class InputControl extends InputBase {
        constructor(isWeb, theme, settings);

        static currentInput: InputControl;

        wrapper;

        static UP: string;
        static DOWN: string;
        static HOVER: string;

        placeHolder: string;

        placeHolderStyle: TextStyle;

        pattern: string;
        cursorPos: number;

        inputType: string;

        style: TextStyle;
        colorCursor:number;

        text: string;
        cursorPos: number;

        maxChars: number;
        _origText: string;

        get value(): string;

        textWidth(text: string): number;

        onMouseUpOutside(): void;

        focus(): void;

        blur(): void;

        lineHeight(): number;

        initCursor(): void;
        drawCursor(): void;
        setCursorPos(): void;

        hasFocus: boolean;

        static stateNames: Array<string>;

        onKeyUp(e: any): void;

        onKeyDown(e: any): void;

        selectionBg: PIXI.Graphics;

        pixiText: PIXI.Text;

        textOffset: PIXI.Point;

        restrict: string;

        offsetKeyBoard: number;
        viewOffset: Object;

        refreshMask();

        adjustScrollY(screenHeight: number, keyboardHeight: number): number;

    }

    export class LayoutGroup extends Control {
        constructor(layout?: Layout, maxWidth?: number, maxHeight?: number);

        layout: Layout;
        // gap: number;
    }

    export class HorizontalLayout extends LayoutAlignment {
        constructor();
    }

    export class LayoutAlignment extends Layout {
        constructor();

        static VERTICAL_ALIGNMENT: string;
        static HORIZONTAL_ALIGNMENT: string;

        applyPercent(items, explicit): void;

        _currentGap(i, items): any;

        alignment: string;
        paddingLeft: number;
        paddingTop: number;

        layout(items: any[], maxWidth: number, maxHeight?: number): number[];

        applyFixedPercent(items, explicit, alignment): void;

    }

    export class VerticalLayout extends LayoutAlignment {
        constructor();
    }

    export class TiledLayout extends Layout {
    }

    export class TiledColumnsLayout extends TiledLayout {
    }

    export class TiledRowsLayout extends TiledLayout {
    }

    export class Scrollable extends Skinable {

        constructor(theme);

        static HORIZONTAL: string;
        static VERTICAL: string;

        invalidTrack: boolean;
        thumbFactory;
        value;
        thumb: ScrollThumb;
        scrollingFuc: Function;
    }

    export class ScrollArea extends Control {
        constructor(content?, addListener?, scrolldelta?, bar?)

        redraw();

        mask: Graphics;

        _useMask: boolean;

        scrolldirection: string;
    }

    export class ScrollBar extends Scrollable {
        constructor(direction, theme);

        static SKIN_NAME: string;

        thumbMoved(x: number, y: number);

        moveThumb(x: number, y: number);

        redraw();

        maxHeight(): number;

        container: ScrollContainer;

        //scrollArea;

        orientation;
        direction: string;

        scrollableredraw(any);

        timelineHeight(duration: number, delay: number);

        forceRedraw:boolean;
    }

    export class ScrollThumb extends Button {
        constructor(scrollable, theme, skinName);

        scrollingFuc: Function;
    }

    export class Slider extends Scrollable {
        constructor(theme);

        static SKIN_NAME: string;

        thumbMoved(): void;

        pixelToValue(): number;

        valueToPixel(): number;

        change: Function;
        enabled: boolean;
        value: number;
        minimum: number;
        maximum: number;
        step: number;
    }

    export class ToggleGroup implements EventEmitter {
        constructor();

        addListener(event: string, listener: Function): EventEmitter;

        on(event: string, listener: Function): EventEmitter;

        once(event: string, listener: Function): EventEmitter;

        removeListener(event: string, listener: Function): EventEmitter;

        removeAllListeners(event?: string): EventEmitter;

        setMaxListeners(n: number): void;

        listeners(event: string): Function[];

        emit(event: string, ...args: any[]): boolean;

        static CHANGE: string;

        addItem(item): void;

        _toggleChanged(item): void;

        removeItem(item): void;

        destroy(): void;

        selectedItem: any;
        selectedIndex: any;
        isSelectionRequired: any;

        _items: Array<Sprite>;

    }

    export class ToggleButton extends Button {
        constructor(theme, skinName?)

        static CHANGE: string;
        static SKIN_NAME: string;

        // originalCurrentState: any;
        currentState: string;
        selected: boolean;

        setSelected(selected, emit?: boolean): void;

        toggle(): void;

        handleEvent(): void;

        skinFallback: any;
    }

    export class Layout {
        static VERTICAL_ALIGN_TOP: string;
        static VERTICAL_ALIGN_MIDDLE: string;
        static ALIGN_JUSTIFY: string;
        static VERTICAL_ALIGN_BOTTOM: string;
        static HORIZONTAL_ALIGN_LEFT: string;
        static HORIZONTAL_ALIGN_CENTER: string;
        static HORIZONTAL_ALIGN_RIGHT: string;

        gap: number;
        needUpdate: any;
        padding: number;
        paddingTop: number;
        paddingBottom: number;
        paddingLeft: number;
        paddingRight: number;

        layout(items, viewPortBounds: ViewPortBounds): void;

    }

    export class ViewPortBounds {
    }

    export class Shape extends Graphics {
        constructor(color, alpha, width, height);
    }

    export class Diamond extends Shape {
        constructor(color, alpha, width, height);
    }

    export class Line extends Shape {
        constructor(color, alpha, width, height, lineWidth, reverse);
    }

    export class Rect extends Shape {
        constructor(color, alpha, width, height, radius?);
    }

    // https://github.com/primus/eventemitter3
    export class EventEmitter {

        listeners(event: string): Function[];

        emit(event: string, ...args: any[]): boolean;

        on(event: string, fn: Function, context?: any): EventEmitter;

        once(event: string, fn: Function, context?: any): EventEmitter;

        removeListener(event: string, fn: Function, context?: any, once?: boolean): EventEmitter;

        removeAllListeners(event: string): EventEmitter;

        eventNames(): string[];

        off(event: string, fn: Function, context?: any, once?: boolean): EventEmitter;

        addListener(event: string, fn: Function, context?: any): EventEmitter;

    }


    export class Theme extends EventEmitter {
        constructor(global?);

        static inputTextStyle: ThemeFont;

        static textStyle: ThemeFont;

        setSkin(comp, id, skin): void;

        addImage(jsonPath: Array<string>): void;

        getImage(name: string): Function;

        getSpriteImage(name: string): Sprite;

        // loadComplete(loader, resources): void;

        getScaleContainer(name, grid): Function;

        getSkin(comp, state): Sprite;

        static removeTheme(): void;

        getTextureCache(name: string): Texture;

        scaleContainer: ScaleContainer;

        hoverSkin: boolean;

        thumbSkin: boolean;

        static LOADED: string = 'loaded';

        static COMPLETE: string = 'complete';

        setCache(resources):void;

        loadComplete(loader, resources);

        _jsonPath;
    }

    export class ThemeFont {
        constructor(data);

        clone(): ThemeFont;

        align?: string;
        breakWords?: boolean;
        dropShadow?: boolean;
        dropShadowAngle?: number;
        dropShadowBlur?: number;
        dropShadowColor?: string | number;
        dropShadowDistance?: number;
        fill?: string | string[] | number | number[] | CanvasGradient | CanvasPattern;
        fillGradientType?: number;
        fontFamily?: string;
        fontSize?: number | string;
        fontStyle?: string;
        fontVariant?: string;
        fontWeight?: string;
        letterSpacing?: number;
        lineHeight?: number;
        lineJoin?: string;
        miterLimit?: number;
        padding?: number;
        stroke?: string | number;
        strokeThickness?: number;
        textBaseline?: string;
        wordWrap?: boolean;
        wordWrapWidth?: number;
    }

    export class SDTheme extends Theme {
        constructor(jsonPath: any, onComplete?: Function, global?: any);

        static BUTTON_SCALE_9_GRID: PIXI.Rectangle;
        static SELECTED_BUTTON_SCALE_9_GRID: PIXI.Rectangle;
        static HORIZONTAL_SCROLL_BAR_THUMB_SCALE_9_GRID: PIXI.Rectangle;
        static HORIZONTAL_SCROLL_BAR_TRACK_SCALE_9_GRID: PIXI.Rectangle;
        static HORIZONTAL_SCROLL_BAR_STEP_BUTTON_SCALE_9_GRID: PIXI.Rectangle;
        static TEXT_INPUT_SCALE_9_GRID: PIXI.Rectangle;
        static VERTICAL_SCROLL_BAR_THUMB_SCALE_9_GRID: PIXI.Rectangle;
        static VERTICAL_SCROLL_BAR_TRACK_SCALE_9_GRID: PIXI.Rectangle;
        static VERTICAL_SCROLL_BAR_STEP_BUTTON_SCALE_9_GRID: PIXI.Rectangle;

        textureCache: TextureDictionary;
    }

    export class AeonTheme {
        constructor(jsonPath: any, onComplete?: Function, global?: any);
    }

    export class MetalWorksMobileTheme {
        constructor(jsonPath: any, onComplete?: Function, global?: any);
    }

    export class ShapeTheme {
        constructor(onComplete?: Function, global?: any);
    }


    /**
     * The basic Button with 3 states (up, down and hover) and a label that is
     * centered on it
     *
     * @class Button
     * @extends GOWN.Skinable
     * @memberof GOWN
     *
     * @param theme default them
     * @param skinName default SKIN_NAME
     *
     * @constructor
     */
    export class Button extends Skinable {
        constructor(theme, skinName?);

        onDown(): void;

        onUp(): void;

        onHover(): void;

        onOut(): void;

        static stateNames: string[];

        updateLabelDimensions();

        static SKIN_NAME: string;
        static readonly UP: "up";
        static readonly DOWN: "down";
        static readonly HOVER: "hover";
        static readonly DISABLE: "disable";
        textStyle: TextStyleOptions;

        protected _label;
        protected _enabled: boolean;
        protected worldWidth;
        protected worldHeight;
        private labelFont;
        private labelColor;
        protected updateLabel: boolean;

        label: string;
        labelText: PIXI.Text;
        enabled: boolean;

        handleEvent(type: string);

        _pressed: boolean;
        currentState: string;
        //_over: boolean;
        //prevState: string;
    }

    /**
     * The basic Text Input
     *
     * @class TextInput
     * @extends GOWN.InputControl
     * @memberof GOWN
     *
     * @param text editable text shown in input
     * @param displayAsPassword Display TextInput as Password (default false)
     * @param theme default theme
     * @param skinName default SKIN_NAME
     *
     * @constructor
     */
    export class TextInput extends InputControl {
        constructor(isWeb, theme, skinName?);

        static SKIN_NAME: string;

        displayAsPassword: boolean;
        cursorPos: number

        setPixiText(text: string): void;
        updateSelectionBg(): void;
    }

    export class TextArea extends InputControl {
        constructor(isWeb, theme, skinName?);

        static SKIN_NAME: string;

        updateSelectionBg(): void;

        textToLinePos(textPos, position): Point;

        _drawSelectionBg(fromTextPos, toTextPos): void;

        getLines(): string;

        width: number;
        style: TextStyleOptions;
    }

    interface DDL_Element {
        text: string;

        [key: string]: any;
    }

    export class DropDownList extends Skinable {
        constructor(theme: Theme);

        static SKIN_NAME: string;
        static HOVER_CONTAINER: string;
        static NORMAL: string;
        static CLICKED: string;
        static CHANGE: string;

        createLabel(): void;

        createDropDown(): void;

        handleEvent(type, option): void;

        mousedown(event): void;

        touchstart(event): void;

        toggleDropDown(): void;

        initiate(): void;

        getStage(element);

        cleanChilds(): void;

        selectDropDownElement(text): void;

        addEventListener(event, callback): void;

        handelSubscribedCallouts(eventName, text, element, index): void;

        _label;
        selectedItemText: Text;
        label: string;
        labelText;
        theme: Theme;
        elementList: DDL_Element[];
        updateLabel;
        updateDropDown;
        protected showDropDown: boolean;
        protected initiated: boolean;
    }

    export class ListCollection extends EventEmitter {
        constructor(data: Array<any>);
    }

    export class PickerList extends Control {
        constructor(theme: Theme);

        static SKIN_NAME: string;
        static STATE_CHANGE: string;
        static SELECT: string;

        dataProvider: ListCollection;
        itemRendererProperties: Object;

        itemRendererFactory: Function;

        _listFactory: Function;
        _buttonFactory: Function;

        closeList(): void;
    }

    export class List extends Control {
        constructor(theme: Theme);

        static CHANGE: string;
        dataProvider: ListCollection;
    }

    export class Scroller extends Control {
        constructor(theme: Theme);

        viewPort: LayoutGroup;
        scrollingFuc: Function;

        revealVerticalScrollBar(): void;

        horizontalScrollPolicy;
        verticalScrollBar;
        horizontalScrollBar;
        verticalScrollBarFactory;
        verticalScrollPolicy;
        verticalScrollStep;
        static SCROLL_POLICY_AUTO;
        static SCROLL_POLICY_ON;
        static SCROLL_POLICY_OFF;

        checkForDrag(currentTouch): void;
    }

    export class ScrollContainer extends Scroller {
        constructor(theme: Theme);

        sdScrollBar: ScrollBar;
        _verticalScrollBarFactory: Function;
        _horizontalScrollBarFactory: Function;
        isScrollToEnd: boolean;
        isEnding: boolean;

        defaultScrollBarFactory(direction: string): ScrollBar;

        updateScrollBar(): void;

        checkScrollisEnding(): boolean;

        scrollToEnd(): void;

        checkNewContent(): boolean;
        worldWidth: number
    }
}
