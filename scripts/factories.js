'use strict';

// Create controllers for application
angular.module('a11yTicketApp')

    // retrieve tickets from Firebase database
    .factory('Tickets', function (fbURL, $firebase) {
        return $firebase(new Firebase(fbURL)).$asArray();
    })

    // Store and and queue flash messages used on save and create
    .factory("Flash", function($rootScope) {
        var queue = [];
        var currentMessage = "";
        $rootScope.flashMsg = currentMessage;

        $rootScope.$on("$viewContentLoaded", function() {
            currentMessage = queue.shift() || "";
        });

        return {
            setMessage: function(message) {
                queue.push(message);
                $rootScope.flashMsg = message
            },
            getMessage: function() {
                return currentMessage;
            },
            clearMessage: function($event) {
                currentMessage = "";
                $rootScope.flashMsg = "";
                $event.preventDefault();
                $('h1').attr("tabIndex",-1).focus();
            }
        };
    })

    // Values used in forms for severity levels
    .factory('genres', function() {
        return {"severityList": [
            {'value':'Action'     ,'level':'Action'},
            {'value':'Comedy'     ,'level':'Comedy'},
            {'value':'Suspense'   ,'level':'Suspense'},
            {'value':'Biography'  ,'level':'Biography'},
            {'value':'Horror'     ,'level':'Horror'}
        ]};
    })

    // Values used in forms for WCAG Success Criteria
    .factory('country', function() {
        return {"wcagSCList": [
            {'value':'India'    , 'criterion':'Hindi'},
            {'value':'USA'  , 'criterion':'English'},
            {'value':'UK'    , 'criterion':'English'},
            {'value':'China'  , 'criterion':'Chinese'},
            {'value':'Japan'  , 'criterion':'Japanese'},
            {'value':'Russia'  , 'criterion':'Russian'},
            {'value':'Israel'  , 'criterion':'Hebrew'},
            {'value':'France'  , 'criterion':'French'},
            {'value':'Spain'  ,  'criterion':'Spanish'},
            {'value':'Germany'  ,  'criterion':'German'},
            {'value':'Brazil'  ,  'criterion':'Portugese'},
            {'value':'India'  ,  'criterion':'English'},
            {'value':'India'   , 'criterion':  'Marathi'},
            {'value':'India'  ,  'criterion':'Kannada'},
            {'value':'India'  ,  'criterion':'Tamil'},
            {'value':'India'  , 'criterion': 'Telugu'}
        ]};
    });