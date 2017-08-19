const app = angular.module('DadJokes', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.jokes = []; //all dad jokes
  this.favorites = []; //push to for registered users favorites list
  this.edit = 1; //can't remember why we set it to 1.

  //function to request dad jokes
  this.getJokes = function(){
    $http({
      method: 'get',
      url: '/jokes'
    }).then(
      function(res){
        controller.jokes = res.data;
        console.log(controller.jokes);
      },
      function(err){
        console.log('getJokes error is: ', err);
      }
    );
  },

  //request to create jokes
  this.createJoke = function(){
    $http({
      method: 'post',
      url: '/jokes',
      data: {
        user: this.user,
        joke: this.joke
      }
    }).then(
        function(res){
          controller.getJokes();
        },
        function(err){
          console.log('createJoke error is: ', err);
        }
    );
  }

  //request to upddate jokes
  this.updateJoke = function(joke){
    $http({
      method: 'put',
      url: '/jokes/' + joke._id,
      data: {
        user: joke.user,
        joke: this.updatedJoke
      }
    }).then(
      function(res){
        controller.getJokes();
      },
      function(err){
        console.log('updateJoke error is: ', err);
      }
    );
  },

  //request to delete jokes
  this.deleteJoke = function(joke){
    $http({
      method: 'delete',
      url: '/jokes/' + joke._id
    }).then(
      function(res){
        controller.getJokes();
      },
      function(err){
        console.log('deleteJoke error is: ', err);
      }
    )
  }

    this.getJokes(); //callback to get jokes on page load

}]); //end of controller
