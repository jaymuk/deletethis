'use strict';

angular.module('core').controller('DashboardController', ['$scope', 'Authentication', 'Devices', 'Projects',
  function($scope, Authentication, Devices, Projects) {


    $scope.selectedProject = null;

    $scope.unassignedDevices = [];
    $scope.projects = [];

    $scope.listOfDevicesToAssign = [];

    $scope.loadData = function() {
        $scope.projects = Projects.query();
        $scope.unassignedDevices = Devices.getUnassigned();
    };

    $scope.addDeviceToList = function(device) {
        $scope.listOfDevicesToAssign.push(device);
    };


    $scope.assignSelectedDevices = function() {
        $scope.listOfDevicesToAssign.forEach(function(device) {

          $scope.selectedProject.devices.push(device._id);

            device.project = $scope.selectedProject._id;
            device.$update(function(response) {
                console.log(response);
            }, function(errorResponse) {
                console.log(errorResponse);
            });
      });
    };
  }
]);