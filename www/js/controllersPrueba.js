angular.module('starter.controllers', [])

.directive('repeatDone', function () {
   return function (scope, element, attrs) {
     if (scope.$last) { // all are rendered
       scope.$eval(attrs.repeatDone);
     }
   }
})

.controller("mediaCtrl", function($scope,$ionicPlatform, $cordovaMedia, $ionicLoading) {
 $ionicPlatform.ready(function(){
    $scope.play = function(src) {
        var media = $cordovaMedia.newMedia(src);
        //var media = new Media(src, null, null, mediaStatusCallback);
        media.play();
        //$cordovaMedia.play(media);
    }
 
    var mediaStatusCallback = function(status) {
        if(status == 1) {
            $ionicLoading.show({template: 'Loading...'});
        } else {
            $ionicLoading.hide();
        }
    }
    $scope.slideHasChanged = function(src,srcdos){
        
        if (srcdos == null){
            $scope.play(src);
//        $scope.$on('$ionicView.enter', function(){
//            $scope.play('/android_asset/www/raw/'+valor+'.mp3');
//            //console.log('Cargado...');
//        });
        }else {
            $scope.play(srcdos);
        }
       
     }
     
     
 })
    
    
})

.controller('AppCtrl', function($scope, $ionicPopover) {
 
   $ionicPopover.fromTemplateUrl('templates/popup.html', {
    scope: $scope,
}).then(function(popover) {
    $scope.popover = popover;
});
  
  $scope.show = function($event) {
    $scope.popover.show($event);
 };
})

.controller('LettersCtrl', function($scope, Letters, $filter) {
  $scope.letters = [];
  $scope.letters = null;
  $scope.numbers = [];
  $scope.numbers = null;
  $scope.vocals  =  [];
  $scope.vocals  = null;
  $scope.items = [];
  $scope.itemsdos = [];
  $scope.temp = [];
  $scope.updateLetter = function() {
    Letters.all().then(function(letter){
      $scope.letters = letter;
      for(var i=0; i<letter.length;i++){
          $scope.items[i] = {
            'color': ('#'+Math.floor(Math.random()*16777215).toString(16)),
            'mintitle': $filter('lowercase')($scope.letters[i].title)
          };
        };
    });
  };
  
  $scope.updateNumber = function() {
    Letters.allNumbers().then(function(number){
       $scope.numbers = number;
     });
  };
  
  $scope.updateNumber();
  $scope.updateLetter();
  
  $scope.updateVocals = function() {
    Letters.allVocals().then(function(vocal){
       $scope.vocals = vocal;
       for(var i=0; i<vocal.length;i++){
          $scope.itemsdos[i] = {
            'color': ('#'+Math.floor(Math.random()*16777215).toString(16)),
            'mintitle': $filter('lowercase')($scope.vocals[i].title)
          };
          //$scope.temp[i] = $filter('lowercase')($scope.vocals[i].title);
        };
     });
  };
  
  $scope.updateVocals();

  $scope.createNewLetter = function(letter) {
    Letters.add(letter);
    $scope.updateLetter();
  };

  $scope.deleteLetter = function(letter) {
    Letters.remove(letter);
    $scope.updateLetter();
  };
  
  $scope.editLetter = function(origLetter, editLetter) {
    Letters.update(origMember, editMember);
    $scope.updateLetter();
  };
  
})

.controller('SoundsCtrl', function($scope, Sounds) {
 $scope.simples = [];
 $scope.simples = null;
 $scope.items = [];
 $scope.allSounds = function() {
    Sounds.allSimple().then(function(simple){
      $scope.simples = simple;
      for(var i=0; i<simple.length;i++){
          $scope.items[i] = {
            'color': ('#'+Math.floor(Math.random()*16777215).toString(16))
          };
        };
    });
  };
    
 $scope.allSounds();  
    
})
.controller('SoundsCompCtrl', function($scope, Sounds) {
 $scope.compuestos = [];
 $scope.compuestos = null;
 $scope.items = [];
 
 $scope.allSounds = function() {
    Sounds.allCompuestos().then(function(compuesto){
      $scope.compuestos = compuesto;
      for(var i=0; i<compuesto.length;i++){
          $scope.items[i] = {
            'color': ('#'+Math.floor(Math.random()*16777215).toString(16))
          };
        };
    });
  };
    
 $scope.allSounds();  
    
})
    
.controller('SoundsSimpleCtrl', function($scope, Sounds, $stateParams, $filter, $ionicSlideBoxDelegate, $ionicPlatform, $cordovaMedia, $ionicPopover) {
   $scope.mintitle = [];
    $ionicPlatform.ready(function(){
    $scope.play = function(src) {
        var media = $cordovaMedia.newMedia(src);
        //var media = new Media(src, null, null, mediaStatusCallback);
        media.play();
        //$cordovaMedia.play(media);
    }
    $scope.init = function (valor, valordos) {
        
        if (valordos == null){
            $scope.play('/android_asset/www/raw/'+valor+'.mp3');
//        $scope.$on('$ionicView.enter', function(){
//            $scope.play('/android_asset/www/raw/'+valor+'.mp3');
//            //console.log('Cargado...');
//        });
        }else {
            $scope.play(valordos);
        }
      
    };
    
    
    
    // and fire it after definition 
    
     
 })
            
            
    
      
  $scope.getArrSimple = function(value){
      Sounds.getSimpleArr(value.Id).then(function(detalle){
       $scope.sencillo = detalle;
       $scope.mintitle[0] = $filter('lowercase')($scope.sencillo[0].sound_title);
       $scope.init($scope.mintitle[0], $scope.sencillo[0].custom_sound_path);
       $scope.setE($scope.sencillo[0]);
       for(var i=0; i<detalle.length;i++){
          $scope.mintitle[i] = $filter('lowercase')($scope.sencillo[i].sound_title);
        };
          
       
       
        });
            
  };
  $scope.repeatDone = function() {
      $ionicSlideBoxDelegate.update();
     
        };
 
  $scope.getSimple = function($stateParams) {
    Sounds.getSimple($stateParams.simpleId).then(function(single){
      $scope.simple = single;
      $scope.getArrSimple($scope.simple);
      
    });
      
  };
  $scope.getEditSimple = function($stateParams) {
    Sounds.getEditSimple($stateParams.sencilloId).then(function(single){
      $scope.editsimple = single;
          
    });
      
  };
  $scope.getSimple($stateParams);
  $scope.getEditSimple($stateParams);
  
  $scope.popover = {};
  $ionicPopover.fromTemplateUrl('templates/popupSimples.html', {
    scope: $scope,
}).then(function(popover) {
    $scope.popover = popover;
    $scope.popover.item = {};
});
  
  $scope.showE = function($event) {
    //$scope.popover.item = item;
    $scope.popover.show($event);
 };
 $scope.hideE = function() {
    $scope.popover.hide();
  };
 $scope.setE = function(item){
     $scope.popover.item = item;
 }
 $scope.setR = function(item, value) {
    
     if (value == 0){
        value = 4;
        $scope.popover.item = item[value];
        
     }else{
         
          $scope.popover.item = item[value - 1];        
     }
      
     
 };
 $scope.setL = function(item, value) {
    
     if (value == 4 ){
        value = 0;
        $scope.popover.item = item[value];
     }else{
         
          $scope.popover.item = item[value + 1];        
     }
      
     
 };
 
 
})

