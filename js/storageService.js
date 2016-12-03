var app=angular.module('TabCard').config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);
app.service('storageService',function($q){
	var _this=this;
	this.data=[];
	this.fullData={tabGroups:[]};
	this.findAll = function(callback){
		chrome.storage.sync.get('allTab',function(keys){
			console.log(keys.allTab);
			if (keys.allTab != ""){
				_this.data=keys.allTab.tabGroups;

				// for (var i=0; i<_this.data.length; i++){
				// 	_this.data[i]['id'] = i+1;
				// }
				// console.log(_this.data);
				callback(_this.data);

			}
			else{
				_this.data=[];
			}
		});
	}
	this.sync = function(){
		// jsonData=angular.toJson(this.data);
		this.fullData={
			tabGroups:this.data
		}
		chrome.storage.sync.set({allTab:this.fullData},function(){
			console.log('Tabs is stored in Chrome storage');
		});
	}
	this.add = function (newContent){
		date=new Date();
		var tab =newContent;
		this.data.push({createdAt:Date.parse(date),tabInfo:tab});
		this.currentID++;
		this.sync();
	}
	this.remove = function (tab){
		this.data.splice(this.data.indexOf(tab),1);
		this.sync();
	}
	this.removeAll = function(tab){
		this.data=[];
		this.sync();
	}
});