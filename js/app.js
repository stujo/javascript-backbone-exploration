(function(Backbone) {

    var app = {
    	currentView: null,
    	switchView: function(newView){
    		if(this.currentView && this.currentView.remove){
    			this.currentView.remove();
    		}
    		this.currentView = newView;
    	}
    }


    function loadRectangles() {
        "use strict";

        var colors = ['#F00', '#0F0', '#00F'];

        var localStorage = new Backbone.LocalStorage('rectangle-backbone');

        var Rectangle = Backbone.Model.extend({
            localStorage: localStorage,
        });

        var Rectangles = Backbone.Collection.extend({
            model: Rectangle
        });

        var rectangles = new Rectangles;

        var pojos = localStorage.findAll();

        if (typeof pojos !== 'object') {
            pojos = [];
            // POJOs can be passed instead of 'Rectangle' objects
            for (var i = 1; i < 10; i++) {
                pojos.push({
                    width: randomDimension(),
                    height: randomDimension(),
                    top: randomPosition(),
                    left: randomPosition(),
                    color: randomColor()
                });
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


        // POJOs can be passed instead of 'Rectangle' objects
        rectangles.add(pojos);


        setInterval(function() {
            var rect = rectangles.at(randomInt(0, rectangles.length - 1));
            rect.set('color', randomColor());
            rect.set('left', randomPosition());
            rect.save();
        }, 1000);


        return rectangles;
    }

    app.rectangles = loadRectangles();

    console.log(app.rectangles);


    app.DefaultView = Backbone.View.extend({
        el: '#container',
        template: _.template($('#canvas-template').html()),
        rectangleTemplate: _.template($('#rectangle-template').html()),
        initialize: function() {
            this.render();
            this.listenTo(this.model.rectangles, "change", this.render);
        },
        model: { rectangles: app.rectangles },
        render: function() {
            this.$el.html(this.template({
                model: this.model,
                templates: {
                    rectangle: this.rectangleTemplate
                }
            }));
        }
    });


    var AppRouter = Backbone.Router.extend({
        routes: {
            "rectangles/:id": "getRectangle",
            "*actions": "defaultRoute"
            // Backbone will try to match the route above first
        }
    });
    

    // Instantiate the router
    app.router = new AppRouter;
    app.router.on('route:getRectangle', function(id) {
        // Note the variable in the route definition being passed in here
        alert("Get post number " + id);
        switchView(null);
    });
    
    app.router.on('route:defaultRoute', function(actions) {
        app.switchView(new app.DefaultView());
    });
    
    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();



})(Backbone);