.controller('SoundsCompuestoCtrl', function($scope, Sounds, $stateParams, $filter, $ionicSlideBoxDelegate, $ionicPlatform, $cordovaMedia, $ionicPopover) {
   $scope.mintitle = [];
    $ionicPlatform.ready(function(){
    $scope.play = function(src) {
        var media = $cordovaMedia.newMedia(src);
        //var media = new Media(src, null, null, mediaStatusCallback);
        media.play();
        //$cordovaMedia.play(media);
    }
    $scope.init = function (valor, valordos) {
        
        if (valordos == null){
            $scope.play('/android_asset/www/raw/'+valor+'.mp3');
//        $scope.$on('$ionicView.enter', function(){
//            $scope.play('/android_asset/www/raw/'+valor+'.mp3');
//            //console.log('Cargado...');
//        });
        }else {
            $scope.play(valordos);
        }
      
    };
    
    
    
    // and fire it after definition 
    
     
 })
            
            
    
      
  $scope.getArrCompuesto = function(value){
      Sounds.getCompArr(value.Id).then(function(detalle){
       $scope.sencillo = detalle;
       $scope.mintitle[0] = $filter('lowercase')($scope.sencillo[0].sound_title);
       $scope.init($scope.mintitle[0], $scope.sencillo[0].custom_sound_path);
       $scope.setE($scope.sencillo[0]);
       for(var i=0; i<detalle.length;i++){
          $scope.mintitle[i] = $filter('lowercase')($scope.sencillo[i].sound_title);
        };
       
        });
            
  };
  $scope.repeatDone = function() {
      $ionicSlideBoxDelegate.update();
     
        };
 
  $scope.getCompuesto = function($stateParams) {
    Sounds.getCompuesto($stateParams.compuestoId).then(function(comp){
      $scope.compuesto = comp;
      $scope.getArrCompuesto($scope.compuesto);
      
    });
      
  };
  $scope.getEditCompuesto = function($stateParams) {
    Sounds.getEditCompuesto($stateParams.compId).then(function(comp){
      $scope.editcompuesto = comp;
          
    });
      
  };
  $scope.getCompuesto($stateParams);
  $scope.getEditCompuesto($stateParams);
  
  $scope.popover = {};
  $ionicPopover.fromTemplateUrl('templates/popupComp.html', {
    scope: $scope,
}).then(function(popover) {
    $scope.popover = popover;
    $scope.popover.item = {};
});
  
  $scope.showE = function($event) {
    //$scope.popover.item = item;
    $scope.popover.show($event);
 };
 $scope.hideE = function() {
    $scope.popover.hide();
  };
 $scope.setE = function(item){
     $scope.popover.item = item;
 }
 $scope.setR = function(item, value) {
    
     if (value == 0){
        value = 4;
        $scope.popover.item = item[value];
        
     }else{
         
          $scope.popover.item = item[value - 1];        
     }
      
     
 };
 $scope.setL = function(item, value) {
    
     if (value == 4 ){
        value = 0;
        $scope.popover.item = item[value];
     }else{
         
          $scope.popover.item = item[value + 1];        
     }
      
     
 };
 
 
})

