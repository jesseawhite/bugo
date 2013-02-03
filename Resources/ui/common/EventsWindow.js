exports.EventsWindow = function(args) {
	// create window instance
	var instance = Ti.UI.createWindow(args);

	// set category
	var category;
	if(arguments.length == 1) {
		if(arguments[0].category != 'undefined') {
			// get events of the specified category
			category = arguments[0].category;
		} else {
			category = null;
		}
	}

	// create the table view
	var table = Ti.UI.createTableView();

	// table event listener
	// table.addEventListener('click', function(e) {
		// // create new event detail window
		// var EventWindow = require('ui/common/DetailWindow');
// 
		// // create new event window
		// var event_window = new EventWindow({
			// title : e.rowData.title,
			// backgroundColor : '#323232',
			// related : e.rowData.related
		// });
// 
		// // open category window
		// globals.tabs.currentTab.open(event_window);
	// });
	
	function setEventTableData() {
		//Ti.API.info("Set Event Table Data");
		
		// get events
		var events;

		if(category != null) {
			// get events of the specified category
			events = new globals.db.getEvents(category);
		} else {
			// get all events
			events = new globals.db.getEvents();
		}

		// empty array
		var data = [];

		// establish the i variable to help assign alternating color rows
		var i = 0;

		// loop through events and build rows
		for(var key in events) {
			var e = events[key];
			var title = e.title;
			// create row
			var row = Titanium.UI.createTableViewRow({
				backgroundColor : (i % 2) ? '#efefef' : '#d6d6d6',
				height : 50,
				related : e,
				
			});

			// give the row an icon
			var icon = Titanium.UI.createImageView({
				image : e.icon,
				width : 24,
				height : 26,
				top : 10,
				left : 5
			});
		
			// info label contains all the event info and excludes the favorite button
			var infoLabel = Titanium.UI.createLabel({
				height:50,
				width:275,
				left:0
			});
			
			// give the row an icon
			var icon = Titanium.UI.createImageView({
				image:e.icon,
				width:24,
				height:26,
				top:10,
				left:5
			});
				
			// the favorite button	
			var favorite = Ti.UI.createLabel({
				backgroundImage:'/images/icons/star.png',
				width:27,
				height:27,
				top:10,
				right:10,
				row:row
			});
				
			// give the row a title			
			var title = Titanium.UI.createLabel({
				text:e.title,
				color:'black',
				font:{fontSize:16, fontWeight:'bold'},
				top:3,
				left:52,
				height:30,
				width:175
			});
	 
	 		// give the row a date
			var date =  Titanium.UI.createLabel({
				text:e.start_date,
				color:'black',
				font:{fontSize:12, fontStyle:'italic'},
				top:22,
				left:52,
				height:25,
				width:100
			});
			
			Ti.API.debug(row)
			// add the event listener to the favorite button
	  		favorite.addEventListener('click', function(e){
	  			alert("Favorited!");
	  			// establishes the current row you are clicking the favorite button in
	  			var currentRow = e.row;
	  			// shows a 'clicked' favorite button
	  			var clickedFav = Titanium.UI.createLabel({
	  				backgroundImage:'images/icons/yellow_star.png',
	  				width:27,
					height:27,
					top:10,
					right:10,
	  			})
	  			// tells the database that this event (e.id) has been favorited (1)
	  			var api = new globals.db.setFavorite(e.id, 1);
	  			// add the clicked fav label to the current row
	  			currentRow.add(clickedFav);
	  		});
	        infoLabel.addEventListener('click', function(e){
		    	// create new event detail window
		    	var DetailWindow = require('ui/common/DetailWindow');
		    	
		    	// create new event window
		    	var detail_window = new DetailWindow({
					title: title.text,
					backgroundColor: '#323232',
					related: e.row.related
				});
				
				// open category window
		    	globals.tabs.currentTab.open(detail_window);
				});
				
				// adds labels to the info label to be clickable
				infoLabel.add(icon);
				infoLabel.add(date);
				infoLabel.add(title);
				row.add(favorite);
				row.add(infoLabel);
						
				// push the row
				data.push(row);
	
	
				// the favorite button
				
	
				// @TODO What about classname for row?
				
				// add everything to the row
				
	
			
				// push the row
				
			
				// increment i
				i++;
			}
				table.setData(data);
		}
		

		// set table data
		
	

	//set the table data
	//table.setData(data);
	
	// table event listener
	
	

	// event listener for database update
	Ti.App.addEventListener('dbUpdate', setEventTableData);

	// set table data
	setEventTableData();


	// add table view to window
	instance.add(table);

	// return the table view instance
	return instance;
};
