const Shape = require("./Shape.js");
const TestGeneratorMapper = require("./TestGeneratorMapper.js");

module.exports = class AptitudeTestGenerator {
    
    constructor(config) {
        this.shapes = [];

        let testGeneratorMapper = new TestGeneratorMapper();
    
        for(let i = 0; i < config.test_length; i++){
            let shape = new Shape(config);
            let freeAbsolutePoint = testGeneratorMapper.placeShape(shape);
            console.log(`SUSPECT IN QUESTION IS ${freeAbsolutePoint}`)
            shape.setShapeAbsolutePoint(freeAbsolutePoint);
            this.shapes.push(shape);

        }
    }

    getShapes(){ return this.shapes; }

    getJSON() {
        let testJSON = []
        this.shapes.forEach((shape) => {
            testJSON.push(shape.getShapeJSON())
        })
        return testJSON;
    }

    getAptitestKey(){
        return JSON.stringify(this.getJSON());
    }
}