.controller('SoundsSimpleEditCtrl', function($ionicPlatform, $cordovaMedia, $scope,$filter , Sounds, $stateParams, $ionicPopup, $cordovaFile) {
  $ionicPlatform.ready(function(){
    $scope.play = function(src) {
        var media = $cordovaMedia.newMedia(src);
        //var media = new Media(src, null, null, mediaStatusCallback);
        media.play();
        //$cordovaMedia.play(media);
    };
 
        // Triggered on a button click, or some other target
        $scope.showPopup = function() {
          $scope.alertPopup = $ionicPopup.show({
            title: 'Grabando...'
            //templateUrl: 'templates/saveSoundModal.html'
          });
         $scope.alertPopup.then(function(res) {
            console.log('Pasó');
          });
//          setTimeout(function() {
//            $scope.alertPopup.close();
//          }, 2000);
        };
    $scope.helpPopup = function() {
          $scope.alertPopup = $ionicPopup.show({
            title: 'Ayuda',
            templateUrl: 'templates/helpSoundPopup.html',
            buttons: [
                    { text: 'Cerrar',
                      type: 'button-assertive'
                      
                    }
                  ]
            //templateUrl: 'templates/saveSoundModal.html'
          });
         $scope.alertPopup.then(function(res) {
            console.log('Pasó');
          });
//          setTimeout(function() {
//            $scope.alertPopup.close();
//          }, 2000);
        };
    $scope.helpPopup();
    
    
    
    $scope.recordStart = function(value){
        
        var random = 0;
        var src = null; //var tempSrc = null;
        random = Math.round(Math.random()*1000000);
        
        
        //$scope.tempSrc = cordova.file.dataDirectory+'custom_'+value+'_'+random+'.wav';
        $scope.tempSrc = 'Android/data/com.ionicframework.miabc613613/files/custom_'+value+'_'+random+'.wav';
        //$scope.tempSrc = 'cdvfile://localhost/persistent/custom_'+value+'_'+random+'.wav';
        //src = '/android_asset/www/raw/custom_'+value+'.amr';
        var media = $cordovaMedia.newMedia($scope.tempSrc);
        media.startRecord();
        console.log('Comenzó la Grabación...');  
        $scope.showPopup();
        createFile($scope.tempSrc);
        console.log(cordova.file.applicationStorageDirectory);
        console.log(cordova.file.dataDirectory);
        
        //        Creando Directorio tentativo
//        $cordovaFile.createDir(cordova.file.dataDirectory,"simples", true)
//            .then(function (success) {
//              
//              $scope.tempNew = cordova.file.dataDirectory + 'simples/custom_'+value+'_'+random+'.wav';
//              console.log(success + 'Se creo el directorio:' + $scope.tempNew);
//            }, function (error) {
//              console.log(error);
//            });
//
//        $cordovaFile.checkDir(cordova.file.dataDirectory, "simples")
//            .then(function (success) {
//              console.log('Si existe: ' + cordova.file.dataDirectory + 'simples');
//            }, function (error) {
//              console.log('No existe' + cordova.file.dataDirectory + 'simples' + error);
//            });
//       
        $scope.salvo = false;
        
        $scope.recordEnd = function(){
            
            media.stopRecord();
            console.log('Terminó la Grabación...');
            $scope.alertPopup.close();
            media.release();

            };
        
       
       
       
        
        function createFile(src){
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
                fileSystem.root.getFile(
                                    src, { create: true, exclusive: false }, getFileWin, getFileFail
                                );
                            }, getFSFail); //of requestFileSystem
          }

                // getFile Success & Fail Methods
                function getFileWin(fileEntry){
                    console.log("File created at " + fileEntry.fullPath);
                }

                function getFileFail(error){
                    console.log("Failed to retrieve file");
                }

                // requestFileSystem Fail Method
                function getFSFail(evt) {
                    console.log(evt.target.error.code);
                }
                
          

    };
    
   
    $scope.playing = function(src,srcdos){
        
        if (src == null){
            $scope.play(srcdos);

        }else{
            $scope.play(src);
            
       
              } 
       
     };
                
        $scope.savedPopup = function() {
          $scope.saved = $ionicPopup.show({
            title: 'Guardado'
            //templateUrl: 'templates/saveSoundModal.html'
          });
         
          setTimeout(function() {
            $scope.saved.close();
          }, 2000);
        };
    $scope.noSavedPopup = function() {
          $scope.nosaved = $ionicPopup.show({
            title: 'Mensaje',
            template: '<p style="text-align: justify !important;">Debe realizar una operaci&oacuten antes de guardar</p>',
            buttons: [
                    { text: 'Cerrar',
                      type: 'button-assertive'
                      
                    }
                  ]
            
          });
         
          
        };
    $scope.getEditSimpleValue = function(value) {
            Sounds.getEditSimple(value).then(function(single){
              $scope.editsimpleValue = single;  
              //$scope.editsimpleRow.custom_sound_path  = $scope.editsimpleValue.custom_sound_path; 

            });

          };
    $scope.save = function(value){
            //$scope.count = true;
            var src = null;
            if ($scope.salvo == true ){
                $scope.noSavedPopup();
            }else{
                src = $scope.tempSrc;
                Sounds.updateSound(value , src);
                //deleteFile($scope.tempSrc);
                
                //$scope.newSound = src;
                console.log('Guardó: '+src);
                //$scope.getEditSimpleValue(value);
                $scope.editsimpleRow.custom_sound_path = src;
                $scope.savedPopup();
                $scope.salvo = true;
//                $scope.clean();
               
    //            $scope.getEditSimpleRow($scope.editsimpleValue);
                
             }
             
            
         };
     
   });

            
  $scope.getEditSimpleRow = function($stateParams) {
    Sounds.getEditSimple($stateParams.sencilloId).then(function(single){
      $scope.editsimpleRow = single;
      $scope.mintitle =  $filter('lowercase')($scope.editsimpleRow.sound_title);
      $scope.getEditLetter($scope.editsimpleRow);
      
          
    });
      
  };
  
  $scope.getEditLetter = function(value){
      Sounds.getSimple(value.letter_id).then(function(detalle){
           $scope.letter = detalle;
      });   
      
  };
 
  $scope.getEditSimpleRow($stateParams);
   
 
})

