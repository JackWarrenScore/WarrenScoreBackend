const Point = require("./Point");
var _ = require('lodash');

module.exports = class GridSolver {
    constructor(shapes){
        this.modifiers = [new Point(0,1), new Point(1,0), new Point(0, -1), new Point(-1, 0)];
        this.shapes = shapes;
    }

    checkIfShapeCanBePlaced(shape, anchor, usedAbsolutePoints){
        const tiles = shape.getTiles();
        for(let i = 0; i < tiles.length; i++){
            const possibleAbsolutePoint = tiles[i].getRelativePoint().plus(anchor);
            if(usedAbsolutePoints.includes(possibleAbsolutePoint.toString())){
                return false;
            }
        }
        return true;
    }

    placeShape(shape, anchor, usedAbsolutePoints, availablePerimeterAnchors){
        shape.setShapeAbsolutePoint(anchor);
        const tiles = shape.getTiles();
        tiles.forEach((tile) => {
            const newlyUsedAbsolutePoint = tile.getRelativePoint().plus(anchor);
            usedAbsolutePoints.push(newlyUsedAbsolutePoint.toString());

            const positionInAlreadyAvailableAnchors = availablePerimeterAnchors.indexOf(newlyUsedAbsolutePoint.toString());
            
            if(positionInAlreadyAvailableAnchors !== -1){
                availablePerimeterAnchors.splice(positionInAlreadyAvailableAnchors, 1);
            }

            // console.log(`Now, onto the perimeter adding portion...`)
            const modifierPoints = [new Point(0,1), new Point(-1,0), new Point(0,-1), new Point(1,0)];
            modifierPoints.forEach((modifierPoint) => {
                const newPerimeterPoint = modifierPoint.plus(newlyUsedAbsolutePoint);
                const newPointIsAlreadyUsed = usedAbsolutePoints.includes(newPerimeterPoint.toString());
                const newPointIsAlreadyAvailable = availablePerimeterAnchors.includes(newPerimeterPoint.toString());
                const newPointCanBeAddedToPerimeter = ! (newPointIsAlreadyUsed || newPointIsAlreadyAvailable);
                if(newPointCanBeAddedToPerimeter){
                    // console.log(`Adding ${newPerimeterPoint} to available perimeters`)
                    availablePerimeterAnchors.push(newPerimeterPoint);
                }
            })
        })
    }
    
    getASolution(){

        let availablePerimeterAnchors = [new Point(5, 5)];
        let usedAbsolutePoints = []
        let availableShapes = _.cloneDeep(this.shapes)
        let board = [];

        while(availableShapes.length !== 0){
            let shape = availableShapes.pop();

            for(let i = 0; i < availablePerimeterAnchors.length; i++){
                const prospectiveAnchor = availablePerimeterAnchors[i];

                if(this.checkIfShapeCanBePlaced(shape, prospectiveAnchor, usedAbsolutePoints)){
                    // console.log(`Placing shape index ${i}`)
                    this.placeShape(shape, prospectiveAnchor, usedAbsolutePoints, availablePerimeterAnchors);
                    board.push(shape);
                    break;
                }
            }
        }

        return board;
    }
}