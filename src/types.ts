export const html5Elements = [
    "DOCTYPE html",
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
    attributes: { key: [value: string] };
    children: Array<Element>;

    constructor(name: string, id: string, classes: Array<string>, text: string, attributes: Array<any>, children: Array<Element>) {
        this.name = name;
        this.id = id;
        this.classes = classes;
        this.text = text;
        for (const attr of attributes) {
            let tmp = attr.split("=");
            this.attributes[tmp[0]] = tmp[1];
        }
        this.children = children;
    }
}

interface result {
    MAX_DEPTH: number,
    tree: Array<Element>;
}

export class Scraper {
    constructor() { }

    static run(HTMLBody: string): result {
        let separator = /[<>]/;
        let splitString = HTMLBody.split(separator);
        let result = { MAX_DEPTH: 0, tree: [] };
        for (let a of splitString) {

        }
        return result;
    }
}
