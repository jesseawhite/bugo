//A window object which will be associated with the stack of windows
exports.MapWindow = function(args) {
	
	var instance = Ti.UI.createWindow(args);
	// pull events from the database to be used within this script
	var events;
	if (arguments.length == 1) {
		if (arguments[0].category != 'undefined') {
			// get events of the specified category
			events = new globals.db.getEvents(arguments[0].category);
		}
		else {
			// get all events
			events = new globals.db.getEvents();
		}
	}
		
	
	// Annotate the events
	
	//set data array for lats and lons
	// var data = [];
	// // for loop to pull the data for each event
	// for (var key in events) {
		// // key the events in "e"
		// var e = events[key];
		// // pull the data from e and set it to lat, lon, and title
		// var eData = {
			// latitude:e.latitude,
			// longitude:e.longitude,
			// title:e.title,
			// animate:true,
			// image:e.icon,
		// };
		// // push this all back to the data array
		// data.push(eData);
	// }
// 	
	// Create the Map View
	
	// create a native mapview
	var mapView = Titanium.Map.createView({
		// set the map to a hybrid style
		mapType: Titanium.Map.STANDARD,
		// the initial region the map goes to when opened
		region:{latitude:40.697966, longitude:-89.615815, latitudeDelta:0.003, longitudeDelta:0.003},
		// map dimensions
		height:370,
		width:320,
		
	});
	// throw the annotations up on the map
	
	
	// Additional Features
	

	// null variables to be populated later
	
	var all = null;
	var art = null;
	var gre = null;
	var aca = null;
	var rel = null;
	var spo = null;
	var ser = null;
	var com = null;
	var gen = null;
	var lea = null;
	var cul = null;
	var pol = null;
	
	
	
	
	
 		
	var wireClickHandlers = function() {
	
	// event listeners to do stuff

	all.addEventListener('click', function() {
		// set annotation to All
	});
	art.addEventListener('click', function(e) {
		var data = [];
		// for loop to pull the data for each event
		for (var key in events) {
			// key the events in "e"
			var e = events[key];
			//alert(e.category)
			// pull the data from e and set it to lat, lon, and title
			if (e.category == "Arts"){
				var annotData = {
					latitude:e.latitude,
					longitude:e.longitude,
					title:e.title,
					animate:true,
					image:e.icon,
					related: e,
					rightButton: Titanium.UI.iPhone.SystemButton.ADD
				};
			
						
			} else {
				var annotData = {};
			}
			data.push(annotData);
		}
		// push this all back to the data array
		
		
		mapView.addEventListener('click', function(e){
				//Ti.API.debug(annotData.related);
		 		if (e.clicksource == 'rightButton') {
					var DetailWindow = require('ui/common/DetailWindow');
	    			//alert('clicked')
	    			// create new event window
		    		var detail_window = new DetailWindow({
		    			title:annotData.title,
						backgroundColor: '#323232',
						related:annotData.related
					});
				
			// open category window
	    			globals.tabs.currentTab.open(detail_window);
		        }
		});
		//alert(e.backgroundImage)
		//art.backgroundImage = 'images/small2/arts1.png';
		//alert(annotData)
		mapView.setAnnotations(data);
	});
	
	gre.addEventListener('click', function(e) {
		var data = [];
		// for loop to pull the data for each event
		for (var key in events) {
			// key the events in "e"
			var e = events[key];
			//var category = e.category_title;
			//alert(e.category);
			// pull the data from e and set it to lat, lon, and title
			if (e.category == "Greek"){
				var annotData = {
					latitude:e.latitude,
					longitude:e.longitude,
					title:e.title,
					animate:true,
					image:e.icon,
					
				};
				
			} else {
				var annotData = {};
			};	
			
			// push this all back to the data array
			data.push(annotData);
		}
		gre.backgroundImage = '../images/small2/greek1.png'
		//alert(data)
		mapView.setAnnotations(data);
	});
	
	aca.addEventListener('click', function() {
		// set annotation to Academic
	});
	rel.addEventListener('click', function() {
		// set annotation to Religious
	});
	spo.addEventListener('click', function() {
		// set annotation to Sports
	});
	ser.addEventListener('click', function() {
		// set annotation to Service
	});
	com.addEventListener('click', function() {
		// set annotation to Communication
	});
	gen.addEventListener('click', function() {
		// set annotation to General
	});
	lea.addEventListener('click', function() {
		// set annotation to Leadership
	});
	cul.addEventListener('click', function() {
		// set annotation to Culture
	});
	pol.addEventListener('click', function() {
		// set annotation to Political
	});
	
	}

	// Toolbar Buttons
		
	// empty space for padding buttons
	flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	// button to change to Peoria
	all = Titanium.UI.createButton({
		backgroundImage:'images/small2/all1.png',	
		height:39,
		width:46
	});
	art = Titanium.UI.createButton({
		backgroundImage:'images/small2/arts.png',	
		height:39,
		width:46
	});
	gre = Titanium.UI.createButton({
		backgroundImage:'images/small2/greek.png',	
		height:39,
		width:46
	});
	aca = Titanium.UI.createButton({
		backgroundImage:'images/small2/academic.png',	
		height:39,
		width:46
	});
	rel = Titanium.UI.createButton({
		backgroundImage:'images/small2/religious.png',	
		height:39,
		width:46
	});
	spo = Titanium.UI.createButton({
		backgroundImage:'images/small2/sports.png',	
		height:39,
		width:46
	});
	ser = Titanium.UI.createButton({
		backgroundImage:'images/small2/service.png',	
		height:39,
		width:46
	});
	com = Titanium.UI.createButton({
		backgroundImage:'images/small2/comm.png',	
		height:39,
		width:46
	});
	gen = Titanium.UI.createButton({
		backgroundImage:'images/small2/general.png',	
		height:39,
		width:46
	});
	lea = Titanium.UI.createButton({
		backgroundImage:'images/small2/leadership.png',	
		height:39,
		width:46
	});
	cul = Titanium.UI.createButton({
		backgroundImage:'images/small2/cultural.png',	
		height:39,
		width:46
	});
	pol = Titanium.UI.createButton({
		backgroundImage:'images/small2/government.png',	
		height:39,
		width:46
	});

	
	
	
	
	
	wireClickHandlers();
	
	var hScrollview = Ti.UI.createScrollView({
		top:0,
		height:'42',
		contentWidth:'auto',
		showHorizontalScrollIndicator:true,
		disableBounce:true,
		showHorizontalScrollIndicator:false
		
	});
	
	// create a toolbar populated with the buttons
	var toolBar = Titanium.UI.createToolbar({
		items:[all,art,gre,aca,rel,spo,ser,com,gen,lea,cul,pol],
		translucent:true,
		width:685,
		barColor:'#D6D6D6'
	});
	hScrollview.add(toolBar);
	
	
	// creates the variable for the right nav button with a little plus sign
	var options = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.ADD
	})

	// adds the right nav button 'options
	instance.rightNavButton = options;
	// adds an event listener that on the click adds our fancy toolbar at the bottom for more options
	i = 0;
	// options button event listener
	options.addEventListener('click', function(e) {
		// add the horizontal scrolling toolbar to the window
		instance.add(hScrollview)
		// if i is 0 show the toolbar
		if (i==0) {
			hScrollview.show();
			i=1;
		}
		// if i isn't 0 hide the toolbar
		else{
		hScrollview.hide();
		i=0;
		}
	});
	
	// add the mapview to the window
	instance.add(mapView);
	return instance;
};
