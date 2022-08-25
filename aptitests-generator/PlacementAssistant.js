const Point = require("./Point");
const Tile = require("./Tile");

module.exports = class PlacementAssistant {
    constructor(){
        this.originPoint = new Point(0, 0);
        this.availableAnchorPoints = [this.originPoint];
        this.availableAnchorPointsStrings = [this.originPoint.toString()];
        this.anchorsThatHaveBeenUsed = new Set();
        this.UP = new Point(0,1);
        this.LEFT = new Point(-1,0);
        this.DOWN = new Point(0,-1);
        this.RIGHT = new Point(1,0);
        
        //I don't need to use this right now...
        this.pointsToGrid = {};
    }

    internalPlaceTile(tile, rootingPoint){
        const absolutePointString = rootingPoint.toString();

        //One thing to note is that I had to add the new Point(0,0) to the constructor, which isn't what I wanted
        //However it seems more ideal than doing a whole check every time I place a tile.
        //Overall, good progress!

        if(this.availableAnchorPointsStrings.includes(absolutePointString)){
            const absolutePointIndex = this.availableAnchorPointsStrings.indexOf(absolutePointString);
            this.availableAnchorPoints.splice(absolutePointIndex, 1);
            this.availableAnchorPointsStrings.splice(absolutePointIndex, 1);
            this.anchorsThatHaveBeenUsed.add(absolutePointString);
        }

        [this.UP, this.LEFT, this.DOWN, this.RIGHT].forEach((direction) => {
            const newAnchorPoint = rootingPoint.plus(direction);
            const newAnchorPointString = newAnchorPoint.toString();
            const isAlreadyAvailable = this.availableAnchorPointsStrings.includes(newAnchorPointString);
            const isAlreadyUsed = this.anchorsThatHaveBeenUsed.has(newAnchorPointString);
            
            //If we can add the new anchor point...
            if((! isAlreadyAvailable) && (! isAlreadyUsed)){
                this.availableAnchorPoints.push(newAnchorPoint);
                this.availableAnchorPointsStrings.push(newAnchorPointString);
            }

        });

        console.log(`Available Anchor Points: ${this.availableAnchorPointsStrings}`);
    }

    placeShapes(shapes){
        shapes.forEach((shape) => {
            if(this.availableAnchorPoints === []){
                console.log("This should only be called as the initial condition.");
                shape.getTiles().forEach((tile) => {
                    this.internalPlaceTile(tile, new Point(0,0));
                })
            }
            //If there are available starting points
            else {

            }
        })
    }

}