.controller('SoundsCompEditCtrl', function($ionicPlatform, $cordovaMedia,$filter, $scope, Sounds, $stateParams, $ionicPopup, $cordovaFile) {
  $ionicPlatform.ready(function(){
    $scope.play = function(src) {
        var media = $cordovaMedia.newMedia(src);
        //var media = new Media(src, null, null, mediaStatusCallback);
        media.play();
        //$cordovaMedia.play(media);
    };
 
        // Triggered on a button click, or some other target
        $scope.showPopup = function() {
          $scope.alertPopup = $ionicPopup.show({
            title: 'Grabando...'
            //templateUrl: 'templates/saveSoundModal.html'
          });
         $scope.alertPopup.then(function(res) {
            console.log('Pasó');
          });
//          setTimeout(function() {
//            $scope.alertPopup.close();
//          }, 2000);
        };
    $scope.helpPopup = function() {
          $scope.alertPopup = $ionicPopup.show({
            title: 'Ayuda',
            templateUrl: 'templates/helpSoundPopup.html',
            buttons: [
                    { text: 'Cerrar',
                      type: 'button-assertive'
                      
                    }
                  ]
            //templateUrl: 'templates/saveSoundModal.html'
          });
         $scope.alertPopup.then(function(res) {
            console.log('Pasó');
          });
//          setTimeout(function() {
//            $scope.alertPopup.close();
//          }, 2000);
        };
    $scope.helpPopup();
    
    
    
    $scope.recordStart = function(value){
        
        var random = 0;
        var src = null; //var tempSrc = null;
        random = Math.round(Math.random()*1000000);
        
        //almacenamiento raiz en ambos SO
//        /var/mobile/Applications/<application UUID>/Documents/path/to/file  (iOS)
//        /storage/emulated/0/path/to/file  (android)  
//         
        //$scope.tempSrc = cordova.file.dataDirectory+'custom_'+value+'_'+random+'.wav';
        $scope.tempSrc = 'Android/data/com.ionicframework.miabc613613/files/custom_'+value+'_'+random+'.wav';
        //$scope.tempSrc = 'cdvfile://localhost/persistent/custom_'+value+'_'+random+'.wav';
        //src = '/android_asset/www/raw/custom_'+value+'.amr';
        //$scope.tempSrc = cordova.file.dataDirectory + 'custom_'+value+'_'+random+'.wav';
        var media = $cordovaMedia.newMedia($scope.tempSrc);
        media.startRecord();
        console.log('Comenzó la Grabación...');  
        $scope.showPopup();
        createFile($scope.tempSrc);
        //console.log(cordova.file.applicationStorageDirectory);
        console.log(cordova.file.dataDirectory); // retorna android file:///data/data/com.ionicframework.miabc613613/files/ 
        console.log('Debio guardar aqui:'+ $scope.tempSrc);
        $scope.salvo = false;
        
        $scope.recordEnd = function(){
            
            media.stopRecord();
            console.log('Terminó la Grabación...');
            $scope.alertPopup.close();
            media.release();

            };
        
       
       
       
        
        function createFile(src){
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
                fileSystem.root.getFile(
                                    src, { create: true, exclusive: false }, getFileWin, getFileFail
                                );
                            }, getFSFail); //of requestFileSystem
          }

                // getFile Success & Fail Methods
                function getFileWin(fileEntry){
                    console.log("File created at " + fileEntry.fullPath);
                }

                function getFileFail(error){
                    console.log("Failed to retrieve file");
                }

                // requestFileSystem Fail Method
                function getFSFail(evt) {
                    console.log(evt.target.error.code);
                }
                
          

    };
    
   
    $scope.playing = function(src,srcdos){
        
        if (src == null){
            $scope.play(srcdos);

        }else{
            $scope.play(src);
            
       
              } 
       
     };
                
        $scope.savedPopup = function() {
          $scope.saved = $ionicPopup.show({
            title: 'Guardado'
            //templateUrl: 'templates/saveSoundModal.html'
          });
         
          setTimeout(function() {
            $scope.saved.close();
          }, 2000);
        };
    $scope.noSavedPopup = function() {
          $scope.nosaved = $ionicPopup.show({
            title: 'Mensaje',
            template: '<p style="text-align: justify !important;">Debe realizar una operaci&oacuten antes de guardar</p>',
            buttons: [
                    { text: 'Cerrar',
                      type: 'button-assertive'
                      
                    }
                  ]
            
          });
         
          
        };
    $scope.getEditCompValue = function(value) {
            Sounds.getEditCompuesto(value).then(function(comp){
              $scope.editcompValue = comp;  
              //$scope.editsimpleRow.custom_sound_path  = $scope.editsimpleValue.custom_sound_path; 

            });

          };
    $scope.save = function(value){
            //$scope.count = true;
            var src = null;
            if ($scope.salvo == true ){
                $scope.noSavedPopup();
            }else{
                src = $scope.tempSrc;
                Sounds.updateSound(value , src);
                //deleteFile($scope.tempSrc);
                
                //$scope.newSound = src;
                console.log('Guardó: '+src);
                //$scope.getEditSimpleValue(value);
                $scope.editcompRow.custom_sound_path = src;
                $scope.savedPopup();
                $scope.salvo = true;
//                $scope.clean();
               
    //            $scope.getEditSimpleRow($scope.editsimpleValue);
                
             }
             
            
         };
     
   });

            
  $scope.getEditCompRow = function($stateParams) {
    Sounds.getEditCompuesto($stateParams.compId).then(function(comp){
      $scope.editcompRow = comp;
      $scope.mintitle =  $filter('lowercase')($scope.editcompRow.sound_title);
      $scope.getEditLetter($scope.editcompRow);
      
          
    });
      
  };
  
  $scope.getEditLetter = function(value){
      Sounds.getCompuesto(value.letter_id).then(function(detalle){
           $scope.letter = detalle;
      });   
      
  };
 
  $scope.getEditCompRow($stateParams);
   
 
})

.controller('wordsCtrl', function($scope, Words) {

 $scope.palabras = [];
 $scope.palabras = null;
 $scope.items=[];
 $scope.allLetters = function() {
    Words.allLetters().then(function(word){
      $scope.palabras = word;
      
        for(var i=0; i<word.length;i++){
          $scope.items[i] = {
            'color': ('#'+Math.floor(Math.random()*16777215).toString(16))
          };
        };
    });
  };
    
 $scope.allLetters();  
 
 
})

