#!/bin/env node
var express = require('express');
var fs      = require('fs');
var path = require('path')

/**
 *  Define the application.
 */
var FlashLearn = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.port = process.env.PORT || 3000;
    };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = {};

        self.routes['/'] = function(req, res) {
            res.sendFile(__dirname + '/views/index.html');
        };
        self.routes['/cards'] = function(req, res) {
            res.sendFile(__dirname + '/views/cards.html');
        };
        self.routes['/new'] = function(req, res) {
            res.sendFile(__dirname + '/views/new.html');
        };
        //Returns all the different catogories each with its own info in format: [{name:"cat1", image:"cat1Url", subs:["cat1sub1","cat1sub2"]}]
        self.routes['/catagories'] = function(req, res) {
            res.send([{name: "Math", image: "./images/math.gif", subs: ["Calculus","Trig"]}, {name: "History", image: "./images/history.gif", subs: ["World War 2","American History"]},{name: "Geography", image: "./images/geo.gif", subs: ["Techtonics","Mountain Ranges"]},{name: "Chemistry", image: "./images/chem.gif", subs: ["Organic Chemistry","Bio Chemistry","Electro Chemistry"]}]);
        };
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express();
        self.app.use(express.static(path.join(__dirname, 'static')));
        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
        for (var p in self.posts) {
            self.app.post(p, self.posts[r]);
        }
    };


    /**
     *  Initializes the application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port,  function() {
            console.log('%s: Node server started on port: %d ...',
                        Date(Date.now() ), self.port);
        });
    };

};   /*  Application.  */



/**
 *  main():  Main code.
 */
var zapp = new FlashLearn();
zapp.initialize();
zapp.start();

