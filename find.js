chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  // message.searchText is the text that was captured in the popup    
  // Search/Highlight code goes here
    //alert("Swag to the max" + message.searchString[0]);
    
   if( document.readyState == "complete") {
       for (var i = 0 ; i < message.searchString.length; i++ ) { 
           console.log(message.searchString[i]);   
       }
       
       var time =new Date(); 
       var n=time.getTime();
       var iM = message.searchString.length;
       for(var j = 0 ; j < iM; j++ ) { 

            var text = message.searchString[j];
            text =text.trim();
            if(text.replace(" ", "").length - text.length != 0 ) { 
                continue;
            }
            console.log(text);
            var divs = document.getElementsByTagName("HTML");
            var query = new RegExp("(\\b" + text + "\\b)", "gim");
            console.log(query);
           var l = divs.length; 
            try{
                e = document.documentElement.innerHTML;
                console.log("Found innerHTML");
                console.log(e);
            }catch( ex ) {
                console.log("An error happened D: "+ ex);
            }
            if( e != "" ) {
                //console.log(e);
                var enew = e.replace(/(<mark>|<\/mark>)/igm, "");
                console.log("replacing old string" );
                document.documentElement.innerHTML = enew;
                var newe = e.replace(query, "<mark>"+text+"</mark>");
                console.log("setting new string");
                document.documentElement.innerHTML = newe;
            }
        
       }
   }
   console.log("Done.");
    var time2 = new Date(); 
    
    console.log("That took: " +time2.getTime()-n);

    
});