module.exports = class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    getX(){ return this.x; }
    getY(){ return this.y; }

    addToX(amount) { this.x += amount; }
    addToY(amount) { this.y += amount; }

    plus(point) { return new Point(point.getX() + this.x, point.getY() + this.y); }

    toString(){ return `(${this.x}, ${this.y})`; }
}