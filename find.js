chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  // message.searchText is the text that was captured in the popup    
  // Search/Highlight code goes here
    //alert("Swag to the max" + message.searchString[0]);
    
   if( document.readyState == "complete") {
       var time =new Date(); 
       var n=time.getTime();
       var iM = message.searchString.length;
       for(var j = 0 ; j < 1; j++ ) { 

            var text = message.searchString[j];
            text =text.trim();
            if(text.replace(" ", "").length - text.length != 0 ) { 
                continue;
            }
            console.log(text);
            var divs = document.getElementsByTagName("div");
            var query = new RegExp("(\\b" + text + "\\b)", "gim");
            console.log(query);
           var l = divs.length; 
            for (var i =0; i < l; i++ ) {   
                var id = "" ; 
                var e = "" ; 
                console.log("div: " +i +" at word: "+j);
                try{
                    e = divs[i].innerHTML;
                    console.log("Found innerHTML");
                    id = divs[i].id;
                    console.log("got id: "+id);
                    
                }catch( ex ) {
                    console.log("An error happened D: "+ ex);
                }
                if( e != "" ) {
                    //console.log(e);
                   // var enew = e.replace(/(<mark>|<\/mark>)/igm, "");
                   // console.log("replacing old string" );
                    if(id != ""){ 
                     //   document.getElementById(id).innerHTML = enew;
                    }else { 
                         //document.getElementsByTagName("div")[i].innerHTML = enew;
                    }
                    var newe = e.replace(query, "<mark>"+text+"</mark>");
                    console.log("setting new string");
                    if(id != ""){ 
                        document.getElementById(id).innerHTML = newe;
                    }else { 
                         document.getElementsByTagName("div")[i].innerHTML = newe;
                    }
                    e="";
                }
            }
       }
   }
   console.log("Done.");
    console.log("That took: " +time.getTime()-n);

    
});