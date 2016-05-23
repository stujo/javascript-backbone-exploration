(function(Backbone) {

    var app = {}

    app.rectangles = (function(){
		"use strict";
	    var colors = ['#F00', '#0F0', '#00F'];

	    var randomInt = function(min, max) {
	        return Math.floor(Math.random() * (max - min + 1)) + min;
	    }

	    var randomDimension = function() {
	        return randomInt(50, 100);
	    }

	    var randomPosition = function() {
	        return randomInt(5, 200);
	    }

	    var randomColor = function() {
	        return colors[randomInt(0, colors.length - 1)];
	    }

	    var Rectangle = Backbone.Model.extend({});

	    var rectangles = [];

	    for(var i=1; i < 10; i++){
	       rectangles.push(new Rectangle({
	            id: 1,
	            width: randomDimension(),
	            height: randomDimension(),
	            top: randomPosition(),
	            left: randomPosition(),
	            color: randomColor()
	        }));
	    }
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