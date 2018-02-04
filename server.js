// ====================== //
// ====================== //
// == EXPRESS NODE APP == //
// ====================== //
// ====================== //
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


	// ==================== //
	// == EXPRESS SERVER == //
	// ==================== //
  var app = express();
  app.disable('etag');//==== avoid 304 status ====//

  // ======================= //
  // == TEMPLATE PARTIALS == //
  // ======================= //
  hbs.registerPartials(__dirname + '/views/partials')

  // ====================== //
  // == TEMPLATE HELPERS == //
  // ====================== //
  hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
  })
  hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
  })


  // ================ //
	// == MIDDLEWARE == //
	// ================ //

  //***********//
  //**** 1 ****//
  //***********//
  app.set('view engine', 'hbs');

  //***********//
  //**** 2 ****//
  //***********//
  app.use(express.static(__dirname + '/public/html'));

  //***********//
  //**** 3 ****//
  //***********//
  app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `\n****** HELLO FROM MIDDLEWARE ${now} || ${request.method} || ${request.url} *****\n`;
    console.log(log);
    fs.appendFile('public/logs/server.log', log, (err) => {
      if (err) {
        console.log('\n****** UNABLE TO  FETCH SERVER  *****\n');
      }
    });
    next();//=== TO KEEP THE FLOW OF THE WHOLE APP RUNNING.
  });

  //************//
  //**** 4 ****//
  //***********//
  /*
  app.use((request, response, next) => {
    response.render('maintenance.hbs');
  });
  */

  // ===================== //
	// ==   ROOT ROUTES   == //
	// ===================== //
  app.get('/', (request, response) => {
    // *************** //
    response.render('home.hbs',{
      pageTitle: 'HOME PAGE',
      welcomeMessage: 'WELCOME HOME =D'
    });
    // *************** //
  });


  // ================== //
	// == ABOUT ROUTES == //
	// ================== //
  app.get('/about', (request, response) => {
    // *************** //
    response.render('about.hbs',{
      pageTitle: 'ABOUT PAGE'
    });
    // *************** //
  });

  // =================== //
	// == ERROR ROUTES == //
	// ================== //
  app.get('/error', (request, response) => {
    // *************** //
    response.send({
      errorMessage: 'SOMETHING OCCURR'
    });
    // *************** //
  });

  // =================== //
	// == EXPRESS START == //
	// =================== //
     app.listen(3000, () => {
       console.log('\n***** CONSOLE UP AND RUNNING ON 3000 *****\n')
     });
// ====================== //
// ====================== //
