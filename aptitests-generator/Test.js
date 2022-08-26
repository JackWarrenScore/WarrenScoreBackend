const PlacementAssistant = require("./PlacementAssistant");
const Tile = require("./Tile");
const Point = require("./Point");

let pa = new PlacementAssistant();

let tile1 = new Tile();
tile1.setValue(10);
tile1.setX(0);
tile1.setY(0);

let tile2 = new Tile();
tile2.setValue(5);
tile2.setX(0);
tile2.setY(1);

pa._placeTile(tile1, new Point(0,0));
pa._placeTile(tile2, new Point(0,1));
