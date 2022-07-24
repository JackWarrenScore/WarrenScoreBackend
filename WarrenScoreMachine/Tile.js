module.exports = class Tile {
    constructor(){
        this.tile = {
            "value": 0,
            "up_modifier":"",
            "left_modifier":"",
            "down_modifier":"",
            "right_modifier":"",
            "x":null,
            "y":null
        }
    }

    setX(xCoord){ this.tile.x = xCoord; }

    setY(yCoord){ this.tile.y = yCoord; }

    setValue(modifier){ this.tile.value = modifier; }

    setUpModifier(modifier){ this.tile.up_modifier = modifier; }

    setLeftModifier(modifier) { this.tile.left_modifier = modifier; }

    setDownModifier(modifier) { this.tile.down_modifier = modifier; }

    setRightModifier(modifier) { this.tile.right_modifier = modifier; }

    toString() { return `Tile: ${this.tile.value} ${this.tile.up_modifier}${this.tile.left_modifier}${this.tile.down_modifier}${this.tile.right_modifier}`; }

    getJSON() { return this.tile; }
}