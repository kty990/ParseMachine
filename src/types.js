"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraper = exports.Element = exports.html5Elements = exports.Stack = exports.displayDictionary = exports.tabTimes = exports.document = exports.window = void 0;
var jsdom_1 = require("jsdom");
var util = require("util");
exports.window = new jsdom_1.JSDOM('<!doctype html><html><body></body></html>').window;
exports.document = exports.window._document;
function tabTimes(n) {
    var tmp = "";
    for (var i = 0; i < n; i++) {
        tmp += "\t";
    }
    return tmp;
}
exports.tabTimes = tabTimes;
var _Node = /** @class */ (function () {
    function _Node(data, prev, nxt) {
        this.data = data;
        this.prev = prev;
        this.nxt = nxt;
    }
    return _Node;
}());
var OutOfBoundsException = /** @class */ (function (_super) {
    __extends(OutOfBoundsException, _super);
    function OutOfBoundsException(msg) {
        if (msg === void 0) { msg = "An out of bounds error occurred."; }
        var _this = _super.call(this, "".concat(msg, " ~ ID: ").concat(OutOfBoundsException.id)) || this;
        OutOfBoundsException.id++;
        return _this;
    }
    OutOfBoundsException.id = 1;
    return OutOfBoundsException;
}(Error));
var MismatchError = /** @class */ (function (_super) {
    __extends(MismatchError, _super);
    function MismatchError() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var msg = "Mismatched tags. Expected tags of same type, got ";
        for (var x = 0; x < values.length; x++) {
            msg += "".concat(values[x]);
            if (x < values.length - 1) {
                msg += ", ";
            }
        }
        return _super.call(this, msg) || this;
    }
    return MismatchError;
}(Error));
function displayDictionary(dict) {
    var tmp = "";
    for (var _i = 0, _a = Object.entries(dict); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        tmp += "".concat(key, "=").concat(value, " ");
    }
    return tmp;
}
exports.displayDictionary = displayDictionary;
var Stack = /** @class */ (function () {
    function Stack() {
        this.root = new _Node(null, null, null);
        this.size = 0;
    }
    Stack.prototype.add = function (value) {
        var tmp = new _Node(value, null, this.root);
        this.root.prev = tmp;
        this.root = tmp;
        this.size++;
    };
    Stack.prototype.pop = function () {
        console.log(this.root);
        // Add check for out of bounds
        if (this.size > 0) {
            this.size--;
        }
        else {
            throw new OutOfBoundsException();
        }
        var tmp = this.root;
        try {
            this.root.nxt.prev = null;
            this.root = this.root.nxt;
        }
        catch (e) {
            this.root = new _Node(null, null, null);
        }
        return tmp;
    };
    return Stack;
}());
exports.Stack = Stack;
exports.html5Elements = [
    "!DOCTYPE html",
    "html",
    "head",
    "meta",
    "title",
    "link",
    "style",
    "script",
    "base",
    "noscript",
    "body",
    "header",
    "nav",
    "main",
    "article",
    "section",
    "aside",
    "footer",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p",
    "ul", "ol", "li",
    "dl", "dt", "dd",
    "pre",
    "blockquote",
    "figure", "figcaption",
    "div",
    "a",
    "em",
    "strong",
    "small",
    "s",
    "cite",
    "q",
    "abbr",
    "time",
    "code",
    "var",
    "kbd",
    "samp",
    "sub",
    "sup",
    "mark",
    "span",
    "br",
    "wbr",
    "hr",
    "a",
    "img",
    "map",
    "area",
    "table",
    "caption",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
    "video",
    "source",
    "track",
    "audio",
    "source",
    "track",
    "iframe",
    "object",
    "embed",
    "canvas",
    "svg",
    "math",
    "form",
    "input",
    "button",
    "select",
    "optgroup",
    "option",
    "textarea",
    "label",
    "fieldset",
    "legend",
    "datalist",
    "output",
    "details",
    "summary",
    "menu",
    "menuitem",
    "menuitem",
    "script",
    "noscript",
    "template",
    "slot",
    "template"
];
var Element = /** @class */ (function () {
    function Element(name, id, classes, text, attrs, depth, children) {
        if (depth === void 0) { depth = 1; }
        this.attributes = {};
        try {
            this.name = name;
            this.id = id;
            this.classes = classes;
            this.text = text;
            this.depth = depth;
            for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
                var attr = attrs_1[_i];
                var tmp = attr.split("=");
                if (tmp.length == 1)
                    continue;
                console.log(tmp);
                this.attributes[tmp[0]] = tmp[1];
            }
            this.children = children;
        }
        catch (e) {
            console.error(e);
        }
    }
    Element.requiresClosingTag = function (tagName) {
        // Updated list of HTML5 void (self-closing) tags
        var voidTags = [
            "area", "base", "br", "col", "embed", "hr", "img", "input",
            "link", "meta", "source", "track", "wbr"
        ];
        // Remove any leading '!' character and split by space to handle cases like "meta charset"
        var tag = tagName.replace("!", "").split(" ")[0].toLowerCase();
        // Check if the tag is in the list of void tags
        return voidTags.indexOf(tag) == -1;
    };
    Element.prototype[util.inspect.custom] = function () {
        // return {
        //     toString() {
        //     }
        // };
        var result = "<".concat(this.name, " ").concat((this.id.length > 0) ? this.id + " " : '').concat((this.classes.length > 0) ? this.classes.join(" ") + " " : '').concat((Array.from(Object.values(this.attributes)).length > 0) ? displayDictionary(this.attributes) + " " : '', ">");
        if (Element.requiresClosingTag(this.name)) {
            result += "\n";
            var cString = this.children.map(function (c) { return c.toString(); }).join("\n");
            result += cString;
            result += "\n".concat(tabTimes(this.depth - 1), "</").concat(this.name, ">");
        }
        return result;
    };
    Element.prototype.toString = function () {
        var result = "<".concat(this.name, " ").concat((this.id.length > 0) ? this.id + " " : '').concat((this.classes.length > 0) ? this.classes.join(" ") + " " : '').concat((Array.from(Object.values(this.attributes)).length > 0) ? displayDictionary(this.attributes) + " " : '', ">");
        if (Element.requiresClosingTag(this.name)) {
            result += "\n";
            var cString = this.children.map(function (c) { return c.toString(); }).join("\n");
            result += cString;
            result += "\n".concat(tabTimes(this.depth - 1), "</").concat(this.name, ">");
        }
        return result;
    };
    return Element;
}());
exports.Element = Element;
var Scraper = /** @class */ (function () {
    function Scraper() {
    }
    Scraper.run = function (HTMLBody) {
        console.log(HTMLBody);
        var separator = /[<>]/;
        var splitString = HTMLBody.split(separator);
        console.log(splitString);
        var r = { MAX_DEPTH: 0, tree: [] };
        var depth = 0;
        var tmpTagStack = new Stack();
        var debug = '';
        try {
            for (var _i = 0, splitString_1 = splitString; _i < splitString_1.length; _i++) {
                var x = splitString_1[_i];
                var a = x.trim();
                debug = a;
                if (a.replace("\\n", "").replace("\n", "").length == 0 || a.indexOf("!--") != -1)
                    continue;
                console.log(tmpTagStack);
                console.log("a: ".concat(a));
                if (exports.html5Elements.indexOf(a.split(" ")[0]) != -1 || a == '!DOCTYPE html') {
                    // Opening or solo tag
                    depth++;
                    if (Element.requiresClosingTag(a.split(" ")[0]) && a != '!DOCTYPE html') {
                        // Opening tag
                        console.log("OPEN");
                        var tmp = a.split(" ");
                        var id = "", classes = [], text = "", attrs = [], children = [];
                        for (var _a = 0, tmp_1 = tmp; _a < tmp_1.length; _a++) {
                            var attr = tmp_1[_a];
                            var v = attr.split('=');
                            switch (v[0]) {
                                case 'id':
                                    id = v[1];
                                    break;
                                case 'class':
                                    classes = v[1].split(" ");
                                    break;
                                default:
                                    attrs.push(attr);
                                    break;
                            }
                        }
                        tmpTagStack.add({ name: tmp[0], id: id, classes: classes, text: text, attrs: attrs, children: children });
                    }
                    else {
                        // Solo tag
                        console.log("SOLO");
                        depth--;
                        var id = "", classes = [], text = "", attrs = [], children = [];
                        if (tmpTagStack.size != 0) {
                            var tmp = a.split(" ");
                            for (var _b = 0, tmp_2 = tmp; _b < tmp_2.length; _b++) {
                                var attr = tmp_2[_b];
                                var v = attr.split('=');
                                switch (v[0]) {
                                    case 'id':
                                        id = v[1];
                                    case 'class':
                                        classes = v[1].split(" ");
                                    default:
                                        attrs.push(attr);
                                }
                            }
                            tmpTagStack.root.data.children.push(new Element(a, id, classes, text, attrs, depth, children));
                        }
                    }
                }
                else if (exports.html5Elements.indexOf(a.replace("/", "")) != -1) {
                    // Closing tag
                    console.log("CLOSE");
                    var tmp = tmpTagStack.pop();
                    if (tmp.data.name.replace("/", "") != a.replace("/", "")) {
                        throw new MismatchError(tmp.data.name, a);
                    }
                    if (tmpTagStack.size != 0) {
                        tmpTagStack.root.data.children.push(new Element(tmp.data.name, tmp.data.id, tmp.data.classes, tmp.data.text, tmp.data.attrs, depth, tmp.data.children));
                    }
                    else {
                        r.tree.push(new Element(tmp.data.name, tmp.data.id, tmp.data.classes, tmp.data.text, tmp.data.attrs, depth, tmp.data.children));
                    }
                    depth--;
                }
                else {
                    tmpTagStack.root.data.text = a;
                }
                if (depth > r.MAX_DEPTH) {
                    r.MAX_DEPTH = depth;
                }
            }
            console.log(r);
        }
        catch (e) {
            console.error(e);
            console.log(r);
            console.log("Debug: ".concat(debug));
        }
        return r;
    };
    return Scraper;
}());
exports.Scraper = Scraper;
