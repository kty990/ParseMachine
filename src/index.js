const testing = true;

const {node} = require("./util/_Node.js");

const {
    DIV,
    a,
    span,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    img,
    audio,
    body,
    button,
    embed,
    figcaption,
    figure,
    footer,
    form,
    iframe,
    input,
    link,
    map,
    meta,
    nav,
    picture,
    select,
    script,
    style,
    svg,
    table,
    ul,
    li,
    head,
    html,
    title,
    _var,
    video
} = require("./util/HTMLclass.js");

const referenceTable_htmlClass = {
    "div":DIV,
    "a":a,
    "span":span,
    "h1":h1,
    "h2":h2,
    "h3":h3,
    "h4":h4,
    "h5":h5,
    "h6":h6,
    "p":p,
    "img":img,
    "audio":audio,
    "body":body,
    "button":button,
    "embed":embed,
    "figcaption":figcaption,
    "figure":figure,
    "footer":footer,
    "form":form,
    "iframe":iframe,
    "input":input,
    "link":link,
    "map":map,
    "meta":meta,
    "nav":nav,
    "picture":picture,
    "select":select,
    "script":script,
    "style":style,
    "svg":svg,
    "table":table,
    "ul":ul,
    "li":li,
    "head":head,
    "html":html,
    "title":title,
    "var":_var,
    "video":video
}

// const { ending_tags } = require("./util/miscUtil.js");

const axios = require('axios');

function assert(boolValue, assertionError) {
    if (!boolValue) {
        throw new Error(assertionError);
    }
    return true;
}

function createElement(isEnding, cur_scope_element) {
    return new Promise((resolve, reject) => {
        let classRef = referenceTable_htmlClass[isEnding['tag']];
        let unsuccessful = [];
        let classObj = null;
        if (classRef) {
            /**
             * id & class may be presented without surrounding quotations
             *  -> Must be fixed before official testing
             */
            classObj = new classRef();
            let id_i_s = cur_scope_element.indexOf("id=\"");
            let id_i_e = cur_scope_element.indexOf("\"",id_i_s);
            let id = cur_scope_element.substring(id_i_s,id_i_e);

            let class_i_s = cur_scope_element.indexOf("class=\"");
            let class_i_e = cur_scope_element.indexOf("\"",class_i_s);
            let classes = cur_scope_element.substring(class_i_s,class_i_e).split(" ");

            classObj.classes = classes;
            classObj.id = id;
        } else {
            unsuccessful.push(isEnding['tag']);
        }
        resolve({'unsuccessful': unsuccessful, 'element':classObj});
    });
}

class Parser {
    constructor(url) {
        this.url = (url !== undefined && url !== null) ? url : "";
    }

    RequestPageData() {
        return new Promise((resolve, reject) => {
            axios.get(this.url,{ headers: { 'Accept-Encoding': 'text/html; charset=UTF-8',}}).then(response => {
                resolve(response.data);
            });
        })
    }

    GenerateElements() {
        assert(this.url !== undefined && this.url !== null, `Invalid link. Expected URL, got ${typeof this.url}`);
        return new Promise(async (resolve, reject) => {
            let body = await this.RequestPageData();
            let elements = [];
            let raw_elements = body.split("<");
            if (!testing) {
                let scoped_elements = [];
                let scope_level = 0; // increment/decrement with child levels
                let last_at_scope = {}; // ie. "1": div <Object>, "2": h1 <Object> ...

                let x = 0;
                while (x < raw_elements.length) {
                    let element = raw_elements[x];
                    let isEnding = this.isEndingTag(element);
                    if (isEnding['boolean']) {
                        scope_level--;
                        let cur_scope_element = scoped_elements.splice(scoped_elements.length-1,1);
                        let elem_data = await createElement(isEnding, cur_scope_element);
                        elements.push(elem_data['element']);
                        if (elem_data['unsuccessful'].length > 0) {
                            console.log(`- ${elem_data['unsuccessful'].join("\n- ")}`);
                        }
                    } else {
                        if (ending_tags[isEnding['tag']] > 1) {
                            scope_level++;
                            scoped_elements.push(element);
                        } else {
                            let elem_data = await createElement(isEnding, element);
                            elements.push(elem_data['element']);
                            if (elem_data['unsuccessful'].length > 0) {
                                console.log(`- ${elem_data['unsuccessful'].join("\n- ")}`);
                            }
                        }
                    }

                    x++;
                }
            }
            console.log(raw_elements.join("\n\n"));
            if (!testing) {
                console.log(`Unsuccessful element creation:\n${unsuccessful.join("\n- ")}`);
            }
            // Once generated .. resolve elements
            resolve(elements);
        });
    }
}

let p0 = new Parser("https://www.youtube.com/");
p0.GenerateElements();

//{ headers: { 'Accept-Encoding': 'text/html; charset=UTF-8',}}
