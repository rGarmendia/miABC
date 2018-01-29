// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;
angular.module('starter', ['ionic','ngCordova','starter.services','starter.controllers'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
      
    }
    if(window.cordova) {
     
      if (db === null){
      
        db = window.sqlitePlugin.openDatabase( {name: "abc.db", createFromLocation: 1} );
  
          
      }else {
      
        db = $cordovaSQLite.openDB("abc.db");
          
      }
      
    } else {
      
      db = window.openDatabase("abc.db", "1.0", "My app", -1);
      
    }
  });
})
// States 

 .config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('app.palabras', {
    url: '/palabras',
    views: {
      'menuContent': {
        templateUrl: 'templates/palabras.html'
      }
    }
  })
  
  .state('app.vocales', {
    url: '/vocales',
    views: {
      'menuContent': {
        templateUrl: 'templates/vocales.html',
        controller: 'LettersCtrl'
      }
    }
  })
  
  .state('app.sonidos', {
    url: '/sonidos',
    views: {
      'menuContent': {
        templateUrl: 'templates/sonidos.html'
      }
    }
  })
  
  .state('app.simples', {
    url: '/simples',
    views: {
      'menuContent': {
        templateUrl: 'templates/sonidosimples.html',
        controller: 'SoundsCtrl'
      }
    }
  })
  .state('app.compuestos', {
    url: '/compuestos',
    views: {
      'menuContent': {
        templateUrl: 'templates/sonidoscompuestos.html',
        controller: 'SoundsCompCtrl'
      }
    }
  })
  .state('app.simple', {
      cache: false,
      url: '/simples/:simpleId',
      views: {
        'menuContent': {
          templateUrl: 'templates/detallesimples.html',
          controller: 'SoundsSimpleCtrl'
        }
      }
    })
  .state('app.compuesto', {
      cache: false,
      url: '/compuestos/:compuestoId',
      views: {
        'menuContent': {
          templateUrl: 'templates/detallecompuestos.html',
          controller: 'SoundsCompuestoCtrl'
          
        }
      }
    })
    
    .state('app.editSimple', {
      url: '/editSimple/:sencilloId',
      views: {
        'menuContent': {
          templateUrl: 'templates/editSimples.html',
          controller: 'SoundsSimpleEditCtrl'
        }
      }
    })
    
    .state('app.editCompuesto', {
      url: '/editSimple/:compId',
      views: {
        'menuContent': {
          templateUrl: 'templates/editCompuestos.html',
          controller: 'SoundsCompEditCtrl'
        }
      }
    })

  .state('app.numeros', {
    url: '/numeros',
    views: {
      'menuContent': {
        templateUrl: 'templates/numeros.html',
        controller: 'LettersCtrl'
      }
    }
  })

  .state('app.completar', {
      url: '/completar',
      views: {
        'menuContent': {
          templateUrl: 'templates/completar.html'
        }
      }
    })

  .state('app.inicio', {
      url: '/inicio',
      views: {
        'menuContent': {
          templateUrl: 'templates/inicio.html'
        }
      }
    })

  .state('app.letras', {
    url: '/letras',
    views: {
      'menuContent': {
        templateUrl: 'templates/letras.html',
        controller: 'LettersCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/inicio');

});