var Shape = require("./Shape.js");

module.exports = class AptitudeTestGenerator {
    
    constructor(config) {
        this.shapes = [];
    
        for(let i = 0; i < config.test_length; i++){
            this.shapes.push(new Shape(config));   
        }
    }

    getShapes(){ return this.shapes; }
}