(function(Backbone) {

    var app = {}

    app.colors = ['#F00', '#0F0', '#00F'];

    app.randomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    app.randomDimension = function() {
        return this.randomInt(50, 100);
    }

    app.randomPosition = function() {
        return this.randomInt(5, 200);
    }

    app.randomColor = function() {
        return this.colors[this.randomInt(0, app.colors.length - 1)];
    }

    app.Rectangle = Backbone.Model.extend({});

    app.rectangles = [];

    for(var i=1; i < 10; i++){
       app.rectangles.push(new app.Rectangle({
            id: 1,
            width: app.randomDimension(),
            height: app.randomDimension(),
            top: app.randomPosition(),
            left: app.randomPosition(),
            color: app.randomColor()
        }));
    }

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