exports.SettingsWindow = function(args) {
	// create window instance
	var instance = Ti.UI.createWindow(args);
	
	// create the table view
	var table = Ti.UI.createTableView({
		style: Ti.UI.iPhone.TableViewStyle.GROUPED,
		backgroundColor: '#e2e2e2'
	});
		
	// create categories section
	var category_section = Ti.UI.createTableViewSection();

	// creates custom header for iOS devices
	if (globals.osname == 'ipod' || globals.osname == 'iphone'){
		
		// creates new view
		var customView = Ti.UI.createView({height:'auto'});
 
 		// Customize Header
		var customHeader = Ti.UI.createLabel({
    		top:10, bottom:10, left:19, right:19,
    		height:'auto',
    		text:'Categories Filter',
    		font:{fontSize:17, fontWeight:'bold'},
    		color:'#444',
    		shadowColor:'#FAFAFA',
    		shadowOffset:{x:0, y:1}
		});
		
		// add header to new view
		customView.add(customHeader);
		
		// places custom header in section
		category_section.headerView = customView;
	}
	
	//fallback for Android
	else {
		category_section.headerTitle = "Categories Filter";
	}

	// get all categories
	var categories = new globals.db.getCategories(true);
	
	// loop through categories and build rows
	for (var key in categories) {
		var c = categories[key];
		
		// create row
		var row = Ti.UI.createTableViewRow({
			leftImage: c.icon,
			backgroundColor: 'white'
		});
		
		// create label
		var catLabel = Ti.UI.createLabel({
			text: c.title,
			color: 'black',
			textAlign: 'left',
			left: 45
		});
		
		// check if switch should be enabled
		var enabled;
		if (c.enabled == 1) {
			enabled = true;
		}
		else {
			enabled = false;
		}
		
		// create switch
		var toggle = Ti.UI.createSwitch({
			value: enabled,
			right: 10,
		});
		
		//Makes the Switches into toggle checkboxes for Android
		if (globals.osname == 'android'){
			toggle.style = Ti.UI.Android.SWITCH_STYLE_CHECKBOX;
		};
		
		// add switch
		row.add(toggle);
		
		//add label
		row.add(catLabel);
		
		// add class name
		row.className = 'setting_row';
		
		// add row
		category_section.add(row);
	}
	
	// create credits section
	var credits_section = Ti.UI.createTableViewSection();
	
	// creates custom header for iOS devices
	if (globals.osname == 'ipod' || globals.osname == 'iphone'){
		
		// create new view
		var customView = Ti.UI.createView({height:'auto'});
 
 		// Customize Header
		var customHeader = Ti.UI.createLabel({
    		top:10, bottom:10, left:19, right:19,
    		height:'auto',
    		text:'BUGO was created by:',
    		font:{fontSize:17, fontWeight:'bold'},
    		color:'#444',
    		shadowColor:'#FAFAFA',
    		shadowOffset:{x:0, y:1}
		});
		
		// add custom header to new view
		customView.add(customHeader);
		
		// places custom header in section
		credits_section.headerView = customView;
	}
	
	//fallback for Android
	else {
		credits_section.headerTitle = "BUGO was created by:";
	}
	
	//create update row
	var cRow = Ti.UI.createTableViewRow({
		backgroundColor: '#e2e2e2',
		height: 140
	});
	
	// create name labels
	var eric = Ti.UI.createLabel({
		text: 'Eric Adams',
		color: 'black',
		textAlign: 'left',
		left: 10,
		top: -100,
	});
	
	var david = Ti.UI.createLabel({
		text: 'David Broughton',
		color: 'black',
		textAlign: 'left',
		left: 10,
		top: -60
	});
	
	var andrew = Ti.UI.createLabel({
		text: 'Andrew Howell',
		color: 'black',
		textAlign: 'left',
		left: 10,
		top: -20
	});
	
	var matt = Ti.UI.createLabel({
		text: 'Matt Nelson',
		color: 'black',
		textAlign: 'left',
		left: 10,
		top: 20
	});
	
	var mark = Ti.UI.createLabel({
		text: 'Mark Phan',
		color: 'black',
		textAlign: 'left',
		left: 10,
		top: 60
	});
	
	var jesse = Ti.UI.createLabel({
		text: 'Jesse White',
		color: 'black',
		textAlign: 'left',
		left: 10,
		top: 100
	});
	
	// conditional spacing for Android	
	if(globals.osname == 'android'){
		eric.top = 0;
		david.top = 20;
		andrew.top = 40;
		matt.top = 60;
		mark.top = 80;
		jesse.top = 100;
	}
	
	// add labels
	cRow.add(eric);
	cRow.add(david);
	cRow.add(andrew);
	cRow.add(matt);
	cRow.add(mark);
	cRow.add(jesse);
	
	// add class name
	cRow.className = 'settings_row';
		
	//add row
	credits_section.add(cRow);
	
	var aRow = Ti.UI.createTableViewRow({
		backgroundColor: '#e2e2e2',
		height: 100,
	});
	
	var about = Ti.UI.createLabel ({
		text: "BUGO was created by Bradley University students.\nThe project was started in the Fall of 2011.",
		color: 'black',
		textAlign: 'left',
		left: 10
	});
	
	aRow.className = 'settings_row';
	
	aRow.add(about);
	
	credits_section.add(aRow);
	
	// set table data
	table.setData([category_section, credits_section]);
	
	/*
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
	*/

	// add table view to window
	instance.add(table);
	
	
	// return the table view instance
	return instance;
};