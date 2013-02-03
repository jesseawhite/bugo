exports.CategoriesWindow = function(args) {
	// create window instance
	var instance = Ti.UI.createWindow(args);
	
	// create the table view
	var table = Ti.UI.createTableView();
	
	// table event listener
	table.addEventListener('click', function(e){
    	// create new category window
    	var EventsWindow = require('ui/common/EventsWindow');
    	//var category_window = Ti.UI.createWindow({	
		var category_window = new EventsWindow({
			title: e.rowData.title,
			backgroundColor: 'white',
			category: e.rowData.title
		});
		
		// open category window
    	globals.tabs.currentTab.open(category_window);
	});

	function setCategoryTableData() {
		//Ti.API.info("Set Category Table Data");
		
		// empty array
		var data = [];
	
		// get enalbed categories, pass false as in all=false
		var categories = new globals.db.getCategories(false);
	
		// loop through categories and build rows
		for (var key in categories) {
			var c = categories[key];
			var rowdata = {
				title: c.title,
				leftImage: c.icon,
				color: 'black',
				hasChild:true,
				className: 'category_row'
			}
		
			// push the row
			data.push(rowdata);
		}
	
		// set the table data
		table.setData(data);
	}
	
	// set table data
	setCategoryTableData();
	
	// event listener for database update
	Ti.App.addEventListener('dbUpdate', setCategoryTableData);
		
	// add table view to window
	instance.add(table);
	
	// return the table view instance
	return instance;
};