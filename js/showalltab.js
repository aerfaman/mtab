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
		// console.log(tab);
		chrome.tabs.create({'url':tab.url});
	};
});
app.controller('showTabController',function($scope,storageService){
	storageService.findAll(function(data){
		// console.log(data);
		// $scope.tabs=data;
		// $scope.$apply();
		var createAtStandard="";
		var result=[];
		var arrayBytime=[];
		// console.log(data);
		angular.forEach(data,function(val){
			var date=new Date(val.createat);
			// val.createat=date.toDateString();
			var createAtFromTab=date.toDateString();
			// console.log(createAtFromTab);
			// console.log(val);
			if (createAtStandard!=createAtFromTab) {
				// console.log(val);

				if (arrayBytime.length > 0){
					result.push(arrayBytime);
				}
				createAtStandard=createAtFromTab;
				arrayBytime=[];
				arrayBytime['timepoint']=createAtStandard;
				arrayBytime.push(val);
				// arrayBytime.push({timepoint:createAtStandard});
				return true;
			}
			// console.log(val);
			arrayBytime.push(val);
		});
		// console.log(result);
		result.push(arrayBytime);
		console.log(result);
		$scope.showtabs=result;
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
app.controller('showAllTabController',function($scope,storageService){
	storageService.findAll(function(data){
		// console.log(data);
		result=[];
		angular.forEach(data,function(val){
			result.push(val);
		});
		$scope.tabs=result;
		$scope.$apply();
	});
});
app.controller('activingtabController',function($scope,storageService){
	$activingtabs=[];
	$activingtabstmp=[];
	chrome.windows.getCurrent({populate:true},function(windows){
		// console.log(windows);
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
		// $scope.$apply();
	});

});
app.filter('toArray',function(){
	return function(obj){
		const result = [];
		angular.forEach(obj,function(val){
			var date=new Date(val.createat);
			val.createat=date.toDateString();
			result.push(val);
			// var date=new Date(val.createat);
			// val.createat=date.toDateString();
			// if (!result[val.createat]) {
			// 	result[val.createat]=[];
			// }
			// result[val.createat].push(val);
			// // console.log(result);
		});
		// console.log(result);
		return result;
	}

});
app.filter('toCreateAtBySameDay',function(){
	
	return function(obj){
		// console.log(obj)
		const result = [];
		// result['createat']=[];
		// var createAtStandard="";
		var createAtStandard="";
		angular.forEach(obj,function(val){
			var date=new Date(val.createat);
			// val.createat=date.toDateString();
			var createAtFromTab=date.toDateString();
			if (createAtStandard!=createAtFromTab) {
				createAtStandard=createAtFromTab;
				result.push({timepoint:createAtStandard});
			}
			result.push(val);
			
		});
		// console.log(result);
		return result;
	}

});
app.config(function($routeProvider){
    $routeProvider
    .when('/',{controller:'showAllTabController',templateUrl:'showall.html'})
    .when('/activingtabs',{controller:'activingtabController',templateUrl:'currenttab.html'})
    .otherwise({redirectTo:'/'});
});
