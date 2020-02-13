"use strict";

process(document.documentElement);

function process(node) {
  if (node.nodeType !== 1) return;
  process_(node.nodeName, node.style, window.getComputedStyle(node));
  node.childNodes.forEach(process);
}

function process_(name, inline, computed) {
  unstyle(name, inline, computed, "display", none, redisplay);

  unstyle(name, inline, computed, "margin-top", negative, initialize);
  unstyle(name, inline, computed, "margin-right", negative, initialize);
  unstyle(name, inline, computed, "margin-bottom", negative, initialize);
  unstyle(name, inline, computed, "margin-left", negative, initialize);
}

function unstyle(name, inline, computed, property, predicate, override) {
  if (predicate(computed.getPropertyValue(property)))
    override(inline, property, name);
}

function none(value) {
  return value === "none";
}

function negative(value) {
  return value.charAt(0) === "-";
}

function redisplay(inline, property, name) {
  var value = natural(name);
  if (value) inline.setProperty(property, value, "important");
}

function initialize(inline, property, name) {
  inline.setProperty(property, "initial", "important");
}

// From view-source:resource://gre-resources/html.css
function natural(name) {
  return {
    ADDRESS: "block",
    ARTICLE: "block",
    ASIDE: "block",
    BLOCKQUOTE: "block",
    BODY: "block",
    CAPTION: "table-caption",
    CENTER: "block",
    COL: "table-column",
    COLGROUP: "table-column-group",
    DD: "block",
    DETAILS: "block",
    DIR: "block",
    DIV: "block",
    DL: "block",
    DT: "block",
    FIGCAPTION: "block",
    FIGURE: "block",
    FOOTER: "block",
    FORM: "block",
    FRAMESET: "block",
    H1: "block",
    H2: "block",
    H3: "block",
    H4: "block",
    H5: "block",
    H6: "block",
    HEADER: "block",
    HGROUP: "block",
    HR: "block",
    HTML: "block",
    LI: "list-item",
    LISTING: "block",
    MAIN: "block",
    MARQUEE: "inline-block",
    MENU: "block",
    MULTICOL: "block",
    NAV: "block",
    OL: "block",
    P: "block",
    PLAINTEXT: "block",
    PRE: "block",
    SECTION: "block",
    SUMMARY: "block",
    TABLE: "table",
    TBODY: "table-row-group",
    TD: "table-cell",
    TFOOT: "table-footer-group",
    TH: "table-cell",
    THEAD: "table-header-group",
    TR: "table-row",
    UL: "block",
    XMP: "block"
  }[name];
}
