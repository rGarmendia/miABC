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

.controller('LettersCtrl', function($scope, Letters) {
  $scope.letters = [];
  $scope.letters = null;
  $scope.numbers = [];
  $scope.numbers = null;
  $scope.vocals  =  [];
  $scope.vocals  = null;
  
  $scope.updateLetter = function() {
    Letters.all().then(function(letter){
      $scope.letters = letter;
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
 
 $scope.allSounds = function() {
    Sounds.allSimple().then(function(simple){
      $scope.simples = simple;
    });
  };
    
 $scope.allSounds();  
    
})
.controller('SoundsCompCtrl', function($scope, Sounds) {
 $scope.compuestos = [];
 $scope.compuestos = null;
 
 $scope.allSounds = function() {
    Sounds.allCompuestos().then(function(compuesto){
      $scope.compuestos = compuesto;
    });
  };
    
 $scope.allSounds();  
    
})
    
.controller('SoundsSimpleCtrl', function($scope, Sounds, $stateParams, $ionicSlideBoxDelegate, $ionicPlatform, $cordovaMedia, $ionicPopover) {
   
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
       $scope.init($scope.sencillo[0].sound_title, $scope.sencillo[0].custom_sound_path);
       $scope.setE($scope.sencillo[0]);
       
       
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

.controller('SoundsCompuestoCtrl', function($scope, Sounds, $stateParams, $ionicSlideBoxDelegate, $ionicPlatform, $cordovaMedia, $ionicPopover) {
   
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
       $scope.init($scope.sencillo[0].sound_title, $scope.sencillo[0].custom_sound_path);
       $scope.setE($scope.sencillo[0]);
       
       
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

.controller('SoundsSimpleEditCtrl', function($ionicPlatform, $cordovaMedia, $scope, Sounds, $stateParams, $ionicPopup, $cordovaFile) {
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
        //src = 'Android/data/com.ionicframework.miabc613613/files/custom_'+value+'.wav';
        $scope.tempSrc = 'cdvfile://localhost/persistent/custom_'+value+'_'+random+'.wav';
        //src = '/android_asset/www/raw/custom_'+value+'.amr';
        var media = $cordovaMedia.newMedia($scope.tempSrc);
        media.startRecord();
        console.log('Comenzó la Grabación...');  
        $scope.showPopup();
        createFile($scope.tempSrc);
        console.log(cordova.file.applicationStorageDirectory);
        console.log(cordova.file.dataDirectory);
       
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

.controller('SoundsCompEditCtrl', function($ionicPlatform, $cordovaMedia, $scope, Sounds, $stateParams, $ionicPopup, $cordovaFile) {
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
        //src = 'Android/data/com.ionicframework.miabc613613/files/custom_'+value+'.wav';
        $scope.tempSrc = 'cdvfile://localhost/persistent/custom_'+value+'_'+random+'.wav';
        //src = '/android_asset/www/raw/custom_'+value+'.amr';
        var media = $cordovaMedia.newMedia($scope.tempSrc);
        media.startRecord();
        console.log('Comenzó la Grabación...');  
        $scope.showPopup();
        createFile($scope.tempSrc);
        console.log(cordova.file.applicationStorageDirectory);
        console.log(cordova.file.dataDirectory);
       
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
    Sounds.getEditCompuesto($stateParams.sencilloId).then(function(comp){
      $scope.editcompRow = comp;
      $scope.getEditLetter($scope.editcompRow);
      
          
    });
      
  };
  
  $scope.getEditLetter = function(value){
      Sounds.getCompuesto(value.letter_id).then(function(detalle){
           $scope.letter = detalle;
      });   
      
  };
 
  $scope.getEditCompRow($stateParams);
   
 
});
