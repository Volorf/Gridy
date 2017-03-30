function createVerticalGuides(context) {
	superMainFunc(context, "vertical")
}

function createHorizontalGuides(context) {
	superMainFunc(context, "horizontal")
}

function superMainFunc (context, whatWeDo) {

	var doc = context.document,
		selection = context.selection,
		layer = selection.firstObject(),
		fontSizeSelectedTextLayer = 0,
	  sketch = context.api(),
		layerWidth = layer.frame().width(),
		layerXMin = layer.frame().x(),
		layerXMax = layer.frame().x() + layerWidth;

		if (selection.length == 0) {
			doc.showMessage("You should select at least one text layer");
		} else if (selection.length == 1){
			if (layer.className() == "MSShapeGroup") {
				if (whatWeDo == "vertical") {
					createVeticalGuides();
				} else if (whatWeDo == "horizontal") {
					createHorizontalGuides();
				} else if (whatWeDo == "remove"){
					removeAllGuides();
				}
			} else {
				doc.showMessage("You should select a shape layer only");
			}
		} else {
			doc.showMessage("You should select an one layer only");
		}

	function createVeticalGuides () {
		var target = [[doc currentPage] currentArtboard] || [doc currentPage];
		var input = Number(doc.askForUserInput_initialValue("Amount of sections", "1"));
		var unit = layerWidth / input
		[[target horizontalRulerData] addGuideWithValue:layerXMin]
		[[target horizontalRulerData] addGuideWithValue: layerXMax]
		if (input > 1) {
			for (var i = 1; i < input; i++) {
				[[target horizontalRulerData] addGuideWithValue: layerXMin + (unit * i)]
			}
		}
	}

	function createHorizontalGuides () {

	}

	function removeAllGuides () {

	}

}
