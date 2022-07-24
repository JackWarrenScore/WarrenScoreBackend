var Shape = require("./Shape.js");

module.exports = class AptitudeTestGenerator {
    
    constructor(config) {
        this.shapes = [];
    
        for(let i = 0; i < config.test_length; i++){
            this.shapes.push(new Shape(config));   
        }
    }

    //TODO: save the test tiles to thedatabase.
    //TODO: generate a unique test code.

    getShapes(){ return this.shapes; }

    getJSON() {
        let testJSON = []
        this.shapes.forEach((shape) => {
            testJSON.push(shape.getShapeJSON())
        })
        return testJSON;
    }
}