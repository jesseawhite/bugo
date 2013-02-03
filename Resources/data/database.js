// open or create the database
var db_conn = Ti.Database.open('bugo.sqlite');

var api = {};

/*
* category table is as follows:
*  "id" integer NOT NULL PRIMARY KEY,
*  "title" varchar(50) NOT NULL,
*  "icon" varchar(50) NOT NULL,
*  "enabled" integer NOT NULL
*
* event table is as follows:
* "id" integer NOT NULL PRIMARY KEY,
* "uid" integer unsigned NOT NULL UNIQUE,
* "title" varchar(50) NOT NULL,
* "category_title" varchar(50) NOT NULL REFERENCES "category" ("title"),
* "start_date" datetime NOT NULL,
* "end_date" datetime,
* "bradley_building" varchar(50) NOT NULL,
* "address" varchar(100) NOT NULL,
* "city" varchar(50) NOT NULL,
* "state" varchar(2) NOT NULL,
* "zip" integer unsigned NOT NULL,
* "latitude" real NOT NULL,
* "longitude" real NOT NULL,
* "description" text NOT NULL,
* "sponsores" varchar(200) NOT NULL,
* "cost" varchar(50) NOT NULL,
* "open_to" varchar(30) NOT NULL,
* "facebook_url" varchar(200) NOT NULL,
* "twitter_url" varchar(200) NOT NULL,
* "favorite" integer NOT NULL
* "num_favs" integer NOT NULL
*/
// create category table
try {
	db_conn.execute('CREATE TABLE IF NOT EXISTS category (id integer NOT NULL PRIMARY KEY, uid integer unsigned NOT NULL UNIQUE, title varchar(50) NOT NULL, icon varchar(50) NOT NULL, enabled integer NOT NULL)');
} catch(err) {
	Ti.API.error('Database:Create category: ' + err);
}

// create event table
try {
	db_conn.execute('CREATE TABLE IF NOT EXISTS event (id integer NOT NULL PRIMARY KEY, uid integer unsigned NOT NULL UNIQUE, title varchar(50) NOT NULL, category_title varchar(50) NOT NULL REFERENCES category (title), start_date datetime NOT NULL, end_date datetime, bradley_building varchar(50) NOT NULL, address varchar(100) NOT NULL, city varchar(50) NOT NULL, state varchar(2) NOT NULL, zip integer unsigned NOT NULL, latitude real NOT NULL, longitude real NOT NULL, description text NOT NULL, sponsors varchar(200) NOT NULL, cost varchar(50) NOT NULL, open_to varchar(30) NOT NULL, facebook_url varchar(200) NOT NULL, twitter_url varchar(200) NOT NULL, favorite integer NOT NULL, num_favs integer NOT NULL)');
} catch(err) {
	Ti.API.error('Database:Create event: ' + err);
}

// temporary counter for category uid
var count = 0;

// import category data
var category_list = require('data/categories').categories;

// for each element in categories insert into db
for(var key in category_list) {
	var c = category_list[key];
	var enabled = 1;
	// insert category into db	OR IGNORE
	try {
		db_conn.execute('INSERT OR IGNORE INTO category (uid,title,icon,enabled) VALUES (?,?,?,?)', count, c.name, c.image, enabled);
	} catch(err) {
		Ti.API.error('Database:Insert category: ' + err);
	}
	// increment counter
	count++;
}

// import event data
var event_list = require('data/events').events;

// for each element in categories insert into db
for(var key in event_list) {
	var e = event_list[key];
	
	//Ti.API.info('// DATABASE //');
	Ti.API.info('Insert Event: ' + e.title + ': ' + e.id + ', ' + e.uid + ', ' + e.category_title + ', ' + e.start_date + ', ' + e.end_date + ', ' + e.bradley_building + ', ' + e.address + ', ' + e.city + ', ' + e.state + ', ' + e.zip + ', ' + e.latitude + ', ' + e.longitude + ', ' + e.description + ', ' + e.sponsors + ', ' + e.cost + ', ' + e.open_to + ', ' + e.facebook_url + ', ' + e.twitter_url + ', ' + e.favorite + ',' + e.num_favs);
	
	// insert category into db	OR IGNORE
	try {
		db_conn.execute('INSERT OR IGNORE INTO event (id,uid,title,category_title,start_date,end_date,bradley_building,address,city,state,zip,latitude,longitude,description,sponsors,cost,open_to,facebook_url,twitter_url,favorite,num_favs) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', e.id,e.uid,e.title,e.category_title,e.start_date,e.end_date,e.bradley_building,e.address,e.city,e.state,e.zip,e.latitude,e.longitude,e.description,e.sponsors,e.cost,e.open_to,e.facebook_url,e.twitter_url,e.favorite,e.num_favs);
	} catch(err) {
		Ti.API.error('Database:Insert category: ' + err);
	}
}

