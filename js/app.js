(function(Backbone) {

    var Rectangle = Backbone.Model.extend({});

    var rect = new Rectangle({
        width: 150,
        height: 100,
        top: 50,
        left: 50,
        color: "#F00"
    });

    var AppView = Backbone.View.extend({
        el: '#container',
        template: _.template('<div id="canvas"><div class="rectangle" style="top: <%= model.get("top") %>px"></div></div>'),
      initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template({model: rect}));
        }
    });

    var appView = new AppView();


    function logColor(rectangle, newColor, context) {
        console.log("logColor(" + newColor + ");");
        console.log(rectangle.get("color"));
    }

    rect.on("change:color", logColor);

    rect.set("color", '#0F0');

})(Backbone);