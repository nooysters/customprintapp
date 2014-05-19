'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Customproduct = new Module('Customproduct');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Customproduct.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Customproduct.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Customproduct.menus.add({
        title: 'Admin Products',
        link: 'all products',
        roles: ['administrator'],
        menu: 'main'
    });
    Customproduct.menus.add({
        title: 'Create Product',
        link: 'create product',
        menu: 'main'
    });
    Customproduct.menus.add({
        title: 'My Products',
        link: 'create product',
        menu: 'main'
    });
    Customproduct.menus.add({
        title: 'Upload',
        link: 'upload',
        menu: 'main'
    });
    /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Customproduct.settings({
	'someSetting': 'some value'
    }, function(err, settings) {
	//you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Customproduct.settings({
	'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Customproduct.settings(function(err, settings) {
	//you now have the settings object
    });
    */
   Customproduct.aggregateAsset('css', 'customproduct.css');
    
    return Customproduct;
});