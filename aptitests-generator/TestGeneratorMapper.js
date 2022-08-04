const Point = require("./Point");

module.exports = class TestGeneratorMapper {
    constructor(){
        this.UP = new Point(0,1);
        this.LEFT = new Point(-1,0);
        this.DOWN = new Point(0,-1);
        this.RIGHT = new Point(0,1);
        this.availablePoints = [new Point(0, 0)];
        this.usedPoints = new Set();
    }


    //TODO TODO TODO TODO
    //ITS THE FOREACH WHY IS EVERYTHING IN JAVASCRIPT SO STUPID ARGH
    //IF I SWITCH TO A NORMAL FOR LOOP IT SHOULD WORK FINE BUT THE FOREACH ISN'T LETTING ME RETURN ANYTHING OR BREAK EARLY ITS VERY ANNOYING.
    placeShape(shape){
        const tiles = shape.getTiles();

        this.availablePoints.forEach((groundingPoint, groundingIndex) => {
            
            let isValidPlacement = true;
            tiles.forEach((tile) => {
                isValidPlacement = isValidPlacement && (!this.usedPoints.has(tile.getRelativePoint().plus(groundingPoint).toString()))
            })

            if(isValidPlacement){
                tiles.forEach((tile) => {
                    const newlyUsedPoint = tile.getRelativePoint().plus(groundingPoint);
                    this.usedPoints.add(newlyUsedPoint.toString());

                    if(! this.usedPoints.has(newlyUsedPoint.plus(this.UP).toString())){
                        this.availablePoints.push(newlyUsedPoint.plus(this.UP));
                    }
                    if(! this.usedPoints.has(newlyUsedPoint.plus(this.LEFT).toString())){
                        this.availablePoints.push(newlyUsedPoint.plus(this.LEFT));
                    }
                    if(! this.usedPoints.has(newlyUsedPoint.plus(this.DOWN).toString())){
                        this.availablePoints.push(newlyUsedPoint.plus(this.DOWN));
                    }
                    if(! this.usedPoints.has(newlyUsedPoint.plus(this.RIGHT).toString())){
                        this.availablePoints.push(newlyUsedPoint.plus(this.RIGHT));
                    }
                })

                console.log(`Grounding index: ${groundingIndex} \n Grounding point: ${groundingPoint}`);
                // this.availablePoints.splice(groundingIndex, 1);
                return groundingPoint;
            }

        })
        

    }
}