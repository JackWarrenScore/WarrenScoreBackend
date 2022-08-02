var Shape = require("./Shape.js");

module.exports = class AptitudeTestGenerator {
    
    constructor(config) {
        this.shapes = [];

        console.log(`Config: ${JSON.stringify(config)}`)
        console.log(`Does the constructor get called?`)
    
        for(let i = 0; i < config.test_length; i++){
            this.shapes.push(new Shape(config));   
        }
    }

    getShapes(){ return this.shapes; }

    getJSON() {
        let testJSON = []
        this.shapes.forEach((shape) => {
            console.log(shape);
            testJSON.push(shape.getShapeJSON())
        })
        return testJSON;
    }

    getAptitestKey(){
        return JSON.stringify(this.getJSON());
    }
}