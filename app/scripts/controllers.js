/**
 * Created by ruxica on 06/11/16.
 */
'use strict';

angular.module('confusionApp')
  .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

    $scope.dishes = menuFactory.getDishes();
    $scope.tab = 1;
    $scope.showDetails = false;

    $scope.select = function(setTab) {
      $scope.tab = setTab;
      if (setTab === 2) {
        $scope.filtText = "appetizer";
      }
      else if (setTab === 3) {
        $scope.filtText = "mains";
      } else if (setTab === 4) {
        $scope.filtText = "dessert";
      } else {
        $scope.filtText = "";
      }
    };
    $scope.isSelected = function(checkTab) {
      return ($scope.tab === checkTab);
    };
    $scope.toggleDetails = function() {
      $scope.showDetails = !$scope.showDetails;
    };
  }])

  .controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
      agree:false, email:"" };

    var channels = [{value: "tel", label: "Tel."},
      {value: "Email", label:"Email"}];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

  }])

  .controller('FeedbackController', ['$scope', function($scope) {

    $scope.sendFeedback = function() {
      // We have access to the feedback object as this controller is nested within the contact one
      // console.log($scope.feedback);
      if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
        $scope.invalidChannelSelection = true;
        console.log('incorrect');
      }
      else {
        $scope.invalidChannelSelection = false;
        $scope.feedback = {mychannel:"", firstName:"", lastName:"",
          agree:false, email:"" };
        $scope.feedback.mychannel="";

        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
    };

  }])

  .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

    $scope.dish = menuFactory.getDish(parseInt($stateParams.id,10));

    $scope.newcomment = {author:"", rating: 5, comment:"", date: new Date() };

    $scope.sendComment = function() {
      // console.log($scope.newcomment);
      $scope.dish.comments.push($scope.newcomment);
      $scope.newcomment = {author:"", rating: 5, comment:"", date: new Date() };
      $scope.commentForm.$setPristine();
    };

  }]);
