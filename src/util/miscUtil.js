const tags_required = {
    "div": 2,
    "a": 2,
    "span": 2,
    "h1": 2,
    "h2": 2,
    "h3": 2,
    "h4": 2,
    'h5': 2,
    'h6': 2,
    'p': 2,
    'img': 1,
    'audio': 2,
    'body': 2,
    'button': 2,
    'embed': 1,
    'figcaption': 2,
    'figure': 2,
    'footer': 2,
    'form': 2,
    'iframe': 2,
    'input': 1,
    'link': 1,
    'map': 2,
    'meta': 1,
    'nav': 2,
    'picture': 2,
    'select': 2,
    'script': 2,
    'style': 2,
    'svg': 2,
    'table': 2,
    'ul': 2,
    'li': 2,
    'head': 2,
    'html': 2,
    'title': 2,
    'var': 2,
    'video': 2,
    'comment': 1
};

const tag_names = [
    "div",
    "a",
    "span",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "img",
    "audio",
    "body",
    "button",
    "embed",
    "figcaption",
    "figure",
    "footer",
    "form",
    "iframe",
    "input",
    "link",
    "map",
    "meta",
    "nav",
    "picture",
    "select",
    "script",
    "style",
    "svg",
    "table",
    "ul",
    "li",
    "head",
    "html",
    "title",
    "var",
    "video"
];

function GetEndingTagNames() {
    let temp = [];
    for (let x = 0; x < tag_names.length; x++) {
        temp.push(`/${tag_names[x]}>`);
    }
    return temp
}

function GetNumberOfTags(tagName) {
    return tags_required[tagName] || -1;
}

module.exports = {GetEndingTagNames, GetNumberOfTags};
