const Point = require("./Point");

module.exports = class ShapeGeneratorAssistant {
    constructor(){
        this.modifiers = [new Point(0,1), new Point(1,0), new Point(0, -1), new Point(-1, 0)];
        this.unusedPoints = [new Point(0, 0)];
        this.usedPoints = [];
    }

    getUnusedPoint() {
        const index = Math.floor(Math.random()*this.unusedPoints.length);
        console.log(`UnusedPoints length: ${this.unusedPoints.length}`);
        const removedPoint = this.unusedPoints.splice(index, 1)[0];
        console.log(`UnusedPoints length: ${this.unusedPoints.length}`);
        this.usedPoints.push(removedPoint.toString());

        this.modifiers.forEach((modifier) => {
            console.log(`Is ${removedPoint.plus(modifier).toString()} in ${this.usedPoints}`)
            if( ! this.usedPoints.includes(removedPoint.plus(modifier).toString())){
                this.unusedPoints.push(removedPoint.plus(modifier));
                console.log("No!")
            }
            else{
                console.log("Yes!")
            }
        })

        return removedPoint;
    }
}