const Point = require("./Point");
const RailroadTrack = require("./RailroadTrack");
var _ = require('lodash');

module.exports = class GridSolver {
    constructor(shapes){
        this.modifiers = [new Point(0,1), new Point(1,0), new Point(0, -1), new Point(-1, 0)];
        this.shapes = shapes;
    
        let usedAnchors = new RailroadTrack(["POINT", "STRING"]);

        let availableAnchors = new RailroadTrack(["POINT", "STRING"]);
        availableAnchors.addTies(["POINT", "STRING"], [new Point(0,0), new Point(0,0).toString()]);
        
        let startingAnchor = new Point(0,0);

        this.getAllBoards(availableAnchors, usedAnchors, shapes, board, 0);
        // usedAnchors.addTies(["POINT", "STRING"], [new Point(0,0), new Point(0,0).toString()]);


        // this.getAllBoards([new Point(0,0)], [], this.shapes, {}, 0);
    }

    canPlaceShape(anchorPoint, usedAnchors, tiles){
        // console.log(`Checking if ${anchorPoint} is valid.`);
        const anchorHasBeenUsed = usedAnchors.includes(anchorPoint.toString());
        if(! anchorHasBeenUsed){
            for(let i = 0; i < tiles.length; i++){
                const prospectiveAnchor = tiles[i].getRelativePoint().plus(anchorPoint);
                const isOldAnchor = usedAnchors.includes(prospectiveAnchor.toString());
                if(isOldAnchor){
                    // console.log("Nope!");
                    return false;
                }
            }
            // console.log("Yep!");
            return true;
        }
        // console.log("Nope!");
        return false;
    }

    placeShape(anchorPoint, usedAnchors, board, shape, availablePerimeterAnchors){
        board[anchorPoint.toString()] = shape;
        shape.getTiles().forEach((tile) => {
            const newlyUsedAbsolutePoint = tile.getRelativePoint().plus(anchorPoint);
            // console.log(`Placing tile at absolute point ${newlyUsedAbsolutePoint}`);
            
            usedAnchors.push(newlyUsedAbsolutePoint.toString());

            //This could be optimized by refactoring...
            let indexOfPoint = -1;
            for(let i = 0; i < availablePerimeterAnchors.length; i++){
                if(availablePerimeterAnchors[i].toString() === newlyUsedAbsolutePoint.toString()){
                    indexOfPoint = i;
                }
            }
            if(indexOfPoint !== -1){
                // console.log("This point was marked as an available perimeter point. Removing.")
                availablePerimeterAnchors.splice(indexOfPoint, 1);
            }

            this.modifiers.forEach((modifier) => {
                const prospectivePerimeterAnchor = tile.getRelativePoint().plus(modifier);
                const prospectivePerimeterAnchorIsAlreadyUsed = usedAnchors.includes(prospectivePerimeterAnchor.toString());

                if(! prospectivePerimeterAnchorIsAlreadyUsed){
                    // console.log(`${prospectivePerimeterAnchor} hasn't been used. Adding it as a potential perimeter item.`)
                    availablePerimeterAnchors.push(prospectivePerimeterAnchor)
                }
            })

            // console.log(`Available Anchors After Placing Tile ${availablePerimeterAnchors} \n`);

        })
    }

    getAllBoards(availablePerimeterAnchors, usedAnchors, availableShapes, board, level){

        // console.log("Recursing into a new board iteration.");

        if(availableShapes.length === 0){
            console.log(`BOARD level ${level}: ${Object.keys(board)}`)
        }
        else{
            for(let ii = 0; ii < availableShapes.length; ii++){
                for(let i = 0; i < availablePerimeterAnchors.length; i++){
                
    
                    const prospectiveAnchor = availablePerimeterAnchors[i];
                    const shape = availableShapes[ii];
                    const tiles = shape.getTiles();
                    const canPlaceShape = this.canPlaceShape(prospectiveAnchor, usedAnchors, tiles);
    
                    if(canPlaceShape){
                        let boardCopy = _.cloneDeep(board);
                        let availablePerimeterAnchorsCopy = _.cloneDeep(availablePerimeterAnchors);
                        let usedAnchorsCopy = _.cloneDeep(usedAnchors);
                        this.placeShape(prospectiveAnchor, usedAnchorsCopy, boardCopy, shape, availablePerimeterAnchorsCopy);
                        
                        //I just need to not fast forward. I don't need to reinvent the wheel. Slice is killing me.
                        //1. Copy shapes
                        let shapesCopy = _.cloneDeep(shapes);
                        //2. Remove my shape specifically.
                        shapesCopy.splice(ii, 1);
                        //3. Pass in available shapes

                        this.getAllBoards(availablePerimeterAnchorsCopy, usedAnchorsCopy, shapesCopy, boardCopy, level++);
                    }
                }
            }
        }
    }
}