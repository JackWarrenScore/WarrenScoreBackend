var Tile = require("./Tile.js");

module.exports = class Shape {
    constructor(config){
        this.tiles = []
        const randomizedShapeSize = Math.floor(Math.random() * (config.shape_max_size - 1)) + 1;

        for(let i = 0; i < randomizedShapeSize; i++){
            const tile = new Tile();
            //TODO: set tile based off of statistic reasoning from the config file.
            this.tiles.push(tile);
        }
    }

    getTiles(){
        return this.tiles;
    }
}