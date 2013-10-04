/*
* Copyright (c) 2011 The Chromium Authors. All rights reserved.
* Use of this source code is governed by a BSD-style license that can be
* found in the LICENSE file.
*/

document.body.onclick = function(e){
  e = e || event;
  var from = findParent('a',e.target || e.srcElement);
  if (from){
	var current_time = (new Date() ).getTime();
     /* it's a link, actions here */
	//alert(e.target);
	if( e.target == "[object HTMLElement]")
	{
//toString()
		var str1 = "HTMLElement : ";
		var str2 = str1.concat(e.target.innerHTML);
		var str3 = "\ntitle : " + e.target.title + "\n";
		var str4 = e.target.innerText;

		var str5 = str2 + str3 + str4;
		var str6 = str4 + ":" + current_time;
		//var str6 = str5 + "body : " + e.target.document.body.innerHTML;
//		alert(str5);
		fileWrite(str6);
		//fileWrite('title : ' + e.target.title);
		//fileWrite('text : ' + e.target.innerText);
		//fileWrite('body : ' + e.target.document.body.innerHTML);
		
	} 
	else if( e.target == "[object HTMLSpanElement]")
	{
//toString()
		var str1 = "HTMLSpanElement : ";
		var str2 = str1.concat(e.target.innerHTML);
		var str3 = "\ntitle : " + e.target.title + "\n";
		var str4 = e.target.innerText;

		var str5 = str2 + str3 + str4;
		var str6 = str4 + ":" + current_time;
		//var str6 = str5 + "body : " + e.target.document.body.innerHTML;
//		alert(str5);
		fileWrite(str6);
		//fileWrite('title : ' + e.target.title);
		//fileWrite('text : ' + e.target.innerText);
		//fileWrite('body : ' + e.target.document.body.innerHTML);
		
	} 
	else if( e.target == "[object HTMLDivElement]")
	{
//toString()
		var str1 = "HTMLDivElement : ";
		var str2 = str1.concat(e.target.innerHTML);
		var str3 = "\ntitle : " + e.target.title + "\n";
		var str4 = "text : " + e.target.alt + "\n";

		var str5 = str2 + str3 + str4;
		var str6 = str2 + ":" + current_time;
		//var str6 = str5 + "body : " + e.target.document.body.innerHTML;
//		alert(str5);
		fileWrite(str6);
		//fileWrite('title : ' + e.target.title);
		//fileWrite('text : ' + e.target.innerText);
		//fileWrite('body : ' + e.target.document.body.innerHTML);
		
	} 

	else if( e.target == "[object HTMLImageElement]")
	{
//toString()
		var str1 = "HTMLImageElement : ";
		var str2 = str1.concat(e.target.innerHTML);
		var str3 = "\ntitle : " + e.target.alt + "\n";
		var str4 = "text : " + e.target.src + "\n";

		var str5 = str2 + str3 + str4;
		//var str6 = str5 + "body : " + e.target.document.body.innerHTML;
//		alert(str5);
//		fileWrite(str5);
		//fileWrite('title : ' + e.target.title);
		//fileWrite('text : ' + e.target.innerText);
		//fileWrite('body : ' + e.target.document.body.innerHTML);
		
	} 

	else {
		var str6 =  e.target+ ":" + current_time;
		fileWrite(str6);
	}
	
  }
}
//find first parent with tagName [tagname]
function findParent(tagname,el){
  if ((el.nodeName || el.tagName).toLowerCase()===tagname.toLowerCase()){
    return el;
  }
  while (el = el.parentNode){
    if ((el.nodeName || el.tagName).toLowerCase()===tagname.toLowerCase()){
      return el;
    }
  }
  return null;
}

