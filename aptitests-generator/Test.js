const PlacementAssistant = require("./PlacementAssistant");

const Tile = require("./Tile");
const Point = require("./Point");
const Shape = require("./Shape");

const GridSolver = require("./GridSolver");

const config = {
    'test_length': 2,
    'shape_max_size': 3,
    'radius_maximum': 5,
    'plus_modifier_amount': 3,
    'times_modifier_amount': 5,
    'power_modifier_amount': 1,
    'undefined_modifier_amount': 5
};

let shapes = [];
for(let i = 0; i < config.test_length; i++){
    let shape = new Shape(config);
    console.log(`Shape ${i} has ${shape.getTiles().length} tiles`)
    shapes.push(shape);
}

gridSolver = new GridSolver(shapes);

console.log("Nice.");

const solution = gridSolver.everyPossibleBoard[0];

solution.forEach((shape) => {
    console.log(shape.getShapeJSON())
})

