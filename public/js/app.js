const app = angular.module('DadJokes', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.jokes = []; //all dad jokes
  this.favorites = []; //push to for registered users favorites list
  this.update = 1; //can't remember why we set it to 1.
  this.jokeToUpdate = {};
  this.seeEditForm = false;
  this.allUsers = [];
  this.jokeText = ''; //New joke text
  this.jokeCount = ''; //Counts all jokes in our database
  this.allJokes = [];

  //function to request one dad joke from API
  this.getJokes = function(){
    $http({
      method: 'get',
      url: 'https://icanhazdadjoke.com/',
      headers: {'Accept':'application/json'}
    }).then(
      function(res){
        controller.jokes = res.data;
        console.log(controller.jokes);
      },
      function(err){
        console.log('getJokes error is: ', err);
      }
    );
  };

  //search jokes
 this.searchJokes = function(searchBox){
   $http({
     method: 'get',
     url: 'https://icanhazdadjoke.com/search?term=' + searchBox,
     headers: {'Accept': 'application/json'}

   }).then(
     function(res){
       console.log(searchBox);
       controller.search = res.data.results;
     },
     function(err){
       console.log('searchJokes error is: ', err);
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
          controller.getAllJokes();
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

  //request to update jokes
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
        controller.countJokes();
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
  };
  this.alternateEditStart = function(joke){
    this.jokeToUpdate = joke;
  };
  this.alternateEdit = function(id){
    $http({
      method: 'PUT',
      url: '/jokes/' + id,
      data: this.jokeToUpdate
    }).then(function(response){
      console.log('response received');
      controller.getAllJokes;
      controller.jokeToUpdate = {};
    }, function(error){
      console.log(error, 'error');
    })
  };
  //Gets a list of all users
  this.getAllUsers = function(){
    $http({
      method: "GET",
      url: '/users/listall'
    }).then(function(response){
      controller.allUsers = response.data
    }, function(error){
      console.log(error)
    })
  };





  //Add a joke to a user's favorites
  this.addToFavorites = function(id,joke){
    $http({
      method: "POST",
      url: '/jokes/favorite',
      data: {
        api_id: id,
        joke: joke
      }
    }).then(function(response){
      if (response.data) {
        console.log("THE JOKE HAS BEEN ADDED TO THE USER'S FAVORITES");
      } else {
        console.log('USER NOT LOGGED IN');
      }
    }, function(error){
      console.log(error);
    })
  };

  this.getJokes(); //callback to get jokes on page load
  this.countJokes();
  this.getAllJokes();
  this.getAllUsers();
}]); //end of controller
