// function my_clock(el){
//     var today=new Date();
//     var h=today.getHours();
//     var m=today.getMinutes();
//     var s=today.getSeconds();
//     m=m>=10?m:('0'+m);
//     s=s>=10?s:('0'+s);
//     el.innerHTML = h+":"+m+":"+s;
//     setTimeout(function(){my_clock(el)}, 1000);
// }

// var clock_div = document.getElementById('clock_div');
// my_clock(clock_div);
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   alert('Turning ' + tab.url + ' red!');
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });
// chrome.tabs.query({
//     title: 'Google'
// }, function(tabArray){
//     console.log(tabArray);
// });


var app=angular.module('TabCard',[]);
// app.directive("test",function(){

// 		return{
// 			template:'<li>test</li>'
// 		}
// });
app.controller('getTabController',function($scope, storageService){
	$scope.storageService = storageService;
	$scope.storageService.findAll(function(data){
		$scope.tabs=data;
		$scope.$apply();
	});
	$scope.getCurrent=function(){
		chrome.tabs.getSelected(null,function(tab){
			if (tab.url=="chrome://newtab/"||tab.url==""||tab.url.indexOf('chrome://')==0||tab.url.indexOf('chrome-extension://')==0){
				console.log('url empty');
				return ;
			}
			if(tab.title==""){
				tab.url=tab.title;
			}
        	console.log(tab);
        	// chrome.pageCapture.saveAsMHTML({tabId:tab.id},function(mhtml){
        	// 	$scope.html=mhtml;
        	// });
        	$scope.tab={
        		id:tab.id,
        		icon:tab.favIconUrl,
        		title:tab.title,
        		url:tab.url,
        		html:$scope.html,
        	};
					console.log($scope.tab);
        	$scope.$apply();
        	storageService.add($scope.tab);
        	// window.close();
        	// chrome.pageCapture.saveAsMHTML({tabId:tab.id},function(mhtml){
        	// 	console.log(mhtml);
        	// });
    	});

		// chrome.storage.local.set({title:$scope.tabTitle},function(data){
		// 	console.log('success');
		// });
		// $scope.getTabTitle=[];
		// chrome.storage.local.get('title',function(data){
		// 	console.log(data);
		// 	// if(data.title!=null){
		// 	// 	$scope.getTabTitle=data.title;
		// 	// 	for (var i=0; i<data.title.length;i++){
		// 	// 		$scope.getTabTitle[i]['id']=i+1;
		// 	// 		$scope.$apply();
		// 	// 	}
		// 	// 	console.log($scope.getTabTitle);
		// 	// }
		// });

	}
	$scope.getAllTab = function(){
		chrome.windows.getCurrent({populate:true},function(window){

			window.tabs.forEach(function(tab){
				if (tab.url.indexOf('chrome://')==0||tab.url.indexOf('chrome-extension://')==0) {
					return;
				}
				$scope.tab={
					id:tab.id,
        	icon:tab.favIconUrl,
					title:tab.title,
					url:tab.url
				}
				$scope.$apply();
				storageService.add($scope.tab);
				chrome.tabs.remove(tab.id);

			});
            $scope.openHistory();
		});
	}
	$scope.openHistory = function(){
		chrome.tabs.create({'url':"index.html"},function(tab){
		});
	}
});
// app.controller('getTabController',function($scope){
// 	$scope.tabs=[];
// 	$scope.titles=[];
// 	$scope.urls=[];
// 	chrome.windows.getCurrent({populate:true},function(window){
// 			window.tabs.forEach(function(tab){
// 				var tabinfo=[
// 					{
// 						'title':tab.title,
// 						'url':tab.url
// 					}
// 				];
// 				$scope.tabs.push({'title':tab.title,'url':tab.url});
// 				// console.log(tabTitles.push(tab.title));
// 				$scope.$apply();
// 			});
// 		console.log($scope.tabs);
// 	});
// 	// $scope.titles=tabTitles;
// });


// chrome.windows.getAll({populate:true},function(windows){
// 	var template="";
// 	windows.forEach(function(window){
// 	    window.tabs.forEach(function(tab){
// 	      //collect all of the urls here, I will just log them instead
// 	      template=template+"<li>"+tab.title+"</li>";
// 	      // console.log("<li>"+tab.title+"</li>");
// 	  });
// 	});
// 	console.log(template);
// });

// chrome.tabs.query({highlighted: true }, function (tabs) {
//   console.log(tabs);
// });
