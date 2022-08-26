const PlacementAssistant = require("./PlacementAssistant.js");
const Shape = require("./Shape.js");
const TestGeneratorMapper = require("./TestGeneratorMapper.js");

module.exports = class AptitudeTestGenerator {
    
    constructor(config) {
        console.log("***********************Creating new aptitude test generator***********************")
        this.shapes = [];

        let testGeneratorMapper = new TestGeneratorMapper();
        let placementAssistant = new PlacementAssistant();
    
        for(let i = 0; i < config.test_length; i++){
            let shape = new Shape(config);
            console.log(`Shape ${i} of ${config.test_length} created.`)
            let freeAbsolutePoint = placementAssistant.determineShapesLocation(shape);
            // let freeAbsolutePoint = testGeneratorMapper.placeShape(shape);
            console.log(`Placement position found! ${freeAbsolutePoint}`)
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