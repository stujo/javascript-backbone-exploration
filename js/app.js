(function(Backbone) {

    var app = {}

    app.rectangles = (function() {
        "use strict";

        var pojos = undefined;
        var colors = ['#F00', '#0F0', '#00F'];

        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            try {
            	pojos = JSON.parse(localStorage.getItem("rectangles"));
            } catch(err){
            	console.log(err);
            }
        }


        if (typeof pojos !== 'object') {
            pojos = [];
            // POJOs can be passed instead of 'Rectangle' objects
            for (var i = 1; i < 10; i++) {
                pojos.push({
                    id: i,
                    width: randomDimension(),
                    height: randomDimension(),
                    top: randomPosition(),
                    left: randomPosition(),
                    color: randomColor()
                });
            }
	        if (typeof(Storage) !== "undefined") {
	            // Code for localStorage/sessionStorage.
	            localStorage.setItem("rectangles", JSON.stringify(pojos));
	        }
        }


        function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function randomDimension() {
            return randomInt(50, 100);
        }

        function randomPosition() {
            return randomInt(5, 200);
        }

        function randomColor() {
            return colors[randomInt(0, colors.length - 1)];
        }

        var Rectangle = Backbone.Model.extend({});

        var Rectangles = Backbone.Collection.extend({
            model: Rectangle
        });

        var rectangles = new Rectangles;

        // POJOs can be passed instead of 'Rectangle' objects
        rectangles.add(pojos);

        return rectangles;
    })();


    app.AppView = Backbone.View.extend({
        el: '#container',
        template: _.template($('#canvas-template').html()),
        rectangleTemplate: _.template($('#rectangle-template').html()),
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template({
                model: this.model,
                templates: {
                    rectangle: this.rectangleTemplate
                }
            }));
        }
    });

    app.appView = new app.AppView({
        model: {
            rectangles: app.rectangles
        }
    });


})(Backbone);