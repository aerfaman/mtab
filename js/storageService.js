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
	var db = window.openDatabase(
 	 	'MTABDB',           // dbName
	  	'',            // version
	  	'test database',  // description
	  	2 * 1024 * 1024,  // estimatedSize in bytes
	  	function(db) {}   // optional creationCallback
	);
	this.db=db;
	this.db.transaction(function(transaction){
		// transaction.executeSql('create table if not exists mtab-tabs (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,title TEXT,url TEXT,icon TEXT)');
		transaction.executeSql('CREATE TABLE IF NOT EXISTS tabs (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,tabid INTEGER,title TEXT,url TEXT,icon TEXT,createat DATETIME)');
		// transaction.executeSql('INSERT INTO tabs (tabid, title, url, icon, createat ) VALUES (11122,"ssss","sdfs","sdfs","sdfsd")');
	});
	this.findAll = function(callback){
		this.db.transaction(function(transaction){
			alltab=[];
			transaction.executeSql('SELECT * FROM tabs', [], function (transaction, results) {
  			// var len = results.rows.length, i;
  			callback(results.rows);
  			// for (i = 0; i < len; i++) {
    	// 		// alltab.push(results.rows[i]);
    	// 		alltab[i]=results.rows[i];
  			// }
			});
		// _this.data=alltab;
		// callback(_this.data);
	});
		// chrome.storage.sync.get('allTab',function(keys){
		// 	// console.log(keys.allTab);
		// 	if (keys.allTab != ""){
		// 		_this.data=keys.allTab.tabGroups;

		// 		// for (var i=0; i<_this.data.length; i++){
		// 		// 	_this.data[i]['id'] = i+1;
		// 		// }
		// 		// console.log(_this.data);
		// 		callback(_this.data);

		// 	}
		// 	else{
		// 		_this.data=[];
		// 	}
		// });
	}
	// this.sync = function(){
	// 	// jsonData=angular.toJson(this.data);
	// 	this.fullData={
	// 		tabGroups:this.data
	// 	}
	// 	chrome.storage.sync.set({allTab:this.fullData},function(){
	// 		console.log('Tabs is stored in Chrome storage');
	// 	});
	// }
	this.add = function (newContent){
		
		var tab =newContent;
		// console.log(tab);
		this.db.transaction(function(transaction){
			// console.log(tab);
			// transaction.executeSql('create table if not exists mtab-tabs (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,title TEXT,url TEXT,icon TEXT)');
			// transaction.executeSql('CREATE TABLE IF NOT EXISTS tabs (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,title TEXT,url TEXT,icon TEXT,createat TEXT)');
			transaction.executeSql('INSERT INTO tabs (tabid, title, url, icon, createat ) VALUES ('+tab.id+',"'+tab.title+'","'+tab.url+'","'+tab.icon+'",'+tab.createat+')');
			// transaction.executeSql('INSERT INTO tabs (tabid, title, url, icon, createat ) VALUES (122,"ssss","chrome-extension://fjbokjeiaghgofcjfelboflhjihjejjk/index.html#!/","sdfs","sdfsd")');
		});
		// this.data.push(tab);
		// this.currentID++;
		// this.sync();
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