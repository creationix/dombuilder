# DomBuilder

[![Build Status](https://secure.travis-ci.org/creationix/dombuilder.png)](http://travis-ci.org/creationix/dombuilder)


Dombuilder is a simple library that makes it easy to generate dom nodes from a JSON-like structure.

## Usage

The module is a single function exported as the global `domBuilder` or through an AMD style module as the `dombuilder` package.


```js
// Create a hash to store element references
var $ = {};
// Create the template as a JSON-ML structure
var template = [
  [".profile",  // "<div class="profile">
    [".left.column", // <div class="left column">
      ["#date", new Date().toString() ], // <div id="date">Today's Date</div>
      ["#address", "Sunnyvale, California" ]
    ],
    // native event handlers, not a string to be evaled.
    [".right.column", { onclick: function (evt) { alert("Foo!"); } }, 
      ["#email", "tim@creationix.com" ],
      ["#bio", "Cool Guy" ]
    ]
  ],
  [".form",
    // $inputField means this element will be available as $.inputField when the call returns.
    ["input$inputField"],
    // Here we're using the reference in the onclick handler
    ["button", {onclick: function () { alert($.inputField.value); }}, "Click Me"]
  ],
  ["hr", {
    // The css key sets .style attributes
    css: {width:"100px",height:"50px"},
    // The $ key gets called as soon as this element is created
    $: function (hr) { console.log(hr); }
  }],
  ["p", "Inspect the source (not view source) to see how clean this dom is!"]
];

// Calling the function with the template and storage hash will return the root 
// node (or document fragment is there are multiple root nodes).
var root = domBuilder(template, $);
```