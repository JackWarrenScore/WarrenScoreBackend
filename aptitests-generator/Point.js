module.exports = class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    getX(){ return this.x; }
    getY(){ return this.y; }

    addToX(amount) { this.x += amount; }
    addToY(amount) { this.y += amount; }

    getThisPlusPoint(point) { return new Point(this.x + point.getX(), this.y + point.getY()); }

    toString(){ return `(${this.x}, ${this.y})`; }
}