.controller('wordsDetalleCtrl', function($scope, $sce, Words, $stateParams, $filter, $ionicSlideBoxDelegate, $ionicPlatform, $cordovaMedia, $ionicPopover) {
   $scope.mintitle = [];
   $scope.nodiacri = [];
   $scope.nodiacriso=[];
    $ionicPlatform.ready(function(){
    $scope.play = function(src) {
        var media = $cordovaMedia.newMedia(src);
        //var media = new Media(src, null, null, mediaStatusCallback);
        media.play();
        //$cordovaMedia.play(media);
    }
    $scope.init = function (valor, valordos) {
        
        if (valordos == null){
            $scope.play('/android_asset/www/raw/'+valor+'.mp3');
//        $scope.$on('$ionicView.enter', function(){
//            $scope.play('/android_asset/www/raw/'+valor+'.mp3');
//            //console.log('Cargado...');
//        });
        }else {
            $scope.play(valordos);
        }
      
    };
    
    
    
    // and fire it after definition 
    
     
 })
       
    
   $scope.removeAccents = function (source) {
        var accent = [
            /[\300-\306]/g, /[\340-\346]/g, // A, a
            /[\310-\313]/g, /[\350-\353]/g, // E, e
            /[\314-\317]/g, /[\354-\357]/g, // I, i
            /[\322-\330]/g, /[\362-\370]/g, // O, o
            /[\331-\334]/g, /[\371-\374]/g, // U, u
            /[\321]/g, /[\361]/g, // N, n
            /[\307]/g, /[\347]/g, // C, c
        ],
        noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

        for (var i = 0; i < accent.length; i++){
            source = source.replace(accent[i], noaccent[i]);
        }

        return source;
    };
// removeAccents     
            
    
      
  $scope.getArrWords = function(value){
      Words.getWordsArr(value.Id).then(function(detalle){
       $scope.sencillo = detalle;
       $scope.final =[];
       /*$scope.colors = function(string){ 
       return $sce.trustAsHtml('<span style="color: #ef473a">'+string+'</span>');
       };*/ 
          
       $scope.sound = [];
       
       /*$scope.words = [
            { sonido: ''},
            { sonido: ''},
            { sonido: ''}
       ];*/
            
   
       for (var c = 0; c < detalle.length; c++) {
           var cant = 0;
           var posDash = '';
           var strSub = '';
           var str = $scope.sencillo[c].content;
           cant = (str.match(/-/g) || []).length;
           //console.log(str + '  ' + cant+1);
           $scope.sound[c] = [];
                for (var i = 0; i < cant+1; i++) {
                    posDash = str.indexOf("-");
                        if (posDash !== -1) {
                          strSub = str.substr(0,posDash);
                          $scope.sound[c][i] = strSub;
                          str = str.replace(strSub+'-','');      
                        }else{
                          strSub = str.substr(0,str.length); 
                          $scope.sound[c][i] = strSub;
                        }
                    
                }
                
          
       }
       
       for (var c = 0; c < $scope.sound.length; c++) {
                       
                        for (var i = 0; i < $scope.sound[c].length; i++) {
                            console.log($scope.sound[c][i]);
                            //$scope.words[c][i].push($scope.sound[c][i].rows.item(i));
                            
                            
                        }
                     
        }
       
      
       
       $scope.nodiacriso[0] = $scope.removeAccents($scope.sencillo[0].sound_title);
       $scope.mintitle[0] = $filter('lowercase')($scope.nodiacriso[0]);
       setTimeout(function() {
             $scope.init($scope.mintitle[0], $scope.sencillo[0].custom_sound_path);
       }, 2000); 
       $scope.setE($scope.sencillo[0]);
       for(var i=0; i<detalle.length;i++){
          $scope.nodiacri[i] = $scope.removeAccents($scope.sencillo[i].title);
          $scope.nodiacriso[i] = $scope.removeAccents($scope.sencillo[i].sound_title);
          $scope.mintitle[i] = $filter('lowercase')($scope.nodiacriso[i]);
        };
          
       
       
        });
            
  };
  $scope.repeatDone = function() {
      $ionicSlideBoxDelegate.update();
     
        };
 
  $scope.getWords = function($stateParams) {
    Words.getWords($stateParams.palabrasId).then(function(single){
      $scope.palabras = single;
      $scope.getArrWords($scope.palabras);
      
    });
      
  };
  $scope.getEditWord = function($stateParams) {
    Words.getEditSimple($stateParams.palabraId).then(function(single){
      $scope.editword = single;
          
    });
      
  };
  $scope.getWords($stateParams);
  $scope.getEditWord($stateParams);
  
  $scope.popover = {};
  $ionicPopover.fromTemplateUrl('templates/popupWord.html', {
    scope: $scope,
}).then(function(popover) {
    $scope.popover = popover;
    $scope.popover.item = {};
});
  
  $scope.showE = function($event) {
    //$scope.popover.item = item;
    $scope.popover.show($event);
 };
 $scope.hideE = function() {
    $scope.popover.hide();
  };
 $scope.setE = function(item){
     $scope.popover.item = item;
 }
 $scope.setR = function(item, value) {
    var len = $scope.sencillo.length - 1;
     if (value == 0){
        value = len;
        $scope.popover.item = item[value];
        
     }else{
         
          $scope.popover.item = item[value - 1];        
     }
      
     
 };
 $scope.setL = function(item, value) {
    var len = $scope.sencillo.length - 1;
     if (value == len ){
        value = 0;
        $scope.popover.item = item[value];
     }else{
         
          $scope.popover.item = item[value + 1];        
     }
      
     
 };
 
 
})
.controller('wordsEditCtrl', function($ionicPlatform, $cordovaMedia, $scope,$filter , Words, Utilities, $stateParams, $ionicPopup, $cordovaCamera) {
  $ionicPlatform.ready(function(){
    $scope.imgURI = null;

    $scope.play = function(src) {
        var media = $cordovaMedia.newMedia(src);
        //var media = new Media(src, null, null, mediaStatusCallback);
        media.play();
        //$cordovaMedia.play(media);
    };
 
        // Triggered on a button click, or some other target
        $scope.showPopup = function() {
          $scope.alertPopup = $ionicPopup.show({
            title: 'Grabando...'
            //templateUrl: 'templates/saveSoundModal.html'
          });
         $scope.alertPopup.then(function(res) {
            console.log('Pasó');
          });
//          setTimeout(function() {
//            $scope.alertPopup.close();
//          }, 2000);
        };
    $scope.helpPopup = function() {
          $scope.alertPopup = $ionicPopup.show({
            title: 'Ayuda',
            templateUrl: 'templates/helpWordsPopup.html',
            buttons: [
                    { text: 'Cerrar',
                      type: 'button-assertive'
                      
                    }
                  ]
            //templateUrl: 'templates/saveSoundModal.html'
          });
         $scope.alertPopup.then(function(res) {
            console.log('Pasó');
          });
//          setTimeout(function() {
//            $scope.alertPopup.close();
//          }, 2000);
        };
    $scope.helpPopup();
    
    
    
    $scope.recordStart = function(value){
        $scope.tempSrc = null;
        var random = 0;
        //var src = null; //var tempSrc = null;
        random = Math.round(Math.random()*1000000);
        
        
        //$scope.tempSrc = cordova.file.dataDirectory+'custom_'+value+'_'+random+'.wav';
        $scope.tempSrc = 'Android/data/com.ionicframework.miabc613613/files/custom_'+value+'_'+random+'.wav';
        //$scope.tempSrc = 'cdvfile://localhost/persistent/custom_'+value+'_'+random+'.wav';
        //src = '/android_asset/www/raw/custom_'+value+'.amr';
        var media = $cordovaMedia.newMedia($scope.tempSrc);
        media.startRecord();
        console.log('Comenzó la Grabación...');  
        $scope.showPopup();
        //createFile($scope.tempSrc);
        console.log(cordova.file.applicationStorageDirectory);
        console.log(cordova.file.dataDirectory);
        
        $scope.salvo = false;
        
        $scope.recordEnd = function(){
            
            media.stopRecord();
            console.log('Terminó la Grabación...');
            $scope.alertPopup.close();
            media.release();

            };
                
    };
    
   
    $scope.playing = function(src,srcdos){
        
        if (src == null){
            $scope.play(srcdos);

        }else{
            $scope.play(src);
            
       
              } 
       
     };
                
        $scope.savedPopup = function() {
          $scope.saved = $ionicPopup.show({
            title: 'Guardado'
            //templateUrl: 'templates/saveSoundModal.html'
          });
         
          setTimeout(function() {
            $scope.saved.close();
          }, 2000);
        };
    $scope.noSavedPopup = function() {
          $scope.nosaved = $ionicPopup.show({
            title: 'Mensaje',
            template: '<p style="text-align: justify !important;">Debe realizar una operaci&oacuten antes de guardar</p>',
            buttons: [
                    { text: 'Cerrar',
                      type: 'button-assertive'
                      
                    }
                  ]
            
          });
         
          
        };
    $scope.gallery = function() {
        $scope.imgURI = null;
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.FILE_URI, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            //$scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.imgURI = imageData;
            console.log($scope.imgURI);
            //$scope.edit.close();
        }, function(err) {
            // An error occured. Show a message to the user
            console.log('Hubo error '+err);
        });
        }
    
    
    $scope.takePicture = function() {
        $scope.imgURI = null;
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.FILE_URI, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            //$scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.imgURI = imageData;
            console.log($scope.imgURI);
            //$scope.edit.close();
        }, function(err) {
            // An error occured. Show a message to the user
            console.log('Hubo error '+err);
        });
        }
        
        $scope.editImage = function() {
          $scope.edit = $ionicPopup.show({
            title: 'Select a source',
            buttons: [
                    { text: 'Gallery',
                      type: 'button-dark button-full',
                      onTap: function() {
                           $scope.gallery();
                      }
                      
                    },
                    { text: 'Camera',
                      type: 'button-dark button-full',
                      onTap: function() {
                           $scope.takePicture();
                      }
                    }
                    
                  ]
            }); 
        };
   
    $scope.save = function(value){
            
            var src = null;
            if ($scope.salvo == true ){
                $scope.noSavedPopup();
            }else{
                src = $scope.tempSrc;
                Words.updateWord(value, src);
                Words.updateWordImg(value, $scope.imgURI);
                /*var text = $scope.editWordRow.content;
                $scope.title = text.split('-').join('');*/
                Words.updateWordCont(value, $scope.editWordRow.content);
                //deleteFile($scope.tempSrc);
                
                //$scope.newSound = src;
                console.log('Guardó: '+src);
                //$scope.getEditSimpleValue(value);
                $scope.editWordRow.custom_sound_path = src;
                $scope.savedPopup();
                $scope.salvo = true;
//                $scope.clean();
               
    //            $scope.getEditSimpleRow($scope.editsimpleValue);
                
             }
             
            
         };
                  
        
     
   });

            
  $scope.getEditPalabraRow = function($stateParams) {
    Words.getEditSimple($stateParams.palabraId).then(function(single){
      $scope.editWordRow = single;
      $scope.nodiacriso = Utilities.removeAccents($scope.editWordRow.sound_title);
      $scope.mintitle =  $filter('lowercase')($scope.nodiacriso);
      $scope.nodiacri = Utilities.removeAccents($scope.editWordRow.title);
      $scope.getEditLetter($scope.editWordRow);
      
          
    });
      
  };
  
  $scope.getEditLetter = function(value){
      Words.getWords(value.letter_id).then(function(detalle){
           $scope.letter = detalle;
      });   
      
  };
 
  $scope.getEditPalabraRow($stateParams);
   
})

