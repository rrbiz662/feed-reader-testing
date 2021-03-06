/*
*feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/*
* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function(){
    /*
    * This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function(){
        /*
        * This is our first test - it tests to make sure that the
        * allFeeds variable has been defined and that it is not
        * empty. Experiment with this before you get started on
        * the rest of this project. What happens when you change
        * allFeeds in app.js to be an empty array and refresh the
        * page?
        */
        it('are defined', function(){
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * Test that loops through each
         * feed in the allFeeds object and ensures it has URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function(){
            let hasURL = true;

            for (let i = 0; i < allFeeds.length; i++){
                const element = allFeeds[i];

                if (element.url === undefined || element.url === '') {
                    hasURL = false;
                    break;
                }
            }

            expect(hasURL).toBe(true);
        });

        /*
        * Test that loops through each feed
        * in the allFeeds object and ensures it has a name defined
        * and that the name is not empty.
        */
        it('have names', function(){
            let hasName = true;

            for (let i = 0; i < allFeeds.length; i++) {
                const element = allFeeds[i];

                if (element.name === undefined || element.name === '') {
                    hasName = false;
                    break;
                }
            }

            expect(hasName).toBe(true);
        });
    });

    /**
     * Test suite for the blog menu.
     */
    describe('The Menu', function(){
        let menuHide = document.getElementsByTagName('body')[0].className;

        /*
        * Test that ensures the menu element is
        * hidden by default.
        */
        it('is hidden', function(){
            expect(menuHide).toBe('menu-hidden');
        });

        /*
        * Test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('is changing visibility', function(){
            const menuEle = document.getElementsByClassName('menu-icon-link')[0];

            if (menuHide === "menu-hidden"){
                // Make sure the menu is unhidden on the first click.
                menuEle.click();
                menuHide = document.getElementsByTagName('body')[0].className;
                expect(menuHide).toBe('');

                // Make sure the menu is re-hidden on the second click.
                menuEle.click();
                menuHide = document.getElementsByTagName('body')[0].className;
                expect(menuHide).toBe('menu-hidden');

            }
            else{
                // Make sure the menu is hidden on the first click.
                menuEle.click();
                menuHide = document.getElementsByTagName('body')[0].className;
                expect(menuHide).toBe('menu-hidden');

                // Make sure the menu is unhidden on the second click.
                menuEle.click();
                menuHide = document.getElementsByTagName('body')[0].className;
                expect(menuHide).toBe('');
            }
        });
    });

    /**
     * Test suite for the initial feed entries.
     */
    describe('Initial Entries', function(){
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        /*
        * Test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        */
        it('has entries', function(done){
            const feedEle = document.getElementsByClassName('feed')[0];
            const feedCount = feedEle.getElementsByTagName('a').length;

            expect(feedCount).toBeGreaterThan(0);
            done();
        });
    });

    /**
     * Test suite for new feed selection.
     */
    describe('New Feed Selection', function(){
        const initFeed = [];
        const feedEle = document.getElementsByClassName('feed')[0];

        beforeEach(function(done){
            const feed = feedEle.getElementsByTagName('h2');

            // Build initial feed array.
            for (let i = 0; i < feed.length; i++){
                const element = feed[i];
                initFeed.push(element.textContent);
            }

            // Force a feed selection.
            loadFeed(1, function(){
                done();
            });
        });

        /**
         * Test that ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes.
         */
        it('content changed', function(done){
            const feed = feedEle.getElementsByTagName('h2');
            const currentFeed = [];

            // Build current feed array.
            for (let i = 0; i < feed.length; i++){
                const element = feed[i];
                currentFeed.push(element.textContent);
            }

            expect(initFeed).not.toEqual(currentFeed);
            done();
        });
    });
}());
