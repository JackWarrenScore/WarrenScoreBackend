const Point = require("./Point");
var _ = require('lodash');

module.exports = class GridSolver {
    constructor(shapes){
        this.modifiers = [new Point(0,1), new Point(1,0), new Point(0, -1), new Point(-1, 0)];
        this.shapes = shapes;
    
        this.getAllBoards([new Point(0,0)], [], this.shapes, {});
    }

    deepCopyPoints(points){
        let deepCopy = [];
        points.forEach((point) => {
            deepCopy.push(new Point(point.getX(), point.getY()));
        })
        return deepCopy;
    }

    canPlaceShape(anchorPoint, usedAnchors, tiles){
        console.log(`Checking if ${anchorPoint} is valid.`);
        const anchorHasBeenUsed = usedAnchors.includes(anchorPoint.toString());
        if(! anchorHasBeenUsed){
            for(let i = 0; i < tiles.length; i++){
                const prospectiveAnchor = tiles[i].getRelativePoint().plus(anchorPoint);
                const isOldAnchor = usedAnchors.includes(prospectiveAnchor.toString());
                if(isOldAnchor){
                    console.log("Nope!");
                    return false;
                }
            }
            console.log("Yep!");
            return true;
        }
        console.log("Nope!");
        return false;
    }

    placeShape(anchorPoint, usedAnchors, board, shape, availablePerimeterAnchors){
        board[anchorPoint.toString()] = shape;
        shape.getTiles().forEach((tile) => {
            const newlyUsedAbsolutePoint = tile.getRelativePoint().plus(anchorPoint);
            console.log(`Placing tile at absolute point ${newlyUsedAbsolutePoint}`);
            
            usedAnchors.push(newlyUsedAbsolutePoint.toString());

            //This could be fixed in a refactoring...
            let indexOfPoint = -1;
            for(let i = 0; i < availablePerimeterAnchors.length; i++){
                if(availablePerimeterAnchors[i].toString() === newlyUsedAbsolutePoint.toString()){
                    indexOfPoint = i;
                }
            }
            if(indexOfPoint !== -1){
                console.log("This point was marked as an available perimeter point. Removing.")
                availablePerimeterAnchors.splice(indexOfPoint, 1);
            }

            this.modifiers.forEach((modifier) => {
                const prospectivePerimeterAnchor = tile.getRelativePoint().plus(modifier);
                const prospectivePerimeterAnchorIsAlreadyUsed = usedAnchors.includes(prospectivePerimeterAnchor.toString());

                if(! prospectivePerimeterAnchorIsAlreadyUsed){
                    console.log(`${prospectivePerimeterAnchor} hasn't been used. Adding it as a potential perimeter item.`)
                    availablePerimeterAnchors.push(prospectivePerimeterAnchor)
                }
            })

            console.log(`Available Anchors After Placing Tile ${availablePerimeterAnchors} \n`);

        })
    }

    getAllBoards(availablePerimeterAnchors, usedAnchors, availableShapes, board){

        console.log("Recursing into a new board iteration.");
        for(let i = 0; i < availablePerimeterAnchors.length; i++){
            for(let ii = 0; ii < availableShapes.length; ii++){

                const prospectiveAnchor = availablePerimeterAnchors[i];
                const shape = availableShapes[i];
                const tiles = shape.getTiles();
                const canPlaceShape = this.canPlaceShape(prospectiveAnchor, usedAnchors, tiles);

                if(canPlaceShape){
                    let boardCopy = JSON.parse(JSON.stringify(board));
                    let availablePerimeterAnchorsCopy = this.deepCopyPoints(availablePerimeterAnchors);
                    console.log(`1: ${usedAnchors} : ${typeof(usedAnchors)}`);
                    let usedAnchorsCopy = JSON.parse(JSON.stringify(usedAnchors));
                    this.placeShape(prospectiveAnchor, usedAnchorsCopy, boardCopy, shape, availablePerimeterAnchorsCopy);
                    console.log(`2: ${usedAnchorsCopy} : ${typeof(usedAnchorsCopy)}`);
                    this.getAllBoards(availablePerimeterAnchorsCopy, usedAnchorsCopy, availableShapes.slice(ii+1), boardCopy);
                }
            }
        }

        //We reach this point once we go through all the branches,
        if(availableShapes.length === 0){
            console.log("We've actually hit the bottom level!");
        }
        else{
            console.log("This is not the end.");
        }

    }
}