/*
 * This function returns the categories.
 * @param all Boolean parameter to return all when true and
 * just enabled when false or empty.
 */
function getCategories(all) {
	// check argument
	if (typeof all == 'undefined') {
		all = false;
	}

	// empty array
	var results = [];

	// create recored set
	var categoryRS;
	if(all) {
		categoryRS = db_conn.execute('SELECT title,icon,enabled FROM category ORDER BY title ASC');
	} else {
		categoryRS = db_conn.execute('SELECT title,icon,enabled FROM category WHERE enabled = "1" ORDER BY title ASC');
	}

	// loop through recored set and trace the contents
	while(categoryRS.isValidRow()) {
		// create category
		var c = {
			title: categoryRS.fieldByName('title'),
			icon: categoryRS.fieldByName('icon'),
			enabled: categoryRS.fieldByName('enabled')
		};

		// push category
		results.push(c);

		// get next record set
		categoryRS.next();
	}
	// close record set
	categoryRS.close();

	// close db
	//db.close();

	// return results
	return results;
}

/*
 * This function returns the events.
 * @param category String filter the results.
 */
function getEvents(category) {
	// empty array
	var results = [];

	// create recored set
	var eventRS;
	
	// check argument
	if (typeof category == 'undefined') {
		//Ti.API.info('// GET ALL EVENTS //');
		eventRS = db_conn.execute('SELECT * FROM event ORDER BY start_date, title ASC');
	}	
	else {//if (typeof category == 'integer') {
		//Ti.API.info('// GET EVENTS FOR ' + category + ' //');
		//eventRS = db_conn.execute('SELECT * FROM event AS e, category AS c WHERE c.title = (?) AND e.category_id = c.id', category);
		eventRS = db_conn.execute('SELECT * FROM category LEFT JOIN event WHERE event.category_title = (?) AND category.title = (?) ORDER BY start_date, title ASC', category, category); // AND category.title = event.category_title
	}
	
	// loop through recored set and trace the contents
	while(eventRS.isValidRow()) {
		// create event
		var e = {
			id: eventRS.fieldByName('id'),
			title: eventRS.fieldByName('title'),
			uid: eventRS.fieldByName('uid'),
			category: eventRS.fieldByName('category_title'),
			icon: '',
			start_date: eventRS.fieldByName('start_date'),
			end_date: eventRS.fieldByName('end_date'),
			building: eventRS.fieldByName('bradley_building'),
			address: eventRS.fieldByName('address'),
			city: eventRS.fieldByName('city'),
			state: eventRS.fieldByName('state'),
			zip: eventRS.fieldByName('zip'),
			latitude: eventRS.fieldByName('latitude'),
			longitude: eventRS.fieldByName('longitude'),
			description: eventRS.fieldByName('description'),
			sponsors: eventRS.fieldByName('sponsors'),
			cost: eventRS.fieldByName('cost'),
			open_to: eventRS.fieldByName('open_to'),
			facebook_url: eventRS.fieldByName('facebook_url'),
			twitter_url: eventRS.fieldByName('twitter_url'),
			favorite: eventRS.fieldByName('favorite'),
			num_favs: eventRS.fieldByName('num_favs')
		};
		
		// get category icon	
		var categoryRS = db_conn.execute('SELECT icon,title FROM category WHERE title = (?)', e.category);
		while(categoryRS.isValidRow()) {
			e.icon = categoryRS.fieldByName('icon');
			categoryRS.next();
		}
			
		// close record set
		categoryRS.close();

		// push category
		results.push(e);

		// get next record set
		eventRS.next();
	}
	// close record set
	eventRS.close();

	// close db
	//db.close();

	// return results
	return results;
}

/*
 * This function returns the events.
 * @param event_id int event id of the event.
 */
