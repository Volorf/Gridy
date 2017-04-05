function createVerticalGuides(context) {
	superMainFunc(context, "vertical")
}

function createHorizontalGuides(context) {
	superMainFunc(context, "horizontal")
}

function removeAllGuides(context) {
	superMainFunc(context, "remove")
}

function superMainFunc (context, whatWeDo) {

	var doc = context.document,
		selection = context.selection,
		layer = selection.firstObject(),
		fontSizeSelectedTextLayer = 0,
	  sketch = context.api(),
		layerWidth = layer.frame().width(),
		layerHeight = layer.frame().height(),
		layerXMin = layer.frame().x(),
		layerYMin = layer.frame().y(),
		layerXMax = layerXMin + layerWidth,
		layerYMax = layerYMin + layerHeight,
		target = [[doc currentPage] currentArtboard] || [doc currentPage];

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
		var input = Number(doc.askForUserInput_initialValue("Amount of sections", "1"));
		var unit = layerWidth / input
		[[target horizontalRulerData] addGuideWithValue:layerXMin]
		[[target horizontalRulerData] addGuideWithValue: layerXMax]
		if (input > 1) {
			for (var i = 1; i < input; i++) {
				[[target horizontalRulerData] addGuideWithValue: layerXMin + (unit * i)]
			}
		}
		doc.showMessage("Vertical guidelines have been created")
	}

	function createHorizontalGuides () {
		var input = Number(doc.askForUserInput_initialValue("Amount of sections", "1"));
		var unit = layerHeight / input
		[[target verticalRulerData] addGuideWithValue:layerYMin]
		[[target verticalRulerData] addGuideWithValue:layerYMax]
		if (input > 1) {
			for (var i = 1; i < input; i++) {
				[[target verticalRulerData] addGuideWithValue: layerYMin + (unit * i)]
			}
		}
		doc.showMessage("Horizontal guidelines have been created");
	}

	function removeAllGuides () {
		var countVertical = [[target verticalRulerData] numberOfGuides]
		var countHorizontal = [[target horizontalRulerData] numberOfGuides]
		while(countVertical > 0 ) {
    	[[target verticalRulerData] removeGuideAtIndex:0]
    	var countVertical = [[target verticalRulerData] numberOfGuides]
		}
		while(countHorizontal > 0 ) {
    	[[target horizontalRulerData] removeGuideAtIndex:0]
    	var countHorizontal = [[target horizontalRulerData] numberOfGuides]
		}
		doc.showMessage("Guidelines have been removed");
	}

}
