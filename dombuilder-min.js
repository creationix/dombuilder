//////////////////////////////////////
//                                  //
// JS domBuilder Library            //
//                                  //
// Tim Caswell <tim@creationix.com> //
//                                  //
//////////////////////////////////////
(typeof define=="function"&&function(e){define("dombuilder",e)}||function(e){window.domBuilder=e()})(function(){"use strict";function e(n,a){if(typeof n=="string")return document.createTextNode(n);var f,l;for(var c=0,h=n.length;c<h;c++){var p=n[c];if(!f){if(typeof p=="string"){var d=p.match(o);d=d?d[0]:"div",f=document.createElement(d),l=!0;var v=p.match(r);v&&f.setAttribute("class",v.map(u).join(" "));var m=p.match(i);m&&f.setAttribute("id",m[0].substr(1));var g=p.match(s);a&&g&&(a[g[0].substr(1)]=f);continue}f=document.createDocumentFragment()}l&&typeof p=="object"&&p.__proto__===Object.prototype?t(f,p):f.appendChild(e(p,a)),l=!1}return f}function t(e,t){var r=Object.keys(t);for(var i=0,s=r.length;i<s;i++){var o=r[i],u=t[o];o==="$"?u(e):o==="css"?n(e.style,u):o.substr(0,2)==="on"?e.addEventListener(o.substr(2),u,!1):e.setAttribute(o,u)}}function n(e,t){var n=Object.keys(t);for(var r=0,i=n.length;r<i;r++){var s=n[r];e[s]=t[s]}}function u(e){return e.substr(1)}var r=/\.[^.#$]+/g,i=/#[^.#$]+/,s=/\$[^.#$]+/,o=/^[^.#$]+/;return e});