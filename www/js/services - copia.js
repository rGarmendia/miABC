/* global angular, db */
angular.module('starter.services', [])

.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          console.log(error.code + ' / ' + error.message);
          q.reject(error);
        });
    });
    return q.promise;
  };

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  };

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  };

  return self;
})
        
.factory('Letters', function(DBA) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT * FROM letters WHERE learning_id = 1")
      .then(function(result){
        return DBA.getAll(result);
      });
  };
  
  self.allNumbers = function(){
    return DBA.query("SELECT content, title FROM letters WHERE learning_id = 3")
      .then(function(result){
        return DBA.getAll(result);
                  
      });
      
  };
  
  self.allVocals = function(){
    return DBA.query("SELECT content, title FROM letters WHERE learning_id = 4")
      .then(function(result){
        return DBA.getAll(result);
                  
      });
      
  };

  self.get = function(letterId) {
    var parameters = [letterId];
    return DBA.query("SELECT Id, content, title FROM letters WHERE Id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };
  
  self.add = function(letter) {
    var parameters = [letter.Id,letter.content,letter.custom_image_path,letter.custom_sound_path,letter.learning_id,letter.system_image_id,letter.system_sound_id,letter.title];
    return DBA.query("INSERT INTO letters (Id, content, custom_image_path, custom_sound_path, learning_id, system_image_id, system_sound_id, title) VALUES (?,?,?,?,?,?,?,?)", parameters);
  };

  self.remove = function(letterid) {
    var parameters = [letterid];
    return DBA.query("DELETE FROM letter WHERE id = (?)", parameters);
  };

  self.update = function(origLetter, editLetter) {
    var parameters = [editLetter.content,editLetter.custom_image_path, editLetter.custom_sound_path, editLetter.learning_id, editLetter.system_image_id, editLetter.system_sound_id, editLetter.title, origLetter.id];
    return DBA.query("UPDATE letter SET content = (?), custom_image_path = (?), custom_sound_path = (?), learning_id = (?), system_image_id = (?), system_sound_id = (?), title = (?) WHERE Id = (?)", parameters);
  };

  return self;
})

.factory('Sounds', function(DBA) {
 var self = this;
 
 self.allSimple = function(){
     return DBA.query("SELECT * FROM letters WHERE learning_id = 2 ORDER BY title")
      .then(function(result){
        return DBA.getAll(result);
      });
 };
 self.allCompuestos = function(){
     return DBA.query("SELECT * FROM letters WHERE learning_id = 5 ORDER BY title")
      .then(function(result){
        return DBA.getAll(result);
      });
 };
 
 self.getSimple = function(simpleId) {
    var parameters = [simpleId];
    return DBA.query("SELECT * FROM letters WHERE Id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };
  self.getCompuesto = function(compuestoId) {
    var parameters = [compuestoId];
    return DBA.query("SELECT * FROM letters WHERE Id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };
  self.getEditSimple = function(Id) {
    var parameters = [Id];
    return DBA.query("SELECT * FROM words WHERE Id_words = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };
  self.getEditCompuesto = function(Id) {
    var parameters = [Id];
    return DBA.query("SELECT * FROM words WHERE Id_words = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };
  self.getSimpleArr = function(value) {
    var parameters = [value];
    return DBA.query("SELECT * FROM words WHERE letter_id = (?)",parameters)
        .then(function(result){
          return DBA.getAll(result);
      });
  };
  self.getCompArr = function(value) {
    var parameters = [value];
                             
    return DBA.query("SELECT sound_title,image_id,Id_words,content,custom_sound_path,letter_id,title FROM words WHERE letter_id = (?)",parameters)
        .then(function(result){
          return DBA.getAll(result);
      });
  };
  self.updateSound = function(wordId, custom_sound_path) {
    var parameters = [custom_sound_path, wordId];
    return DBA.query("UPDATE words SET custom_sound_path = (?) WHERE Id_words = (?)", parameters);
  };
 
  return self;  
    
});

