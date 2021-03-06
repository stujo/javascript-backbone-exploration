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

        if (typeof pojos !== 'object' || pojos.length == 0) {
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
            if(rect){
	            rect.set('color', randomColor());
	            rect.set('left', randomPosition());
	            rect.save();
	        }
        }, 1000);


        return rectangles;
    }

    app.rectangles = loadRectangles();

    app.DefaultView = Backbone.View.extend({
        tagName: 'div',
        id: 'default_view',
        template: _.template($('#canvas-template').html()),
        rectangleTemplate: _.template($('#rectangle-fragment-template').html()),
        initialize: function() {
			$("#container").html(this.el);
            this.listenTo(this.model.rectangles, "change", this.render);
			this.render();
            console.log("initializing default view");
        },
        model: { rectangles: app.rectangles },
        showRectangle : function(ev) {
        	var id = $(ev.target).data('rectangleId');
		    app.router.navigate('rectangles/' + id, true);
		},
		events : {
		    "click .rectangle" : "showRectangle"
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
    app.RectangleView = Backbone.View.extend({
        tagName: 'div',
        id: 'rectangle_view',
        template: _.template($('#rectangle-template').html()),
        initialize: function() {
			$("#container").html(this.el);
            this.listenTo(this.model, "change", this.render);
			this.render();
            console.log("initializing rectangle view");
        },
        showAll : function(ev) {
		    app.router.navigate('', true);
		},
		events : {
		    "click" : "showAll"
		},
        render: function() {
            this.$el.html(this.template({
                rectangle: this.model
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
        var rectangle = app.rectangles.get(id);
        console.log(rectangle);
        app.switchView(new app.RectangleView({model: rectangle}));
    });
    
    app.router.on('route:defaultRoute', function(actions) {
        app.switchView(new app.DefaultView());
    });
    
    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();



})(Backbone);