var app = angular.module("orcamentoForm", []);
app.controller("orcamentoCtrl", function ($scope, $http) {
	$scope.formData = {};
	$scope.processForm = function () {

		console.dir($scope.formData);
		$http({
			method: "POST",
			url: "http://64.225.8.81:8003/nobreforms.json",
			data: $.param($scope.formData),
			headers: { "Content-Type": "application/x-www-form-urlencoded"
			} }).then(function (){
                window.location = "http://nobrefood.com.br/enviado.html";
            });
		$scope.formData = {};
		$scope.orcamentoForm.$setPristine();
        $scope.orcamentoForm.$setUntouched();

           };

});

