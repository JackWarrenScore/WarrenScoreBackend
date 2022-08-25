const Point = require("./Point");

module.exports = class TestGeneratorMapper {
    constructor(){
        this.iteration = 0;
        this.UP = new Point(0,1);
        this.LEFT = new Point(-1,0);
        this.DOWN = new Point(0,-1);
        this.RIGHT = new Point(0,1);

        this.unavailablePoints = [];
        this.pointsOpenAroundPerimeter = [new Point(0,0)]
        this.stringsOpenAroundPerimeter = [new Point(0, 0).toString()];
        this.usedStrings = new Set();
    }

    placeShape(shape){

        console.log(`Placing new shape...`)

        const tiles = shape.getTiles();
        let rootedPoint = null;

        for(let i = this.pointsOpenAroundPerimeter.length - 1; i >= 0; i--){
            const potentialGroundingPoint = this.pointsOpenAroundPerimeter[i];
            const potentialGroundingString = this.stringsOpenAroundPerimeter[i];

            //Check to see if each tile can be placed
            let isValidPlacement = true;
            tiles.forEach((tile) => {
                //Make sure the new location isn't already used.
                isValidPlacement = isValidPlacement && (! this.usedStrings.has(tile.getRelativePoint().plus(potentialGroundingPoint).toString()));
            })

            //Now we know that all the tiles can be placed
            //So lets add new points to the perimeter lists 
            if(isValidPlacement) {
                console.log("Placement is valid!");

                tiles.forEach((tile) => {


                    const newlyUsedPoint = tile.getRelativePoint().plus(potentialGroundingPoint);
                    const newlyUsedPointIndex = this.stringsOpenAroundPerimeter.indexOf(newlyUsedPoint.toString())

                    this.pointsOpenAroundPerimeter.splice(this.pointsOpenAroundPerimeter, 1);
                    this.stringsOpenAroundPerimeter.splice(this.stringsOpenAroundPerimeter, 1);
                    this.usedStrings.add(newlyUsedPoint.toString());

                    [this.UP, this.LEFT, this.DOWN, this.RIGHT].forEach((direction) => {
                        const newPerimeterPosition = newlyUsedPoint.plus(direction);
                        if(! this.usedStrings.has(newPerimeterPosition.toString())){
                            this.pointsOpenAroundPerimeter.push(newPerimeterPosition);
                            this.stringsOpenAroundPerimeter.push(newPerimeterPosition.toString());
                        }
                    })
                })

                return potentialGroundingPoint;

            }

            return potentialGroundingPoint;
        }
    }
}