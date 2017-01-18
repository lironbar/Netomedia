'use strict';
angular.
module('app').
component('pageList', {
  templateUrl: 'app/layout/user-list/user-list.html',
  controller: ['$http', '$scope', 'ngDialog', 'GetUsersFactory', 'NewUserService',
  function mainCtrl($http, $scope, ngDialog, GetUsersFactory, NewUserService) {

    var newUserData;
    $scope.orderProp = "id";

    // Headline text fadeout.
    var divs = $('#titleSm, #titleLg');
    $(window).on('scroll', function () {
      var st = $(this).scrollTop();
      divs.css({ 'opacity' : (1 - st/280) });
    });

    // Get users from json and set value on scope.
    GetUsersFactory.get(function(users) {
      if (users) {
        $scope.users = users.data;
      }
      else {
        alert('Error: Could not get users.');
      }
    })

    // Add user function that opens a form in popup message.
    $scope.addUser = function() {
      ngDialog.open({
        template: 'app/layout/pop-up/pop-up.html',
        controller: ['$scope', 'NewUserService', function($scope, NewUserService) {
          // Submit form and fire getNewUser function.
          $scope.submitUserForm = function(user) {
            NewUserService.getNewUser(user);
          }
        }]
      });
    }
    // Add new user to $scope.users from form data.
    var newUserId;
    $scope.$on('addUserEvent', function(event, data) {
      if (data) {
        if($scope.users.length > 0) {
          newUserData = data.sendData;
          var lastUser = $scope.users[$scope.users.length - 1];
          newUserId = lastUser.id + 1;
        }
        else {
          newUserId = 1;
        }
        newUserData.id = newUserId;
        newUserData.status = "online";
        $scope.users.push(newUserData);
        ngDialog.close();
      }
      else {
        alert('Error: User could not be added to list.');
      }
    })

    // remove seletcted user (UI ONLY)
    $scope.removeUser = function(userId) {
      if (userId) {
        for(var i = 0; i < $scope.users.length; i++) {
          if($scope.users[i].id == userId) {
            var result = confirm("Are you sure you want to delete?");
            if (result) {
              $scope.users.splice(i,1);
            }
          }
        }
      }
      else {
        alert('Error: Could not delete user.')
      }


    }

  }]
});