.controller('wordsAddCtrl', function($ionicPlatform, $cordovaMedia, $scope,$filter , Words, Utilities, $stateParams, $ionicPopup, $cordovaCamera) {
  $ionicPlatform.ready(function(){
    $scope.imgURI = null;

    $scope.play = function(src) {
        var media = $cordovaMedia.newMedia(src);
        //var media = new Media(src, null, null, mediaStatusCallback);
        media.play();
        //$cordovaMedia.play(media);
    };
 
        // Triggered on a button click, or some other target
        $scope.showPopup = function() {
          $scope.alertPopup = $ionicPopup.show({
            title: 'Grabando...'
            //templateUrl: 'templates/saveSoundModal.html'
          });
         $scope.alertPopup.then(function(res) {
            console.log('Pasó');
          });
//          setTimeout(function() {
//            $scope.alertPopup.close();
//          }, 2000);
        };
    $scope.helpPopup = function() {
          $scope.alertPopup = $ionicPopup.show({
            title: 'Ayuda',
            templateUrl: 'templates/helpWordsAddPopup.html',
            buttons: [
                    { text: 'Cerrar',
                      type: 'button-assertive'
                      
                    }
                  ]
            //templateUrl: 'templates/saveSoundModal.html'
          });
         $scope.alertPopup.then(function(res) {
            console.log('Pasó');
          });
//          setTimeout(function() {
//            $scope.alertPopup.close();
//          }, 2000);
        };
    $scope.helpPopup();
    
    
    
    $scope.recordStart = function(){
        $scope.tempSrc = null;
        var random = 0;
        //var src = null; //var tempSrc = null;
        random = Math.round(Math.random()*1000000);
        
        
        //$scope.tempSrc = cordova.file.dataDirectory+'custom_'+value+'_'+random+'.wav';
        $scope.tempSrc = 'Android/data/com.ionicframework.miabc613613/files/custom_'+random+'.wav';
        //$scope.tempSrc = 'cdvfile://localhost/persistent/custom_'+value+'_'+random+'.wav';
        //src = '/android_asset/www/raw/custom_'+value+'.amr';
        var media = $cordovaMedia.newMedia($scope.tempSrc);
        media.startRecord();
        console.log('Comenzó la Grabación...');  
        $scope.showPopup();
        //createFile($scope.tempSrc);
        console.log(cordova.file.applicationStorageDirectory);
        console.log(cordova.file.dataDirectory);
        
        $scope.salvo = false;
        
        $scope.recordEnd = function(){
            
            media.stopRecord();
            console.log('Terminó la Grabación...');
            $scope.alertPopup.close();
            media.release();

            };
        $scope.editWordRow.custom_sound_path = $scope.tempSrc;
                
    };
    
   
    $scope.playing = function(src,srcdos){
        
        if (src == null){
            $scope.play(srcdos);

        }else{
            $scope.play(src);
            
       
              } 
       
     };
                
        $scope.savedPopup = function() {
          $scope.saved = $ionicPopup.show({
            title: 'Guardado'
            //templateUrl: 'templates/saveSoundModal.html'
          });
         
          setTimeout(function() {
            $scope.saved.close();
          }, 2000);
        };
    $scope.noSavedPopup = function() {
          $scope.nosaved = $ionicPopup.show({
            title: 'Mensaje',
            template: '<p style="text-align: justify !important;">Debe realizar una operaci&oacuten antes de guardar</p>',
            buttons: [
                    { text: 'Cerrar',
                      type: 'button-assertive'
                      
                    }
                  ]
            
          });
         
          
        };
    $scope.nullPopup = function() {
          $scope.nullpop = $ionicPopup.show({
            title: 'Alert',
            template: '<p style="text-align: justify !important;">Datos incompletos, asegurese de seleccionar la imagen y el sonido para la palabra</p>',
            buttons: [
                    { text: 'Cerrar',
                      type: 'button-assertive'
                      
                    }
                  ]
            
          });
         
          
        };
    $scope.gallery = function() {
        $scope.imgURI = null;
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.FILE_URI, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            //$scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.imgURI = imageData;
            console.log($scope.imgURI);
            //$scope.edit.close();
        }, function(err) {
            // An error occured. Show a message to the user
            console.log('Hubo error '+err);
        });
        }
    
    
    $scope.takePicture = function() {
        $scope.imgURI = null;
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.FILE_URI, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            //$scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.imgURI = imageData;
            console.log($scope.imgURI);
            //$scope.edit.close();
        }, function(err) {
            // An error occured. Show a message to the user
            console.log('Hubo error '+err);
        });
        }
        
        $scope.editImage = function() {
          $scope.edit = $ionicPopup.show({
            title: 'Select a source',
            buttons: [
                    { text: 'Gallery',
                      type: 'button-dark button-full',
                      onTap: function() {
                           $scope.gallery();
                      }
                      
                    },
                    { text: 'Camera',
                      type: 'button-dark button-full',
                      onTap: function() {
                           $scope.takePicture();
                      }
                    }
                    
                  ]
            }); 
        };
   
    $scope.save = function(id){
        
            console.log($scope.addWord.content);
            var src = null;
            if ($scope.salvo == true ){
                $scope.noSavedPopup();
            }else if($scope.addWord.content===null || $scope.imgURI===null || $scope.tempSrc===null){
                $scope.nullPopup();
                
             }else{
                src = $scope.tempSrc;
                //Words.updateWord(value, src);
                //Words.updateWordImg(value, $scope.imgURI);
                var str = $scope.addWord.content;
                var title = str.split("-").join("");
                //var id = 943;
                    function toTitleCase(str)
                    {
                        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                    }
                   var content = toTitleCase($scope.addWord.content);
                $scope.word={
                    content: content,
                    custom_image_path: $scope.imgURI,
                    custom_sound_path: src,
                    letter_id: id,
                    title: title,
                };
                console.log($scope.letter.letter_id);
                console.log(id);
                
                Words.addWord($scope.word);
                /*var text = $scope.editWordRow.content;
                $scope.title = text.split('-').join('');*/
                //Words.updateWordCont(value, $scope.editWordRow.content);
                //deleteFile($scope.tempSrc);
                
                //$scope.newSound = src;
                console.log('Guardó: '+src);
                //$scope.getEditSimpleValue(value);
                $scope.editWordRow.custom_sound_path = src;
                $scope.savedPopup();
                $scope.salvo = true;
                 
             }
             
            
         };
                  
        
     
   });

            
  $scope.getEditPalabraRow = function($stateParams) {
    Words.getEditSimple($stateParams.palabraId).then(function(single){
      $scope.editWordRow = single;
      $scope.addWord = {
          content: null};
      $scope.nodiacriso = Utilities.removeAccents($scope.editWordRow.sound_title);
      $scope.mintitle =  $filter('lowercase')($scope.nodiacriso);
      $scope.nodiacri = Utilities.removeAccents($scope.editWordRow.title);
      $scope.getEditLetter($scope.editWordRow);
      
          
    });
      
  };
  
  $scope.getEditLetter = function(value){
      Words.getWords(value.letter_id).then(function(detalle){
           $scope.letter = detalle;
      });   
      
  };
 
  $scope.getEditPalabraRow($stateParams);
   
})
 