function getEvent(event_id) {
	// empty array
	var results = [];

	// create recored set
	var eventRS;
	
	// check argument
	if (typeof event_id == 'undefined') {
		//Ti.API.info('no event id.');
		return results;
	}	
	else {//if (typeof category == 'integer') {
		eventRS = db_conn.execute('SELECT * FROM event WHERE id = (?) ORDER BY start_date, title ASC', event_id);
	}
	
	//Ti.API.info('TESTING: ' + eventRS);
	
	// loop through recored set and trace the contents
	while(eventRS.isValidRow()) {
		// create event
		var e = {
			id: eventRS.fieldByName('id'),
			title: eventRS.fieldByName('title'),
			uid: eventRS.fieldByName('uid'),
			category: eventRS.fieldByName('category_title'),
			icon: '',
			start_date: eventRS.fieldByName('start_date'),
			end_date: eventRS.fieldByName('end_date'),
			building: eventRS.fieldByName('bradley_building'),
			address: eventRS.fieldByName('address'),
			city: eventRS.fieldByName('city'),
			state: eventRS.fieldByName('state'),
			zip: eventRS.fieldByName('zip'),
			latitude: eventRS.fieldByName('latitude'),
			longitude: eventRS.fieldByName('longitude'),
			description: eventRS.fieldByName('description'),
			sponsors: eventRS.fieldByName('sponsors'),
			cost: eventRS.fieldByName('cost'),
			open_to: eventRS.fieldByName('open_to'),
			facebook_url: eventRS.fieldByName('facebook_url'),
			twitter_url: eventRS.fieldByName('twitter_url'),
			favorite: eventRS.fieldByName('favorite'),
			num_favs: eventRS.fieldByName('num_favs')
		};
		
		// get category icon	
		var categoryRS = db_conn.execute('SELECT icon FROM category WHERE title = (?)', e.category);
		while(categoryRS.isValidRow()) {
			e.icon = categoryRS.fieldByName('icon');
			categoryRS.next();
		}
			
		// close record set
		categoryRS.close();

		// push category
		results.push(e);

		// get next record set
		eventRS.next();
	}
	// close record set
	eventRS.close();
	
	// return results
	return results;
}

/*
 * This function returns the favorited events.
 */
function getFavorites() {
	// empty array
	var results = [];

	// create recored set
	var eventRS = db_conn.execute('SELECT * FROM event WHERE favorite = "1"');
	
	// loop through recored set and trace the contents
	while(eventRS.isValidRow()) {
		// create event
		// create event
		var e = {
			id: eventRS.fieldByName('id'),
			title: eventRS.fieldByName('title'),
			uid: eventRS.fieldByName('uid'),
			category: eventRS.fieldByName('category_title'),
			icon: '',
			start_date: eventRS.fieldByName('start_date'),
			end_date: eventRS.fieldByName('end_date'),
			building: eventRS.fieldByName('bradley_building'),
			address: eventRS.fieldByName('address'),
			city: eventRS.fieldByName('city'),
			state: eventRS.fieldByName('state'),
			zip: eventRS.fieldByName('zip'),
			latitude: eventRS.fieldByName('latitude'),
			longitude: eventRS.fieldByName('longitude'),
			description: eventRS.fieldByName('description'),
			sponsors: eventRS.fieldByName('sponsors'),
			cost: eventRS.fieldByName('cost'),
			open_to: eventRS.fieldByName('open_to'),
			facebook_url: eventRS.fieldByName('facebook_url'),
			twitter_url: eventRS.fieldByName('twitter_url'),
			favorite: eventRS.fieldByName('favorite'),
			num_favs: eventRS.fieldByName('num_favs')
		};
			
		var categoryRS = db_conn.execute('SELECT icon,title FROM category WHERE title = (?)', e.category);
			
		while(categoryRS.isValidRow()) {
			e.icon = categoryRS.fieldByName('icon');
			categoryRS.next();
		}
			
		// close record set
		categoryRS.close();		

		// push category
		results.push(e);

		// get next record set
		eventRS.next();
	}
	// close record set
	eventRS.close();

	// close db
	//db.close();

	// return results
	return results;
}

/*
 * This function sets an events favorite.
 * @param event_id Integer id of the event to be set.
 * @param is_favorite Boolean set event as favorite or not.
 */
function setFavorite(event_id, is_favorite) {
	var set_as;
	if (is_favorite) {
		set_as = 1;
		Ti.API.debug('Set as: ' + set_as);
	}
	else {
		set_as = 0;
	}
	
	try {
		db_conn.execute('UPDATE event SET favorite = (?) WHERE id = (?)', set_as, event_id);
	}
	catch(err) {
		Ti.API.error('Database:Set Favorite: ' + err);
	}
	
	//Dispatch an event to alert that the database has been updated
	Ti.App.fireEvent('dbUpdate');
}

