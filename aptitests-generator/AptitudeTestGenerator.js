const PlacementAssistant = require("./PlacementAssistant.js");
const Shape = require("./Shape.js");
const TestGeneratorMapper = require("./TestGeneratorMapper.js");
const GridSolver = require("./GridSolver");

module.exports = class AptitudeTestGenerator {
    
    constructor(config) {
        console.log("***********************Creating new aptitude test generator***********************")
        this.shapes = [];

        let placementAssistant = new PlacementAssistant();
    
        for(let i = 0; i < config.test_length; i++){
            let shape = new Shape(config);
            console.log(`Shape ${i} of ${config.test_length} created.`)
            let freeAbsolutePoint = placementAssistant.determineShapesLocation(shape);
            shape.setShapeAbsolutePoint(freeAbsolutePoint);
            this.shapes.push(shape);
        }

        let gridSolver = new GridSolver(this.shapes);
        const solution = gridSolver.everyPossibleBoard[0];
        this.shapes = solution;
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