.controller('ProfileCtrl', function($ionicPlatform, $cordovaMedia, $scope,$filter , Words, Utilities, $ionicPopup, $cordovaCamera) {
    //$scope.profile = true;
    
    //$scope.profile = window.localStorage.getItem('prof');    
    /*$scope.save = function(){
            //$scope.count = true;
            window.localStorage.setItem('profile', true);
            window.localStorage.setItem('count', 1);   
         };*/
 $ionicPlatform.ready(function(){
    $scope.imgURI = null;

    $scope.play = function(src) {
        var media = $cordovaMedia.newMedia(src);
        //var media = new Media(src, null, null, mediaStatusCallback);
        media.play();
        //$cordovaMedia.play(media);
    };
 
        // Triggered on a button click, or some other target
        $scope.showPopup = function() {
          $scope.alertPopup = $ionicPopup.show({
            title: 'Grabando...'
            //templateUrl: 'templates/saveSoundModal.html'
          });
         $scope.alertPopup.then(function(res) {
            console.log('Pasó');
          });
//          setTimeout(function() {
//            $scope.alertPopup.close();
//          }, 2000);
        };
    
    $scope.recordStart = function(){
        $scope.tempSrc = null;
        var random = 0;
        //var src = null; //var tempSrc = null;
        random = Math.round(Math.random()*1000000);
        
        
        //$scope.tempSrc = cordova.file.dataDirectory+'custom_'+value+'_'+random+'.wav';
        $scope.tempSrc = 'Android/data/com.ionicframework.miabc613613/files/custom_'+random+'.wav';
        //$scope.tempSrc = 'cdvfile://localhost/persistent/custom_'+random+'.wav';
        //src = '/android_asset/www/raw/custom_'+value+'.amr';
        var media = $cordovaMedia.newMedia($scope.tempSrc);
        media.startRecord();
        console.log('Comenzó la Grabación...');  
        $scope.showPopup();
        //createFile($scope.tempSrc);
        console.log(cordova.file.applicationStorageDirectory);
        console.log(cordova.file.dataDirectory);
        
        $scope.salvo = false;
        
        $scope.recordEnd = function(){
            
            media.stopRecord();
            console.log('Terminó la Grabación...');
            $scope.alertPopup.close();
            media.release();

            };
        $scope.editWordRow.name_sound_path = $scope.tempSrc;
                
    };
    
    $scope.recordStartCon = function(){
        $scope.tempSrc2 = null; 
        var random = 0;
        //var src = null; //var tempSrc = null;
        random = Math.round(Math.random()*1000000);
        
        
        //$scope.tempSrc = cordova.file.dataDirectory+'custom_'+value+'_'+random+'.wav';
        $scope.tempSrc2 = 'Android/data/com.ionicframework.miabc613613/files/custom_'+random+'.wav';
        //$scope.tempSrc = 'cdvfile://localhost/persistent/custom_'+random+'.wav';
        //src = '/android_asset/www/raw/custom_'+value+'.amr';
        var media = $cordovaMedia.newMedia($scope.tempSrc2);
        media.startRecord();
        console.log('Comenzó la Grabación...');  
        $scope.showPopup();
        //createFile($scope.tempSrc);
        console.log(cordova.file.applicationStorageDirectory);
        console.log(cordova.file.dataDirectory);
        
        $scope.salvo = false;
        
        $scope.recordEndCon = function(){
            
            media.stopRecord();
            console.log('Terminó la Grabación...');
            $scope.alertPopup.close();
            media.release();

            };
        $scope.editWordRow.congrats_path = $scope.tempSrc2;
                
    };
    
   
    $scope.playing = function(src,srcdos){
        
        if (src == null){
            $scope.play(srcdos);

        }else{
            $scope.play(src);
            
       
              } 
       
     };
                
        $scope.savedPopup = function() {
          $scope.saved = $ionicPopup.show({
            title: 'Guardado'
            //templateUrl: 'templates/saveSoundModal.html'
          });
         
          setTimeout(function() {
            $scope.saved.close();
          }, 2000);
          
        };
    $scope.noSavedPopup = function() {
          $scope.nosaved = $ionicPopup.show({
            title: 'Mensaje',
            template: '<p style="text-align: justify !important;">Debe realizar una operaci&oacuten antes de guardar</p>',
            buttons: [
                    { text: 'Cerrar',
                      type: 'button-assertive'
                      
                    }
                  ]
            
          });
         
          
        };
    $scope.nullPopup = function() {
          $scope.nullpop = $ionicPopup.show({
            title: 'Alert',
            template: '<p style="text-align: justify !important;">Datos incompletos, asegurese de seleccionar la imagen, y los sonidos para la palabra y la frase de felicitaci&oacuten</p>',
            buttons: [
                    { text: 'Cerrar',
                      type: 'button-assertive'
                      
                    }
                  ]
            
          });
         
          
        };
    $scope.gallery = function() {
        $scope.imgURI = null;
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.FILE_URI, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            //$scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.imgURI = imageData;
            console.log($scope.imgURI);
            //$scope.edit.close();
        }, function(err) {
            // An error occured. Show a message to the user
            console.log('Hubo error '+err);
        });
        }
    
    
    $scope.takePicture = function() {
        $scope.imgURI = null;
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.FILE_URI, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            //$scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.imgURI = imageData;
            console.log($scope.imgURI);
            //$scope.edit.close();
        }, function(err) {
            // An error occured. Show a message to the user
            console.log('Hubo error '+err);
        });
        }
        
        $scope.editImage = function() {
          $scope.edit = $ionicPopup.show({
            title: 'Select a source',
            buttons: [
                    { text: 'Gallery',
                      type: 'button-dark button-full',
                      onTap: function() {
                           $scope.gallery();
                      }
                      
                    },
                    { text: 'Camera',
                      type: 'button-dark button-full',
                      onTap: function() {
                           $scope.takePicture();
                      }
                    }
                    
                  ]
            }); 
        };
   
    $scope.save = function(){
                        
        //console.log($scope.editWordRow.title);
        
        var src = null;
               
        function toTitleCase(str)
                    {
                      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                    }
        var content = toTitleCase($scope.editWordRow.title);
        var firstLetter = content.charAt(0);
        console.log("primera letra es:" + firstLetter);
        var exp = window.localStorage.getItem('count');
        console.log("content es:" + content);
        
        $scope.getProfileContent = function(value){
                            Words.getProfileContent(value).then(function(detalle){
                                if (!detalle) {
                                    $scope.profileContent = {
                                        title: null
                                        
                                    };  
      
                                }else{
                                
                                 $scope.profileContent = detalle;
                             
                                }
                                 
                            });   

        };
        $scope.getProfileContent2 = function(value){
            //notice the return on the next line
            return Words.getProfileContent(value).then(function(detalle){
              if (!detalle) {
                $scope.profileContent = {
                  title: null
                };  
              }else{
                $scope.profileContent = detalle;
              }
              return detalle;
            });   
        };
        $scope.getProfileContentOld = function(value){
                            Words.getProfileContent(value).then(function(detalle){
                                 $scope.profileContentOld = detalle;
                                 
                            });   

        };
        $scope.getProfileLetter = function(value){
                            Words.getProfileLetter(value).then(function(detalle){
                                 $scope.profileLetter = detalle;
                            });   

        };
        $scope.getProfileWord = function(){
                            Words.getProfileWord().then(function(detalle){                                
                                 $scope.profileWord = detalle;                           
                              
                            });   

        };
        $scope.getWord = function(value){
                            Words.getEditSimple(value).then(function(detalle){
                                 $scope.rowWord = detalle;
                            });   

        };
        
        if (exp !== 1) {
               
            if ($scope.salvo === true ){
                $scope.noSavedPopup();
            }else if($scope.editWordRow.title===null || $scope.imgURI===null || $scope.tempSrc===null || $scope.tempSrc2===null)
            {
                $scope.nullPopup();
                console.log($scope.editWordRow.title);
                console.log($scope.imgURI);
                console.log($scope.tempSrc);
                console.log($scope.tempSrc2);
             }else {
                
                    $scope.getProfileContent2(content).then(function(detalle) {
                        if (detalle===null || detalle===undefined) {
                            $scope.profileContent = {
                                title: null
                            };  
                            console.log("El title es : " + $scope.profileContent.title);
                            return "/app/inicio";
                        }else{
                            
                            $scope.profileContent = detalle;
                            console.log("El title es : " + $scope.profileContent.title +"y esta en BD");
                            return "/app/inicio";
                            
                        }
                     
                     
                    
                    })
                
//                $scope.getProfileContent(content);
//                if ($scope.profileContent.title===null) {
//                    
//                    console.log("El title es : " + $scope.profileContent.title);
//                                
//                }else{
//                    
//                    console.log("El title es : " + $scope.profileContent.title +"y esta en BD");
//                    
//                }
                    
                
                 
                 
                 
             }
               
            
//               $scope.count = true;
//               window.localStorage.setItem('profile', true);
//               window.localStorage.setItem('count', 1);  
        }
        else{
            
            
               
               
        }
            
          
             
           return "/app/inicio"; 
         };
                  
        
     
   });

            
  $scope.getProfileRow = function() {
    Words.getProfileSimple().then(function(single){
      if (single === null || single === undefined) {
      $scope.editWordRow = {
          title: null,
          congrats_path: null,
          name_sound_path: null,
          profile_image_path: null
      };  
      
      }
      else 
      {
      $scope.editWordRow = single;
      $scope.editWordOld.titleOld = $scope.editWordRow.title;
      }
    
      $scope.nodiacriso = Utilities.removeAccents($scope.editWordRow.title);
      $scope.mintitle =  $filter('lowercase')($scope.nodiacriso);
      $scope.nodiacri = Utilities.removeAccents($scope.editWordRow.title);
      $scope.getEditLetter($scope.editWordRow);
          
    });
      
  };
  
  $scope.getEditLetter = function(value){
      Words.getWords(value.letter_id).then(function(detalle){
           $scope.letter = detalle;
      });   
      
  };
 
  $scope.getProfileRow();
   
    
});


