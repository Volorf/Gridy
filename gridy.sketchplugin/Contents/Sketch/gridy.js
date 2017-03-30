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
					setPerfectRatioFontSizeForSelectedTextLayer();
				} else if (whatWeDo == "horizontal") {
					setPerfectRatioLineHeightForSelectedTextLayer();
				}
			} else {
				doc.showMessage("You should select a shape layer only");
			}
		} else {
			doc.showMessage("You should select an one layer only");
		}

	// Set perfect ratio for lineHeight
	function createVeticalGuides () {
		var target = [[doc currentPage] currentArtboard] || [doc currentPage];
		log(target)
		var input = Number(doc.askForUserInput_initialValue("Enter your data", "1"));
		var unit = layerWidth / input
		[[target horizontalRulerData] addGuideWithValue:layerXMin]
		[[target horizontalRulerData] addGuideWithValue: layerXMax]
		if (input > 1) {
			for (var i = 1; i < input; i++) {
				[[target horizontalRulerData] addGuideWithValue: layerXMin + (unit * i)]
			}
		}

	}

	// Set perfect ratio for fontSize
	function setPerfectRatioFontSizeForSelectedTextLayer () {
		var getChoosedRatioFromUser = sketch.getSelectionFromUser("Choose ratio for Font Size", arrayRatioWords),
		indexForArrayRatioNumbers = getChoosedRatioFromUser[1];
		layer.setFontSize(lineHeightSelectedTextLayer / arrayRatioNumbers[indexForArrayRatioNumbers])
	}
}
