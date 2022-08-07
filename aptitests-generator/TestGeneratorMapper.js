const Point = require("./Point");

module.exports = class TestGeneratorMapper {
    constructor(){
        this.iteration = 0;
        this.UP = new Point(0,1);
        this.LEFT = new Point(-1,0);
        this.DOWN = new Point(0,-1);
        this.RIGHT = new Point(0,1);
        this.availablePoints = [new Point(0, 0)];
        this.usedPoints = new Set();
    }

    placeShape(shape){
        const tiles = shape.getTiles();
        let rootedPoint = null;

        console.log(`Iteration ${this.iteration}`);
        console.log(`Currently available points: ${this.availablePoints}`);

        for(let i = 0; i < this.availablePoints.length; i++) {
            const groundingPoint = this.availablePoints[i];
            
            let isValidPlacement = true;
            tiles.forEach((tile) => {
                isValidPlacement = isValidPlacement && (!this.usedPoints.has(tile.getRelativePoint().plus(groundingPoint).toString()))
            })

            if(isValidPlacement){
                for(let ii = 0; ii < tiles.length; ii++){
                    let tile = tiles[ii];
                    
                    //Either something here is wrong with the tile (am i just storing jsons?)
                    //Or something is wrong with the .getRelativePoint() function.

                    let relativeUsedPoint = tile.getRelativePoint();
                    console.log(`Relative Used Point ${relativeUsedPoint}`)
                    let newlyUsedPoint = relativeUsedPoint.plus(groundingPoint);

                    console.log(`Currently used points: ${[...this.usedPoints]}`)

                    if(! this.usedPoints.has(newlyUsedPoint.plus(this.UP).toString())){
                        console.log("UP has not been taken.")
                        this.availablePoints.push(newlyUsedPoint.plus(this.UP));
                    }
                    if(! this.usedPoints.has(newlyUsedPoint.plus(this.LEFT).toString())){
                        console.log("LEFT has not been taken.")
                        this.availablePoints.push(newlyUsedPoint.plus(this.LEFT));
                    }
                    if(! this.usedPoints.has(newlyUsedPoint.plus(this.DOWN).toString())){
                        console.log("DOWN has not been taken.")
                        this.availablePoints.push(newlyUsedPoint.plus(this.DOWN));
                    }
                    if(! this.usedPoints.has(newlyUsedPoint.plus(this.RIGHT).toString())){
                        console.log("RIGHT has not been taken.")
                        this.availablePoints.push(newlyUsedPoint.plus(this.RIGHT));
                    }

                    this.availablePoints.splice(this.availablePoints.indexOf(newlyUsedPoint), 1)
                    this.usedPoints.add(newlyUsedPoint.toString());
                }

                rootedPoint = groundingPoint;
                break;
            }

        }

        this.iteration += 1;
        return rootedPoint;
    }
}