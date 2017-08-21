const app = angular.module('DadJokes', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.jokes = []; //all dad jokes
  this.favorites = []; //push to for registered users favorites list
  this.update = 1; //can't remember why we set it to 1.
  this.jokeToUpdate = {};
  this.seeEditForm = false;
  this.jokeText = ''; //New joke text
  this.jokeCount = ''; //Counts all jokes in our database
  this.allJokes = [];

  //function to request one dad joke from API
  this.getJokes = function(){
    $http({
      method: 'get',
      url: 'https://icanhazdadjoke.com'
    }).then(
      function(res){
        controller.jokes = res.data;
        //make jokes random
        console.log(res.data, "response");
      },
      function(err){
        console.log('getJokes error is: ', err);
      }
    );
  };
  //request to create jokes
  this.createJoke = function(){
    $http({
      method: 'post',
      url: '/jokes',
      data: {

        joke: this.jokeText
      }
    }).then(
        function(res){
          controller.countJokes();
          controller.jokeText = '';
        },
        function(err){
          console.log('createJoke error is: ', err);
        }
    );
  };

  //Request to get a count of all the jokes in our database
  this.countJokes = function(){
    $http({
      method: 'get',
      url: '/jokes/count'
    }).then(function(response){
      controller.jokeCount = response.data
    }, function(error){
        console.log(error);
    });
  };
  //Request to get all jokes in our database
  this.getAllJokes = function(){
    $http({
      method: 'get',
      url: '/jokes/listall'
    }).then(function(response){
      controller.allJokes = response.data;
    }, function(error){
      console.log(error);
    })
  };

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
  };

  //request to delete jokes
  this.deleteJoke = function(id){
    $http({
      method: 'delete',
      url: '/jokes/' + id
    }).then(
      function(res){
        console.log(res);
        controller.getAllJokes();
      },
      function(err){
        console.log('deleteJoke error is: ', err);
      }
    )
  };
  this.toggleEditForm = function(){
    console.log('trying to toggle');
    this.seeEditForm = !this.seeEditForm;
  }

    // this.getJokes(); //callback to get jokes on page load
  this.countJokes();
  this.getAllJokes();
}]); //end of controller
