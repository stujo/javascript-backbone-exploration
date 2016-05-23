(function(Backbone){

   var Rectangle = Backbone.Model.extend({});

  var rect = new Rectangle({
  	width: 150,
  	height: 100,
  	top: 5,
  	left: 50,
  	color: "#F00"
  	});


  function logColor(rectangle, newColor, context){
  	console.log("logColor(" + newColor + ");");
    console.log(rectangle.get("color"));
  }

  rect.on("change:color", logColor);

  rect.set("color",'#0F0');

})(Backbone);

