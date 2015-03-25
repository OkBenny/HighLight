chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    
    jQuery.fn.highlight=function(c){function e(b,c){var d=0;if(3==b.nodeType){var       a=b.data.toUpperCase().indexOf(c),a=a-(b.data.substr(0,a).toUpperCase().length-b.data.substr(0,a).length);if(0<=a){d=document.createElement("span");d.className="highlight";a=b.splitText(a);a.splitText(c.length);var f=a.cloneNode(!0);d.appendChild(f);a.parentNode.replaceChild(d,a);d=1}}else if(1==b.nodeType&&b.childNodes&&!/(script|style)/i.test(b.tagName))for(a=0;a<b.childNodes.length;++a)a+=e(b.childNodes[a],c);return d} return this.length&&c&&c.length?this.each(function(){e(this,c.toUpperCase())}):this};jQuery.fn.removeHighlight=function(){return this.find("span.highlight").each(function(){this.parentNode.firstChild.nodeName;with(this.parentNode)replaceChild(this.firstChild,this),normalize()}).end()};

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
            console.log(e);
        }catch( ex ) {
            console.log("An error happened innerHtml could not be found  "+ ex);
        }
        if( e != "" ) {
            //console.log(e);

            //clear old highlights
//            var enew = e.replace(/(<mark>|<\/mark>)/igm, "");
//            document.body.innerHTML = enew;
            var newe = e ; 
            for (var i = 0 ; i< text.length; i++ ) {
                //Don't search for term >1 word
                if(text[i].replace(" ", "").length - text[i].length != 0 ) { 
                    continue;
                }
                    console.log("Highlighting: "+text[i]);
                    $('div').highlight(text[i]);
//                var query = new RegExp("(\\b" + text[i] + "\\b)", "gim");
//                var newe = newe.replace(query, "<mark>"+text[i]+"</mark>");
            }
//            console.log("setting new string");
//            document.body.innerHTML = newe;
        }


    }
    console.log("Done.");
    

    
    return;

});