function fileWrite(text){
	 fileWrite.count = ++fileWrite.count || 1;

/*	
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;	
	
	window.requestFileSystem(window.PERSISTENT, 5*1024*1024, function(fs) {
  		fs.root.getFile('historyurllog.txt', {create: false}, function(fileEntry) {

    			fileEntry.remove(function() {
      				console.log('File removed.');
    			}, errorHandler);

  		}, errorHandler);
	}, errorHandler);
*/	
	//window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;	
	
	if( fileWrite.count == 1 )
	{
		console.log('Here Count = ' , fileWrite.count);
		//owindow.webkitStorageInfo.requestQuota(window.PERSISTENT, 5*1024*1024, function(grantedBytes) {
//navigator.webkitTemporaryStorage
		window.webkitStorageInfo.requestQuota(window.PERSISTENT, 5*1024*1024, function(grantedBytes) {
 			window.requestFileSystem(window.PERSISTENT, grantedBytes, onInitFs, errorHandler);
			}, function(e) {
  				console.log('Error', e);
		});
	}
	

	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		
	window.requestFileSystem(window.PERSISTENT, 5*1024*1024 , function(fs) {
        	fs.root.getFile('historyurllog.txt', {create: false}, function(fileEntry) {
        	// Create a FileWriter object for our FileEntry (log.txt).
        	fileEntry.isFile = true;
        	fileEntry.name = 'historyurllog.txt';
        	fileEntry.fullPath = '/historyurllog.txt';

        	fileEntry.createWriter(function(fileWriter) {
        		
			fileWriter.seek(fileWriter.length); 
			
			fileWriter.onwriteend = function(e) {
                		console.log('Write History completed...'  + e.toString());
                		//console.log(url_all);
        		};

        		fileWriter.onerror = function(e) {
                		console.log('Write History failed: ' + e.toString());
        		};

	
        		// Create a new Blob and write it to log.txt.
        		var blob = new Blob([ "\n" + text  ], {type: 'text/plain'});
                	fileWriter.write(blob);

                	}, errorHandler);
                	}, errorHandler);

        		console.log('Write History completed.');
	}, errorHandler);	
	
}

    function onInitFs(fs) {

		console.log("Name : " + fs.root.fullPath);
		
		try{

	  		fs.root.getFile('historyurllog.txt', {create: true, exclusive: true}, function(fileEntry) {
	    			// Create a FileWriter object for our FileEntry (log.txt).
				fileEntry.isFile = true;
	        		fileEntry.name = 'historyurllog.txt';
	        		fileEntry.fullPath = '/historyurllog.txt';
	
	    			fileEntry.createWriter(function(fileWriter) {
		
					fileWriter.seek(fileWriter.length);
	
	      				fileWriter.onwriteend = function(e) {
	        				console.log('Write completed...'  + e.toString());
	      				};
	
	      				fileWriter.onerror = function(e) {
	        				console.log('Write failed: ' + e.toString());
	      				};
	
	      				// Create a new Blob and write it to log.txt.
	      				var blob = new Blob(["SWADHIN_MAGIC" + "\n"], {type: 'text/plain'});
					fileWriter.write(blob);
	
				}, errorHandler);
	  		}, errorHandler);
		 } catch(ex) {

			console.log('Exception Caught');
		}
	
		console.log('Write completed.');
	}

	function errorHandler(e) {
  		var msg = '';
  		switch (e.code) {
    			case FileError.QUOTA_EXCEEDED_ERR:
      				msg = 'QUOTA_EXCEEDED_ERR';
      				break;
    			case FileError.NOT_FOUND_ERR:
      				msg = 'NOT_FOUND_ERR';
      				break;
    			case FileError.SECURITY_ERR:
      				msg = 'SECURITY_ERR';
      				break;
    			case FileError.INVALID_MODIFICATION_ERR:
      				msg = 'INVALID_MODIFICATION_ERR';
      				break;
    			case FileError.INVALID_STATE_ERR:
      				msg = 'INVALID_STATE_ERR';
      				break;
    			default:
      				msg = 'Unknown Error';
     				break;
			};

		//alert('Error: ' + msg);
	}
