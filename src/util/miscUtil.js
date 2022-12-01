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

function GetNumberOfTags() {
    return -1; // if this is returned there is an error
}

module.exports = {GetEndingTagNames, GetNumberOfTags};
