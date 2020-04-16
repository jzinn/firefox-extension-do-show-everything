"use strict";

process(document.documentElement);

function process(node) {
  var computed;

  if (node.nodeType !== 1) return;

  computed = window.getComputedStyle(node);
  position(node, computed);
  display(node, computed);
  margin(node, computed, "");
  height(node, computed);
  width(node, computed);
  details(node, computed);
  float(node, computed);

  computed = window.getComputedStyle(node, "::before");
  margin(node, computed, "-before");

  computed = window.getComputedStyle(node, "::after");
  margin(node, computed, "-after");

  node.childNodes.forEach(process);
}

function position(node, computed) {
  if (computed.getPropertyValue("position") !== "static")
    node.style.setProperty("position", "initial", "important");
}

function display(node, computed) {
  var value;
  if (computed.getPropertyValue("display") === "none") {
    value = natural(node.nodeName);
    if (value) node.classList.add("showeverything-display-" + value);
  }
}

function margin(node, computed, suffix) {
  mark(node, computed, "margin-top", negative, suffix);
  mark(node, computed, "margin-right", negative, suffix);
  mark(node, computed, "margin-bottom", negative, suffix);
  mark(node, computed, "margin-left", negative, suffix);
}

function height(node, computed) {
  if (node.scrollHeight !== node.clientHeight) {
    node.style.setProperty("height", "initial", "important");
    node.style.setProperty("max-height", "initial", "important");
    node.style.setProperty("min-height", "initial", "important");
  }
}

function width(node, computed) {
  var width = computed.width;
  if (width === "0px" || width === "1px")
    node.classList.add("showeverything-width");
}

function details(node, computed) {
  if (node.nodeName === "DETAILS") node.open = true;
}

function float(node, computed) {
  if (computed.getPropertyValue("float") !== "none") {
    if (node.parentNode)
      node.parentNode.classList.add("showeverything-clearfix");
  }
}

function mark(node, computed, property, predicate, suffix) {
  if (predicate(computed.getPropertyValue(property)))
    node.classList.add("showeverything-" + property + suffix);
}

function negative(value) {
  return value.charAt(0) === "-";
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
    XMP: "block",
  }[name];
}