/*
 * This function gets an event favorite.
 * @param event_id Integer id of the event to be set.
 */
function getFavorite(event_id) {
	var eventRS;
	
	try {
		eventRS = db_conn.execute('SELECT favorite FROM event WHERE id = (?)', event_id);
	}
	catch(err) {
		Ti.API.error('Database:Get Favorite: ' + err);
	}
	
	var result = (eventRS.fieldByName('favorite')) ? 1:0;
	
	//Ti.API.info("result: " + result);
	
	return result;
}

// add methods
api.getCategories = getCategories;
api.getEvents = getEvents;
api.getEvent = getEvent;
api.getFavorites = getFavorites;
api.setFavorite = setFavorite;
api.getFavorite = getFavorite;

// public interface
exports.api = api;

/*

 // open or create the database
 var db = Ti.Database.open('bugo.sqlite');

 // local debug
 var debug = true;

 /*
 * This function will created the event table.
 *
 * category table is as follows:
 *  "id" integer NOT NULL PRIMARY KEY,
 *  "title" varchar(50) NOT NULL,
 *  "icon" varchar(50) NOT NULL,
 *  "enabled" integer NOT NULL
 *
 * event table is as follows:
 * "id" integer NOT NULL PRIMARY KEY,
 * "uid" integer unsigned NOT NULL UNIQUE,
 * "title" varchar(50) NOT NULL,
 *  "category_id" integer NOT NULL REFERENCES "category" ("id"),
 * "start_date" datetime NOT NULL,
 * "end_date" datetime,
 * "bradley_building" varchar(50) NOT NULL,
 * "address" varchar(100) NOT NULL,
 * "city" varchar(50) NOT NULL,
 * "state" varchar(2) NOT NULL,
 * "zip" integer unsigned NOT NULL,
 * "latitude" real NOT NULL,
 * "longitude" real NOT NULL,
 * "description" text NOT NULL,
 * "sponsores" varchar(200) NOT NULL,
 * "cost" real NOT NULL,
 * "open_to" varchar(30) NOT NULL,
 * "facebook_url" varchar(200) NOT NULL,
 * "twitter_url" varchar(200) NOT NULL,
 * "favorite" integer NOT NULL
 *
 *
 function CreateTables() {
 if(debug)
 Ti.API.debug("//DB : CREATE");

 // create category table
 try {
 db.execute('CREATE TABLE IF NOT EXISTS category (id integer NOT NULL PRIMARY KEY, uid integer unsigned NOT NULL UNIQUE, title varchar(50) NOT NULL, icon varchar(50) NOT NULL, enabled integer NOT NULL)');
 } catch(err) {
 Ti.API.error('Database:CreateTables:Create category: ' + err);
 }

 // create event table
 try {
 db.execute('CREATE TABLE IF NOT EXISTS event (id integer NOT NULL PRIMARY KEY, uid integer unsigned NOT NULL UNIQUE, title varchar(50) NOT NULL, category_id integer NOT NULL REFERENCES category (id), start_date datetime NOT NULL, end_date datetime, bradley_building varchar(50) NOT NULL, address varchar(100) NOT NULL, city varchar(50) NOT NULL, state varchar(2) NOT NULL, zip integer unsigned NOT NULL, latitude real NOT NULL, longitude real NOT NULL, description text NOT NULL, sponsores varchar(200) NOT NULL, cost real NOT NULL, open_to varchar(30) NOT NULL, facebook_url varchar(200) NOT NULL, twitter_url varchar(200) NOT NULL, favorite integer NOT NULL)');
 } catch(err) {
 Ti.API.error('Database:CreateTables:Create event: ' + err);
 }

 // close db
 db.close();
 }

 /*
 * This function will destroy the category and event
 * tables in the database use with caution.
 *
 function DestroyTables() {
 if(debug)
 Ti.API.debug("//DB : DESTROY");

 // destroy category table
 try {
 db.execute('DROP TABLE IF EXISTS category');
 } catch(err) {
 Ti.API.error('Database:DestroyTables:Drop category: ' + err);
 }
 // destroy event table
 try {
 db.execute('DROP TABLE IF EXISTS event');
 } catch(err) {
 Ti.API.error('Database:DestroyTables:Drop event: ' + err);
 }
 }

 /*
 * This function populates the category table from
 * categoryData.js.
 *
 function PopulateCategories() {
 if(debug)
 Ti.API.debug("//DB : POPULATE");

 // temporary counter for category uid
 var count = 0;

 // for each element in categoryData insert into db
 for(var key in globals.categoryData) {
 var c = globals.categoryData[key];
 var enabled = 1;
 Ti.API.info('Inserting the following:\n\t' + c.name + ' ' + c.image + ' ' + enabled);
 // insert category into db	OR IGNORE
 try {
 db.execute('INSERT INTO category (uid,title,icon,enabled) VALUES (?,?,?,?)', count, c.name, c.image, enabled);
 } catch(err) {
 Ti.API.error('Database:PopulateCategories:Drop event: ' + err);
 }
 // increment counter
 count = count + 1;
 }
 // close db
 db.close();
 }

 /*
 * This function is just a test.  It should print all the
 * available categories.
 *
 function Test() {
 if(debug)
 Ti.API.debug("//DB : TEST");

 // create recored set
 var categoryRS = db.execute('SELECT title,icon,enabled FROM category');

 Ti.API.info('RS: ' + categoryRS.toString());

 // loop through recored set and trace the contents
 while(categoryRS.isValidRow()) {
 var cTitle = categoryRS.fieldByName('title');
 var cIcon = categoryRS.fieldByName('icon');
 var cEnabled = categoryRS.fieldByName('enabled');
 Ti.API.info('Received:\n\t' + cTitle + ' ' + cIcon + ' ' + cEnabled);
 categoryRS.next();
 }
 // close record set
 categoryRS.close();

 // close db
 db.close();
 }

 /*
 * This function returns the categories.
 * @param all Boolean parameter to return all when true and
 * just enabled when false or empty.
 *
 function GetCategories(all) {
 if(debug)
 Ti.API.debug("//DB : CAT");

 // check argument
 if( typeof all == 'undefined') {
 all = false;
 }

 // empty array
 var results = [];

 // create recored set
 var categoryRS;
 if(all) {
 categoryRS = db.execute('SELECT title,icon,enabled FROM category');
 } else {
 categoryRS = db.execute('SELECT title,icon,enabled FROM category WHERE enabled = "1"');
 }

 // output size of record set
 //Ti.API.info('RS Size: ' + categoryRS.length());

 // loop through recored set and trace the contents
 while(categoryRS.isValidRow()) {
 var cTitle = categoryRS.fieldByName('title');
 var cIcon = categoryRS.fieldByName('icon');
 var cEnabled = categoryRS.fieldByName('enabled');

 // create category
 var category = {
 title : cTitle.toString(),
 icon : cIcon.toString(),
 enabled : cEnabled
 };

 // push category
 results.push(category);

 Ti.API.info('Received:\n\t' + cTitle + ' ' + cIcon);

 // get next record set
 categoryRS.next();
 }
 // close record set
 categoryRS.close();

 // close db
 db.close();

 // return results
 return results;
 }

 /*
 * This function disalbes or enables a category.
 * @param category Category name to update.
 * @param enable Boolean to enable or disable.
 *
 function SetCategory(category, enable) {
 // update category
 try {
 db.execute('UPDATE category (title,enabled) VALUES (?,?) WHERE title = (?)', category, enable, category);
 } catch(err) {
 Ti.API.error('Database:UpdateCategory:Set category: ' + err);
 }

 // close db
 db.close();
 }

 /*
 * This function returns a boolean if a specifc
 * category is enabled or not.
 * @param category Category to check.
 *
 function GetCategory(category) {
 var result = true;
 var categoryRS;

 // update category
 try {
 categoryRS = db.execute('SELECT (enabled) FROM category WHERE title = (?)', category);
 } catch(err) {
 Ti.API.error('Database:UpdateCategory:Get category: ' + err);
 }

 while(categoryRS.isValidRow()) {
 if(categoryRS.fieldByName('enabled') == 1) {
 result = true;
 } else {
 result = false;
 }
 }

 // close db
 db.close();

 // return result
 return result;
 }

 /*
 * This function initailizes the database.
 *
 function Init() {
 if(debug)
 Ti.API.debug("//DB : INIT");

 //DestroyTables();
 //CreateTables();
 PopulateCategories();
 //Test();
 }

 // public interface
 exports.Test = Test;
 exports.Init = Init;
 exports.GetCategories = GetCategories;
 exports.SetCategory = SetCategory;
 exports.GetCategory = GetCategory;
 */