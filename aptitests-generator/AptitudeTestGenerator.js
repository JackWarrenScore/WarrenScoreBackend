const Shape = require("./Shape.js");
const GridSolver = require("./GridSolver");

module.exports = class AptitudeTestGenerator {
    
    constructor(config) {
        console.log("***********************Creating new aptitude test generator***********************")
        this.shapes = [];

        for(let i = 0; i < config.test_length; i++){
            let shape = new Shape(config);
            this.shapes.push(shape);
        }

        let gridSolver = new GridSolver(this.shapes);
        const solution = gridSolver.getASolution();
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