"use strict";

process(document.documentElement);

function process(node) {
  var computed;

  if (node.nodeType !== 1) return;

  computed = window.getComputedStyle(node);
  position(node, computed);
  margin(node, computed, "");
  details(node, computed);

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

function margin(node, computed, suffix) {
  mark(node, computed, "margin-top", negative, suffix);
  mark(node, computed, "margin-right", negative, suffix);
  mark(node, computed, "margin-bottom", negative, suffix);
  mark(node, computed, "margin-left", negative, suffix);
}

function details(node, computed) {
  if (node.nodeName === "DETAILS") node.open = true;
}

function mark(node, computed, property, predicate, suffix) {
  if (predicate(computed.getPropertyValue(property)))
    node.classList.add("showeverything-" + property + suffix);
}

function negative(value) {
  return value.charAt(0) === "-";
}
