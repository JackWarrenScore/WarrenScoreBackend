const { json } = require("body-parser");
const Point = require("./Point.js");
const ShapeGeneratorAssistant = require("./ShapeGeneratorAssistant.js");
var Tile = require("./Tile.js");

module.exports = class Shape {
    constructor(config){
        this.tiles = []
        const randomizedShapeSize = Math.floor(Math.random() * (config.shape_max_size - 1)) + 1;

        //Here we're also mapping the modifiers to a code we can use in the machine.
        const probabilities = {
            "+": config["plus_modifier_amount"],
            "*": config["times_modifier_amount"],
            "^": config["power_modifier_amount"],
            "u": config["undefined_modifier_amount"]            
        }
        
        const shapeGeneratorAssistant = new ShapeGeneratorAssistant();

        for(let i = 0; i < randomizedShapeSize; i++){
            const tile = new Tile();
            tile.setValue(this.getWeightedValue(config.radius_maximum));
            tile.setUpModifier(this.getWeightedRandomSelection(probabilities));
            tile.setLeftModifier(this.getWeightedRandomSelection(probabilities));
            tile.setDownModifier(this.getWeightedRandomSelection(probabilities));
            tile.setRightModifier(this.getWeightedRandomSelection(probabilities));

            console.log("Generating new tile...");
            console.log(tile.toString());
            console.log("Getting new position...");
            const currentPoint = shapeGeneratorAssistant.getUnusedPoint();
            console.log(`Position recieved: ${currentPoint}`);
            tile.setX(currentPoint.getX());
            tile.setY(currentPoint.getY());
            this.tiles.push(tile);

            console.log('\n\n')

        }
    }

    getTiles(){
        return this.tiles;
    }

    getShapeJSON(){
        let shapeJSON = []
        this.tiles.forEach((tile) => {
            shapeJSON.push(tile.getJSON())
        })
        return shapeJSON;
    }

    getWeightedValue(r){
        let num = Math.floor(Math.random()*r) + 1;
        num *= Math.round(Math.random()) ? 1 : -1;
        return num;
    }

    getWeightedRandomSelection(jsonOfPossibilities){
        let count = 0;
        let randomSelection = Math.random();

        for(let key in jsonOfPossibilities){ count += jsonOfPossibilities[key]; }

        for(let key in jsonOfPossibilities){
            const currentProbability = jsonOfPossibilities[key] / count;
            if(randomSelection > currentProbability){
                randomSelection -= currentProbability;
            }
            else{
                return key;
            }
        }

    }
}