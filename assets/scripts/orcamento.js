var app = angular.module("orcamentoForm", []);
app.controller("orcamentoCtrl", function ($scope, $http) {
	$scope.formData = {};
	$scope.processForm = function () {

		console.dir($scope.formData);
		$http({
			method: "POST",
			url: "https://sotreqlab.herokuapp.com/form320cats.json",
			data: $.param($scope.formData),
			headers: { "Content-Type": "application/x-www-form-urlencoded"
			} }).then(function (){
                window.location = "https://sotreq.com.br/escavadeira320/enviado.html";
            });
		$scope.formData = {};
		$scope.orcamentoForm.$setPristine();
        $scope.orcamentoForm.$setUntouched();

           };

});

app.controller("orcamentoCtrl2", function ($scope, $http) {
	$scope.formData = {};
	$scope.processForm = function () {

		console.dir($scope.formData);
		$http({
			method: "POST",
			url: "https://sotreqlab.herokuapp.com/form320cats.json",
			data: $.param($scope.formData),
			headers: { "Content-Type": "application/x-www-form-urlencoded"
			} }).then(function (){
                window.location = "https://sotreq.com.br/escavadeira320/enviado2.html";
            });
		$scope.formData = {};
		$scope.orcamentoForm.$setPristine();
        $scope.orcamentoForm.$setUntouched();

           };

});
