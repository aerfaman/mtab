// var app=angular.module('TabCard',['ngRoute']);
var app=angular.module('TabCard',['ngRoute']).config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);

app.controller('consoleController',function($scope,storageService){
	$scope.removeTab=function(tab){
		storageService.remove(tab);
	};
	$scope.removeAll=function(){
		storageService.removeAll();
	};
	$scope.openSavedTab = function(tab){
		console.log(tab);
		chrome.tabs.create({'url':tab.tabInfo.url});
	};
});
app.controller('showTabController',function($scope,storageService){
	storageService.findAll(function(data){
		// console.log(data);
		$scope.tabs=data;
		$scope.$apply();
});

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

});
app.controller('activingtabController',function($scope,storageService){
	$activingtabs=[];
	$activingtabstmp=[];
	chrome.windows.getCurrent({populate:true},function(windows){
		console.log(windows);
		windows.tabs.forEach(function(tab){
			$activingtabstmp={
				id:tab.id,
				icon:tab.favIconUrl,
				title:tab.title,
				url:tab.url
			};
			$activingtabs.push($activingtabstmp);
		});
		$scope.tabs=$activingtabs;
		$scope.$apply();
	});

});

app.config(function($routeProvider){
    $routeProvider.when('/',{controller:'showTabController',templateUrl:'showall.html'}).when('/activingtabs',{controller:'activingtabController',templateUrl:'currenttab.html'}).otherwise({redirectTo:'/'});
});
