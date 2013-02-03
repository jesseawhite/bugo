// add a "require" function to the global scope (global object) which is smarter
// http://en.wikipedia.org/wiki/Monkey_patch
require('lib/require_patch').monkeypatch(this);

//add a single variable to the global scope to which we may choose to
//intentionally add items to
var globals = {
	osname: Ti.Platform.osname,
	db: require('data/database').api,
};

//create a private scope to prevent further polluting the global object
(function() {
	// create tab group and windows
	var AppTabGroup = require('ui/common/AppTabGroup');
	var EventWindow = require('ui/common/DetailWindow');
	var EventsWindow,
		CategoriesWindow,
		MapWindow,
		FavoritesWindow,
		SettingsWindow;
	
	// ipad
	if (globals.osname == 'ipad') {
		Ti.API.info('\niPad\n');
		EventsWindow = require('ui/common/EventsWindow');
		CategoriesWindow = require('ui/common/CategoriesWindow');
		MapWindow = require('ui/common/MapWindow');
		FavoritesWindow = require('ui/common/FavoriteWindow');
		SettingsWindow = require('ui/common/SettingsWindow');
	}
	// iphone
	else if (globals.osname == 'iphone') {
		Ti.API.info('\niPhone\n');
		EventsWindow = require('ui/common/EventsWindow');
		CategoriesWindow = require('ui/common/CategoriesWindow');
		MapWindow = require('ui/common/MapWindow');
		FavoritesWindow = require('ui/common/FavoriteWindow');
		SettingsWindow = require('ui/common/SettingsWindow');
	}
	// android
	else {
		Ti.API.info('\nAndroid\n');
		EventsWindow = require('ui/common/EventsWindow');
		CategoriesWindow = require('ui/common/CategoriesWindow');
		MapWindow = require('ui/common/MapWindow');
		FavoritesWindow = require('ui/common/FavoriteWindow');
		SettingsWindow = require('ui/common/SettingsWindow');
	}
	
	//create our global tab group	
	globals.tabs = new AppTabGroup(
		{
			//title: 'Home',
			icon: 'images/icons/home_nav.png',
			window: new EventsWindow({title:'Events', barColor: '#e60000', backgroundColor:'white'})
		},
		{
			//title: 'Categories',
			icon: 'images/icons/list_nav.png',
			window: new CategoriesWindow({title:'Categories', barColor: '#e60000', backgroundColor:'white'})
		},
		{
			//title: 'Map',
			icon: 'images/icons/map_nav.png',
			window: new MapWindow({title:'Map', barColor: '#e60000', backgroundColor:'white'})
		},
		{
			//title: 'Favorites',
			icon: 'images/icons/star_nav.png',
			window: new FavoritesWindow({title:'Favorites', barColor: '#e60000', backgroundColor:'white'})
		},
		{
			//title: 'Settings',
			icon: 'images/icons/settings_nav.png',
			window: new SettingsWindow({title:'Settings', barColor: '#e60000', backgroundColor:'white'})
		}
	);
	
	// open tab group
	globals.tabs.open();
})();