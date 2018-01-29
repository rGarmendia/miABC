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
    
})

.factory('Words', function(DBA) {
 var self = this;
 
 self.allLetters = function(){
     return DBA.query("SELECT * FROM letters WHERE learning_id = 1 ORDER BY title")
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
  self.updateWord = function(wordId, custom_sound_path) {
    var parameters = [custom_sound_path, wordId];
    return DBA.query("UPDATE words SET custom_sound_path = (?) WHERE Id_words = (?)", parameters);
  };
  self.updateWordImg = function(wordId, custom_image_path) {
    var parameters = [custom_image_path, wordId];
    return DBA.query("UPDATE words SET custom_image_path = (?) WHERE Id_words = (?)", parameters);
  };
  self.updateWordCont = function(wordId, content) {
    var parameters = [content, wordId];
    return DBA.query("UPDATE words SET content = (?) WHERE Id_words = (?)", parameters);
  };
  self.updateLetterId = function(wordId, letterId) {
    var parameters = [letterId, wordId];
    return DBA.query("UPDATE words SET letter_id = (?) WHERE Id_words = (?)", parameters);
  };
  self.updateWordContNew = function(wordId, content, title) {
    var parameters = [content, title, wordId];
    return DBA.query("UPDATE words SET content = (?), title = (?) WHERE Id_words = (?)", parameters);
  };
  self.addWord = function(word) {
    var parameters = [word.content,word.custom_image_path,word.custom_sound_path,word.letter_id,word.title];
    return DBA.query("INSERT INTO words (content, custom_image_path, custom_sound_path, letter_id, title) VALUES (?,?,?,?,?)", parameters);
  };
   self.addProfile = function(word) {
    var parameters = [word.name_sound_path,word.word_id,word.profile_image_path,word.congrats_path,word.title,word.content,word.letter_id,word.selected];
    return DBA.query("INSERT INTO learners (name_sound_path, word_id, profile_image_path, congrats_path, title, content, letter_id, selected) VALUES (?,?,?,?,?,?,?,?)", parameters);
  };
  self.getWords = function(simpleId) {
    var parameters = [simpleId];
    return DBA.query("SELECT * FROM letters WHERE Id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };
  self.getWordsArr = function(value) {
    var parameters = [value];
    return DBA.query("SELECT * FROM words WHERE letter_id = (?)",parameters)
        .then(function(result){
          return DBA.getAll(result);
      });
  };
  
  self.getProfileLetter = function(letter) {
    var parameters = [letter];
    return DBA.query("SELECT * FROM letters WHERE title = (?) and learning_id = 1", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };
  
  self.getProfileWord = function() {
    return DBA.query("SELECT * FROM words ORDER BY Id_words DESC LIMIT 1")
      .then(function(result) {
        return DBA.getById(result);
      });
  };
  self.getProfileSimple = function() {
    return DBA.query("SELECT * FROM learners WHERE selected = 1")
      .then(function(result) {
        return DBA.getById(result);
      });
  };
  self.getProfileContent = function(content) {
    var parameters = [content];
    return DBA.query("SELECT * FROM learners WHERE title = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };
  
  self.updateProfileFull = function(content, profile) {
    var parameters = [profile.name_sound_path,profile.word_id,profile.profile_image_path,profile.congrats_path,profile.selected,content];
    return DBA.query("UPDATE learners SET name_sound_path = (?), word_id= (?), profile_image_path = (?), congrats_path = (?), selected = (?)  WHERE title = (?)", parameters);
  };
  
   self.updateProfileSrc = function(Id, name_sound_path) {
    var parameters = [name_sound_path, Id];
    return DBA.query("UPDATE learners SET name_sound_path = (?) WHERE Id = (?)", parameters);
  };
  
   self.updateProfileIdword = function(Id, word_id) {
    var parameters = [word_id, Id];
    return DBA.query("UPDATE learners SET word_id = (?) WHERE Id = (?)", parameters);
  };
  
  self.updateProfileImg = function(wordId, profile_image_path) {
    var parameters = [profile_image_path, wordId];
    return DBA.query("UPDATE learners SET profile_image_path = (?) WHERE Id = (?)", parameters);
  };
  self.updateProfileLetterID = function(wordId, LetterId) {
    var parameters = [LetterId, wordId];
    return DBA.query("UPDATE learners SET letter_id = (?) WHERE Id = (?)", parameters);
  };
  self.updateProfileSelected = function(wordId, selected) {
    var parameters = [selected, wordId];
    return DBA.query("UPDATE learners SET selected = (?) WHERE Id = (?)", parameters);
  };
  self.updateProfileSrcCon = function(Id, congrats_path) {
    var parameters = [congrats_path, Id];
    return DBA.query("UPDATE learners SET congrats_path = (?) WHERE Id = (?)", parameters);
  };
  self.updateProfileCont = function(Id, content, title) {
    var parameters = [content, title, Id];
    return DBA.query("UPDATE learners SET content = (?), title = (?) WHERE Id = (?)", parameters);
  };
  self.deleteOldWord = function(id) {
    var parameters = [id];
    return DBA.query("DELETE FROM words WHERE Id_words = (?)", parameters);
  };
  
 
  return self;  
    
})

.factory('Utilities', function() {
    var self = this;
    
    self.removeAccents = function (source) {
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
  return self;
 })
 
 // ------------------------------------ PROVIDERS -----------------------------
 .provider('mainView', function() {
  //var someCondition = false;
   
  this.getCurrentMainView = function() {
    var value = false;
    var exp = window.localStorage.getItem('count');
    // Inicializo para visualizar nombre de perfil en barra menu
    window.localStorage.setItem('profName', 'Inicio');
    
    if (exp==1) {
        
         value = window.localStorage.getItem('profile');
    }  
      
    if(value)
      return "/app/inicio";
    else {
      return "/app/inicio2";
    }
  };
  //return a dummy factory that will never be used or injected
  this.$get = ["nullService", function(){return null;}];
});