module.exports = class RailroadTrack {
    constructor(tieNames){
        this.railroadTrack = {};

        tieNames.forEach(name => {
            this.railroadTrack[name] = [];
        });
    }

    addTie(tieName, data){
        this.railroadTrack[tieName].push(data);
    }

    addTies(tieNames, data){
        for(let i = 0; i < tieNames.length; i++){
            this.railroadTrack[tieNames[i]].push(data[i]);
        }
    }

    removeByTie(tieName, dataToBeRemoved){
        if(tieName in this.railroad){
            const indexOfOccurance = this.railroad[tieName].indexOf(dataToBeRemoved);
            Object.keys(this.railroad).forEach((keyName) => {
                this.railroad[keyName].splice(indexOfOccurance, 1);
            })
        }
    }

    getTieNames(){
        return Object.keys(this.railroad);
    }
}