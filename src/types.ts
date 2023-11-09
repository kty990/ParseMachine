import { JSDOM } from 'jsdom';

export const { window } = new JSDOM('<!doctype html><html><body></body></html>');
export const document = window._document;

class _Node {
    data: any;
    prev: _Node | null;
    nxt: _Node | null;
    constructor(data: any, prev: _Node | null, nxt: _Node | null) {
        this.data = data;
        this.prev = prev;
        this.nxt = nxt;
    }
}

class OutOfBoundsException extends Error {
    static id: number = 1;
    constructor(msg: string = `An out of bounds error occurred.`) {
        super(`${msg} ~ ID: ${OutOfBoundsException.id}`);
        OutOfBoundsException.id++;
    }
}

class MismatchError extends Error {
    constructor(...values: Array<string>) {
        let msg = `Mismatched tags. Expected tags of same type, got `;
        for (let x = 0; x < values.length; x++) {
            msg += `${values[x]}`;
            if (x < values.length - 1) {
                msg += ", ";
            }
        }
        super(msg);
    }
}

export class Stack {
    root: _Node | null;
    size: number;

    constructor() {
        this.root = new _Node(null, null, null);
        this.size = 0;
    }

    add(value: any): void {
        let tmp = new _Node(value, null, this.root);
        this.root!.prev = tmp;
        this.root = tmp;
        this.size++;
    }

    pop(): _Node {
        console.log(this.root);
        // Add check for out of bounds
        if (this.size > 0) {
            this.size--;
        } else {
            throw new OutOfBoundsException();
        }
        let tmp = this.root;
        try {
            this.root!.nxt!.prev = null;
            this.root = this.root!.nxt;
        } catch (e) {
            this.root = new _Node(null, null, null);
        }
        return tmp!;
    }
}

export const html5Elements = [
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

export class Element {
    name: string;
    id: string;
    classes: Array<string>;
    text: string;
    attributes: {} = {};
    children: Array<Element>;

    constructor(name: string, id: string, classes: Array<string>, text: string, attrs: Array<any>, children: Array<Element>) {
        try {
            this.name = name;
            this.id = id;
            this.classes = classes;
            this.text = text;
            for (const attr of attrs) {
                let tmp = attr.split("=");
                console.log(tmp);
                this.attributes[tmp[0]] = tmp[1];
            }
            this.children = children;
        } catch (e) {
            console.error(e);
        }
    }

    static requiresClosingTag(tagName: string) {
        // Updated list of HTML5 void (self-closing) tags
        const voidTags = [
            "area", "base", "br", "col", "embed", "hr", "img", "input",
            "link", "meta", "source", "track", "wbr"
        ];

        // Remove any leading '!' character and split by space to handle cases like "meta charset"
        const tag = tagName.replace("!", "").split(" ")[0].toLowerCase();

        // Check if the tag is in the list of void tags
        return voidTags.indexOf(tag) == -1;
    }
}

interface result {
    MAX_DEPTH: number,
    tree: Array<Element>;
}

export class Scraper {
    constructor() { }

    static run(HTMLBody: string): result {
        console.log(HTMLBody);
        let separator = /[<>]/;
        let splitString = HTMLBody.split(separator);
        console.log(splitString);
        let r: result = { MAX_DEPTH: 0, tree: [] };
        let depth = 0;
        let tmpTagStack = new Stack();

        let debug = '';
        try {
            for (let x of splitString) {
                let a = x.trim();
                debug = a;
                if (a.replace("\\n", "").replace("\n", "").length == 0 || a.indexOf("!--") != -1) continue;
                console.log(tmpTagStack);
                console.log(`a: ${a}`);
                if (html5Elements.indexOf(a.split(" ")[0]) != -1 || a == '!DOCTYPE html') {

                    // Opening or solo tag
                    depth++;
                    if (Element.requiresClosingTag(a.split(" ")[0]) && a != '!DOCTYPE html') {
                        // Opening tag
                        console.log("OPEN");
                        let tmp = a.split(" ");
                        let id: string = "", classes: Array<string> = [], text: string = "", attrs: Array<any> = [], children = [];

                        for (let attr of tmp) {
                            let v = attr.split('=');
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

                        tmpTagStack.add({ name: tmp[0], id, classes, text, attrs, children });

                    } else {
                        // Solo tag
                        console.log("SOLO");
                        depth--;
                        let id: string = "", classes: Array<string> = [], text: string = "", attrs: Array<any> = [], children = [];
                        if (tmpTagStack.size != 0) {
                            let tmp = a.split(" ");
                            for (let attr of tmp) {
                                let v = attr.split('=');
                                switch (v[0]) {
                                    case 'id':
                                        id = v[1];
                                    case 'class':
                                        classes = v[1].split(" ");
                                    default:
                                        attrs.push(attr);
                                }
                            }
                            tmpTagStack.root!.data.children.push(new Element(a, id, classes, text, attrs, children));
                        }
                    }
                } else if (html5Elements.indexOf(a.replace("/", "")) != -1) {
                    // Closing tag
                    console.log("CLOSE");
                    let tmp = tmpTagStack.pop();
                    if (tmp.data.name.replace("/", "") != a.replace("/", "")) {
                        throw new MismatchError(tmp.data.name, a);
                    }
                    if (tmpTagStack.size != 0) {
                        tmpTagStack.root!.data.children.push(new Element(tmp.data.name, tmp.data.id, tmp.data.classes, tmp.data.text, tmp.data.attrs, tmp.data.children));
                    } else {
                        r.tree.push(new Element(tmp.data.name, tmp.data.id, tmp.data.classes, tmp.data.text, tmp.data.attrs, tmp.data.children))
                    }
                    depth--;
                } else {
                    tmpTagStack.root!.data.text = a;
                }
                if (depth > r.MAX_DEPTH) {
                    r.MAX_DEPTH = depth;
                }
            }
            console.log(r);
        } catch (e) {
            console.error(e);
            console.log(r);
            console.log(`Debug: ${debug}`);
        }
        return r;
    }
}
