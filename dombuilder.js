//////////////////////////////////////
//                                  //
// JS domBuilder Library            //
//                                  //
// Tim Caswell <tim@creationix.com> //
//                                  //
//////////////////////////////////////

( // Module boilerplate to support component, browser globals and AMD.
  (typeof module !== "undefined" && function (m) { module.exports = m(); }) ||
  (typeof define === "function" && function (m) { define("dombuilder", m); }) ||
  (function (m) { window.domBuilder = m(); })
)(function () {
"use strict";

function domBuilder(json, refs) {

  // Render strings as text nodes
  if (typeof json === 'string') return document.createTextNode(json);

  // Pass through html elements and text nodes as-is
  if (json instanceof HTMLElement || json instanceof Text) return json;

  // Stringify any other value types
  if (!Array.isArray(json)) return document.createTextNode(json + "");

  // Empty arrays are just empty fragments.
  if (!json.length) return document.createDocumentFragment();

  var node, first;
  for (var i = 0, l = json.length; i < l; i++) {
    var part = json[i];

    if (!node) {
      if (typeof part === 'string') {
        // Create a new dom node by parsing the tagline
        var tag = part.match(TAG_MATCH);
        tag = tag ? tag[0] : "div";
        node = document.createElement(tag);
        first = true;
        var classes = part.match(CLASS_MATCH);
        if (classes) node.setAttribute('class', classes.map(stripFirst).join(' '));
        var id = part.match(ID_MATCH);
        if (id) node.setAttribute('id', id[0].substr(1));
        var ref = part.match(REF_MATCH);
        if (refs && ref) refs[ref[0].substr(1)] = node;
        continue;
      } else {
        node = document.createDocumentFragment();
      }
    }

    // Except the first item if it's an attribute object
    if (first && typeof part === 'object' && part.__proto__ === Object.prototype) {
      setAttrs(node, part);
    } else {
      node.appendChild(domBuilder(part, refs));
    }
    first = false;
  }
  return node;
};

function setAttrs(node, attrs) {
  var keys = Object.keys(attrs);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    var value = attrs[key];
    if (key === "$") {
      value(node);
    } else if (key === "css") {
      setStyle(node.style, value);
    } else if (key.substr(0, 2) === "on") {
      node.addEventListener(key.substr(2), value, false);
    } else {
      node.setAttribute(key, value);
    }
  }
}

function setStyle(style, attrs) {
  var keys = Object.keys(attrs);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    style[key] = attrs[key];
  }
}

var CLASS_MATCH = /\.[^.#$]+/g,
    ID_MATCH = /#[^.#$]+/,
    REF_MATCH = /\$[^.#$]+/,
    TAG_MATCH = /^[^.#$]+/;

function stripFirst(part) {
  return part.substr(1);
}

return domBuilder;

});
