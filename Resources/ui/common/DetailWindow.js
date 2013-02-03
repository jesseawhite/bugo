//A window object which will be associated with the stack of windows
exports.DetailWindow = function(args) {
	var instance = Ti.UI.createWindow(args);
	Ti.API.debug(args);
	// get event details
	var e = args.related;
	
	// get image
	var f = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/event_image.png');
	
	// creates the scrollView
	var scrollView = Ti.UI.createScrollView({
		contentWidth:'auto',
		contentHeight:'auto',
		top:0,
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:true
	});
	
	// title
	var title = Ti.UI.createLabel({
		text:e.title,
		color:'#FFF',
		font:{fontFamily:'Arial',fontSize:18},
		height:'auto',
		top:10,
		textAllign: 'left',
		left:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var description = Ti.UI.createLabel({
		text:e.description,
		color:'#FFF',
		font:{fontFamily:'Arial',fontSize:14},
		height:'auto',
		top:title.top+20,
		textAllign: 'left',
		left:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	
	// creates the event image field
	var imageView = Ti.UI.createImageView({
		image:f,
		text:e.description,
		touchEnabled:true,
		width:150,
		height:'auto',
		top:description.top+10,
		left:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius:5
	});
	
	var start = Ti.UI.createLabel({
		color:'#FFF',
		text:'Start:',
		left:165,
		top:description.top+40,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var start_date = Ti.UI.createLabel({
		color:'#FFF',
		text:e.start_date,
		left:start.left+35,
		top:description.top+40,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var end = Ti.UI.createLabel({
		color:'#FFF',
		text:'End:',
		left:165,
		top:start.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var end_date = Ti.UI.createLabel({
		color:'#FFF',
		text:e.end_date,
		left:end.left+30,
		top:start.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var attending = Ti.UI.createLabel({
		color:'#FFF',
		text:'Attending:',
		left:165,
		top:end.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var favs = Ti.UI.createLabel({
		color:'#FFF',
		text:e.num_favs,
		left:attending.left+60,
		top:end.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var _cost = Ti.UI.createLabel({
		color:'#FFF',
		text:'Cost:',
		left:165,
		top:attending.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var cost = Ti.UI.createLabel({
		color:'#FFF',
		text:e.cost,
		left:_cost.left+35,
		top:attending.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var _open = Ti.UI.createLabel({
		color:'#FFF',
		text:'Open to:',
		left:165,
		top:cost.top+50,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var open = Ti.UI.createLabel({
		color:'#FFF',
		text:e.open_to,
		left:_open.left+55,
		top:cost.top+50,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var location = Ti.UI.createLabel({
		text:'Building:',
		color:'#FFF',
		top:imageView.top+183,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		left:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var building = Ti.UI.createLabel({
		color:'#FFF',
		text:e.building,
		top:imageView.top+183,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		left:location.left+55,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var _address = Ti.UI.createLabel({
		color:'#FFF',
		text:'Address:',
		top:building.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		left:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var address = Ti.UI.createLabel({
		color:'#FFF',
		text:e.address,
		top:building.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		left:_address.left+55,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var _city = Ti.UI.createLabel({
		color:'#FFF',
		text:'City:',
		top:address.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		left:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var city = Ti.UI.createLabel({
		color:'#FFF',
		text:e.city,
		top:address.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		left:_city.left+32,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var state = Ti.UI.createLabel({
		color:'#FFF',
		text:'State:',
		top:city.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		left:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var _state = Ti.UI.createLabel({
		color:'#FFF',
		text:e.state,
		top:city.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		left:state.left+35,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var _zip = Ti.UI.createLabel({
		color:'#FFF',
		text:'Zip:',
		top:state.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		left:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var zip = Ti.UI.createLabel({
		color:'#FFF',
		text:e.zip,
		top:state.top+20,
		font:{fontFamily:'Arial',fontSize:13},
		height:'auto',
		textAllign: 'left',
		left:_zip.left+25,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	//creates mapview centered over bradley
	var bradley = {latitude:40.696861,longitude:-89.616045,latitudeDelta:0.005, longitudeDelta:0.005};

	var mapLabel = Titanium.UI.createLabel({
		height:300,
		width:300,
		left:10,
		top:zip.top+20,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius: 10,
		borderColor: "#ffffff"
	});

	var mapView = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: bradley,
		animate:true,
		regionFit:true,
		userLocation:true,
	});
	
	// socital media tabs
	var _twitter = Titanium.UI.createLabel({
		backgroundColor:'#ffffff',
		color:'#323232',
		text:' Twitter',
		height:'auto',
		top:mapLabel.top+315,
		left:10,
		width:300,
		borderWidth:2,
		borderColor:'#ffffff',
		borderRadius:5,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	});

	var twitter = Titanium.UI.createLabel({
		backgroundColor:'#ffffff',
		color:'#323232',
		url:e.twitter_url,
		height:'auto',
		top:mapLabel.top+315,
		left:_twitter.left+80,
		width:300,
		borderWidth:2,
		borderColor:'#ffffff',
		borderRadius:5,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	});

	var _facebook = Titanium.UI.createLabel({
		backgroundColor:'#ffffff',
		color:'#323232',
		text:' Facebook',
		height:'auto',
		top:_twitter.top+40,
		left:10,
		width:300,
		borderWidth:2,
		borderColor:'#ffffff',
		borderRadius:5,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	});

	var facebook = Titanium.UI.createLabel({
		backgroundColor:'#ffffff',
		color:'#323232',
		url:e.twitter_url,
		height:'auto',
		top:mapLabel.top+315,
		left:10,
		width:300,
		borderWidth:2,
		borderColor:'#ffffff',
		borderRadius:5,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	});

	// create button
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:'Favorite: ' + e.favorite,
		top: facebook.top+80,
		align: 'right'
	});
	//instance.add(button);
	
	function setEventData() {
		//Ti.API.info("Set Event Data");
		
		// set favorite button feedback
		button.title = 'Favorite: ' + globals.db.getFavorite(e.id);
	}
	
	// button callback
	button.addEventListener('click', function() {
		var set_as;
		
		// toggle favorite
		if (globals.db.getFavorite(e.id)) {
			set_as = false;
		}
		else {
			set_as = true;
		}
		
		Ti.API.info(e.title + ": " + e.id + " = " + set_as);
		
		// set favorite
		globals.db.setFavorite(e.id, set_as);
	});
	
	// event listener for database update
	Ti.App.addEventListener('dbUpdate', setEventData);
	
	// set event data
	setEventData();
	
	//scrollview.a(label) to add label fields to scrollView
	scrollView.add(button);
	scrollView.add(_facebook);
	scrollView.add(facebook);
	scrollView.add(twitter);
	scrollView.add(_twitter);
	scrollView.add(mapLabel);
	mapLabel.add(mapView);
	scrollView.add(zip);
	scrollView.add(_zip);
	scrollView.add(_state);
	scrollView.add(state);
	scrollView.add(_city);
	scrollView.add(city);
	scrollView.add(_address);
	scrollView.add(address);
	scrollView.add(open);
	scrollView.add(_open);
	scrollView.add(_cost);
	scrollView.add(cost);
	scrollView.add(attending);
	scrollView.add(favs);
	scrollView.add(start);
	scrollView.add(start_date);
	scrollView.add(end);
	scrollView.add(end_date);
	scrollView.add(title);
	scrollView.add(description);
	scrollView.add(imageView);
	scrollView.add(building);
	scrollView.add(location);
	
	//Adds the scrollView to the newly created window
	instance.add(scrollView);
	
	return instance;
};
