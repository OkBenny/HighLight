


chrome.runtime.onMessage.addListener(function(message,sender,respone){
    jQuery.fn.highlight=function(c){function e(b,c){var d=0;if(3==b.nodeType){var       a=b.data.toUpperCase().indexOf(c),a=a-(b.data.substr(0,a).toUpperCase().length-b.data.substr(0,a).length);if(0<=a){d=document.createElement("span");d.className="highlight";a=b.splitText(a);a.splitText(c.length);var f=a.cloneNode(!0);d.appendChild(f);a.parentNode.replaceChild(d,a);d=1}}else if(1==b.nodeType&&b.childNodes&&!/(script|style)/i.test(b.tagName))for(a=0;a<b.childNodes.length;++a)a+=e(b.childNodes[a],c);return d} return this.length&&c&&c.length?this.each(function(){e(this,c.toUpperCase())}):this};jQuery.fn.removeHighlight=function(){return this.find("span.highlight").each(function(){this.parentNode.firstChild.nodeName;with(this.parentNode)replaceChild(this.firstChild,this),normalize()}).end()};
    function find ( method) {
        window.numberOfWords = 20; 
        var numberOfWords = window.numberOfWords;
        var foundin = new  Array(); 
        // message.searchText is the text that was captured in the popup    
        // Search/Highlight code goes here
        //alert("Swag to the max" + message.searchString[0]);
        var ran = window.check_var;
        if( document.readyState == "complete" && ran == null ) {
            window.check_var = false;

            console.log(message.searchString);   
            var iM = message.searchString.length;


            var text = message.searchString;
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

