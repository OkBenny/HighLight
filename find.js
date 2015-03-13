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
        

        var text = message.searchString;
       //clean up search strings 
        for( var tLength = 0 ; tLength < text.length;tLength++) { 
            text[tLength] =text[tLength].trim();
        }
        
        console.log(text);
       //get html code
        var divs = document.getElementsByTagName("HTML");
        
        try{
            e = document.documentElement.innerHTML;
            console.log("Found innerHTML");
            console.log(e);
        }catch( ex ) {
            console.log("An error happened innerHtml could not be found  "+ ex);
        }
        if( e != "" ) {
            //console.log(e);
            
            //clear old highlights
            var enew = e.replace(/(<mark>|<\/mark>)/igm, "");
            document.documentElement.innerHTML = enew;
            var newe = e ; 
            for (var i = 0 ; i< text.length; i++ ) {
                //Don't search for term >1 word
                if(text[i].replace(" ", "").length - text[i].length != 0 ) { 
                    continue;
                }
                var query = new RegExp("(\\b" + text[i] + "\\b)", "gim");
                var newe = newe.replace(query, "<mark>"+text[i]+"</mark>");
            }
            console.log("setting new string");
            document.documentElement.innerHTML = newe;
        }

       
   }
   console.log("Done.");
    var time2 = new Date(); 
    
    console.log("That took: " +time2.getTime()-n);

    
});