import {
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
} from "./util/HTMLclass.js";

import { axios } from "axios";

function assert(boolValue, assertionError) {
    if (!boolValue) {
        throw new Error(assertionError);
    }
    return true;
}

class Parser {
    constructor(url) {
        this.url = (url !== undefined && url !== null) ? url : "";
    }

    GenerateElements() {
        assert(this.url !== undefined && this.url !== null, `Invalid link. Expected URL, got ${typeof this.url}`);
        return new Promise((resolve, reject) => {
            axios.get(queryURL).then(res => {
                let body = res.data;

                // Extract elements from HTML document data
                let elements = [];


                // Once generated .. resolve elements
                resolve(elements);
            })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    }
}
