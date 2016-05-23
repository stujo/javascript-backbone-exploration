(function(Backbone) {

    var app = {}

    var Rectangle = Backbone.Model.extend({});

    var rectangles = [new Rectangle({
            id: 1,
            width: 150,
            height: 100,
            top: 5,
            left: 5,
            color: "#00F"
        }),
        new Rectangle({
            id: 2,
            width: 150,
            height: 100,
            top: 90,
            left: 100,
            color: "#0F0"
        })
    ];

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
            rectangles: rectangles
        }
    });


})(Backbone);