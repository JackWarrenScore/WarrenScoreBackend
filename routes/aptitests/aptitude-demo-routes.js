module.exports = function(app){ 

    app.post('/machine-test', (req, res) => {
        const aptitudeTestGenerator = new AptitudeTestGenerator({
            'test_length': 7,
            'shape_max_size': 4,
            'radius_maximum': 5,
            'plus_modifier_amount': 3,
            'times_modifier_amount': 5,
            'power_modifier_amount': 1,
            'undefined_modifier_amount': 5
        });
        
        aptitudeTestGenerator.getShapes().forEach(shape => console.log(shape.getTiles()));

        res.send(aptitudeTestGenerator.getJSON());
    })
}
