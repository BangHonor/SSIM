//Create a Pixi Application
var PIXI = require("pixi.js")
const app = new PIXI.Application({
    width:320,
    height: 270,
    view: document.querySelector("canvas"),
})

document.body.appendChild(app.view)
app.renderer.backgroundColor = 0xFFFFFF;