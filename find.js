


chrome.runtime.onMessage.addListener(function(message,sender,respone){
  
    function find ( method) {
        window.numberOfWords = 20; 
        var numberOfWords = window.numberOfWords;
        var foundin = new  Array(); 
        // message.searchText is the text that was captured in the popup    
        // Search/Highlight code goes here
        //alert("Swag to the max" + message.searchString[0]);
        
        if( document.readyState == "complete"  ) {
            

            console.log(message.searchString);   
            var iM = message.searchString.length;


            var text = message.searchString;
            if(window.check_var == message.searchString[0]){ 
                console.log(window.check_var +' has already been highlighted');
                return;
            }else{ 
                window.check_var= message.searchString[0];
            }
            //clean up search strings 
            for( var tLength = 0 ; tLength < text.length;tLength++) { 
                text[tLength] =text[tLength].trim();
            }

            console.log(text);
            //get html code



            try{
                e = document.body.innerHTML;
                console.log("Found innerHTML");

            }catch( ex ) {
                console.log("An error happened innerHtml could not be found  "+ ex);
            }
            if( e != "" ) {
                var newe = e ; 
                window.text=text;
                if( numberOfWords >= text.length) { 
                    numberOfWords = text.length; 
                }
                //search for the original word: 

                for (var i = 0 ; i< numberOfWords; i++ ) {
                    //Don't search for term >1 word
                    if(text[i].replace(" ", "").length - text[i].length != 0 ) { 
                        continue;
                    }
                    console.log("Highlighting: "+text[i]);
                    $('div').highlight(text[i]);
                    //foundin= foundin.concat($('*:contains('+text[i]+')'));
                }

            }


        }
        console.log("Done.");


        //Tell popup page when search is done 
        //     chrome.tabs.query({active:true,currentWindow:true}, function( tabs) { 
        //     chrome.tabs.executeScript(tabs[0].id, {file:"find.js"});
        //     chrome.tabs.sendMessage(tabs[0].id,{method:'find', searchString:sWords});
        //    
        respone(foundin);
        return;

    }
    function prev (message) { 
        if(message.div!= null) {
            var focusDiv = message.div; 
            console.log(focusDiv.getText);
            //focusDiv.focus();
        }else { 
            console.log(message);
        }


    }
    function clear() { 
        console.log('removing highlights...');
        $('div').removeHighlight();
    }
    if(message.method =='find'){ 
        find(message);
    }else if (message.method == 'prev'){
        prev(message);
    }else if(message.method =='clear'){ 
        clear();
    }


});

