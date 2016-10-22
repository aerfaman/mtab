var app=angular.module('TabCard',[]);

app.controller('showTabController',function($scope,storageService){
	storageService.findAll(function(data){
		console.log(data);
		$scope.tabs=data;
		$scope.$apply();
	});
	$scope.removeTab=function(tab){
		storageService.remove(tab);
	}
	// $scope.closeButton={
	// 	show:false
	// }
	// $scope.showCloseButton=function($event){
	// 	$scope.closeButton.show=true;
	// 	console.log($event);

	// };
	// $scope.hideCloseButton=function(){
	// 	$scope.closeButton.show=false;
	// };
	$scope.removeAll=function(){
		storageService.removeAll();
	}
});
