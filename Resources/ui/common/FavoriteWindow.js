exports.FavoriteWindow = function(args) {
	// create window instance
	var instance = Ti.UI.createWindow(args);
	
	// create the table view
	var table = Ti.UI.createTableView();

	// table event listener
	table.addEventListener('click', function(e){
    	// create new event detail window
    	var EventWindow = require('ui/common/DetailWindow');
    	
    	// create new event window
    	var event_window = new EventWindow({
			title: e.rowData.title,
			backgroundColor: '#323232',
			related: e.rowData.related
		});
		
		// open category window
    	globals.tabs.currentTab.open(event_window);
	});
	
	function setFavoriteTableData() {
		//Ti.API.info("Set Favorite Table Data");
		
		// empty array
		var data = [];
	
		// get events
		var events = new globals.db.getFavorites();
	
		// loop through events and build rows
		for (var key in events) {
			var e = events[key];
			var rowdata = {
				title: e.title,
				leftImage: e.icon,
				color: 'black',
				hasChild: true,
				related: e
			}
		
			// push the row
			data.push(rowdata);
		}
	
		// set table data
		table.setData(data);
	}
	
	// add event listener for database update
	Ti.App.addEventListener('dbUpdate', setFavoriteTableData);
	
	// set table data
	setFavoriteTableData();
	
	// add table view to window
	instance.add(table);
	
	// return the table view instance
	return instance;
};