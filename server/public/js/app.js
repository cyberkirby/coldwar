/*global App:true */
/*jshint browser:true */
/*jshint strict:false */

var Scenes = {};

var App = function(){
  var self = this;
  this.view = null;

  this.el = document.getElementById('app');

  this.start = function(){
      this.bindKeys();
    this.render();
  };

  this.render = function(scene){
    if(this.view){
      this.view.stop();
    }

    var pairs, opts;
    opts = {};

    if(window.location.search.substr(0,1) === '?'){
      pairs = window.location.search.substr(1).split('&');
      pairs.forEach(function(pair, ix){
        var pair = pair.split('=');
        opts[pair[0]] = pair[1];
      });
    }

    this.view = new Scenes.coldwar(this.el, opts);
    this.view.start();
  };

  this.bindKeys = function(){
    var self = this;
    window.addEventListener("keydown", self.onKey.bind(this));
  };

  this.onKey = function(e){
    //console.log(e.which);
    switch(e.which){

    case 9:
      // tab
      e.preventDefault();
      if(this.view.hasOwnProperty('toggleMeta')){
        this.view.toggleMeta();
      }
      break;

      // enter
    case 13:
      this.render();
      // restart scene
      break;
    }
  };

};

var app = new App();

document.addEventListener("DOMContentLoaded", function(event) {
  app.start();
});
