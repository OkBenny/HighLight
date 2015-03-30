    

var SearchText = ''; 
var words=null;
var counter =0 ; 
var request = null;


function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {alert("XMLHTTPREQUESTFAILED");}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}


function grabSyns(sF) {
    //loading message 
//    var img = new Image();
    var div = document.getElementById("loadDiv");
//    img.src = './load.gif';
//    img.style.height='30px';
//    img.style.width='30px';
//    div.appendChild(img)
    div.textContent= 'fetching words..';
    
    
    
   SearchText = document.getElementById('searchString').value;
    
    if( SearchText != "" ) { 
        
        request = makeHttpObject(); 
        //pls no ddos >_> 
        var url = "http://heyitsmartin.com/uniSearch/return.php?word="+SearchText;
        //var url = "http://google.com";
        request.onerror = function() { 
                alert("Something died");
            }
        request.onreadystatechange=function(){
            
            if(request.readyState==4 && request.status==200){ 
                console.log(request.responseText);
                div.textContent= 'highlighting...';
               
                var temp = request.response;
                temp = SearchText.concat(','+temp);
                sF(temp);
            }
        }
       try{
            //request.timeout=4000;
            request.open("GET",url,true);
            request.send(); 
       }catch (e) {
           alert("omg");
        
       }
    } 
    
    
}

function setDivs(divs) { 
    words = divs; 
    document.getElementById('loadDiv').textContent='';
}

//Send information to injected script 
function startFind(returnString) { 
    if(returnString != "") { 
        var sWords = returnString.split(","); 
        chrome.tabs.query({
            active:true,
            currentWindow:true
        }, function( tabs) { 
            chrome.tabs.executeScript(
                tabs[0].id, {
                file:"find.js"});
            
            chrome.tabs.sendMessage(tabs[0].id,
                                        {method:'find',
                                         searchString:sWords},
                                    setDivs);
        });
    }
}

function submitSearch() { 
    var returnString = ""; 
    returnString = grabSyns(startFind); 
}

function focusObj ( methodName,  object )  { 
  
        chrome.tabs.query({
            active:true,
            currentWindow:true
        }, function( tabs) { 
            chrome.tabs.executeScript(
                tabs[0].id, {
                file:"find.js"});
            
            chrome.tabs.sendMessage(tabs[0].id,
                                        {method:methodName,
                                         div:object});
        });

}

function goPrev() { 
    if(words==null) return;
    if(counter> 0 ) { 
        counter -- ; 
    }else { 
        counter = words.length-1 ;
    }
    focusObj('prev',words[0]);
    
    

}
function goNext() { 
    if(words==null) return;
    if(counter > words.length-1){
        counter++ ;
    }else{ 
        counter =0       ;
    }
     focusObj('next ',words[0]);


}

function clear(){ 
     chrome.tabs.query({
            active:true,
            currentWindow:true
        }, function( tabs) { 
            chrome.tabs.executeScript(
                tabs[0].id, {
                file:"find.js"});
            
            chrome.tabs.sendMessage(tabs[0].id,
                                        {method:'clear'});
        });

}

window.onload = function(){     
    document.getElementById("searchString").focus();
    //document.getElementById('searchButton').onclic = searchText;

    //Listner for search button 
    var SearchButton = document.getElementById('searchButton'); 
    SearchButton.addEventListener("click", submitSearch );
    
    //Listner for clear button 
    var SearchButton = document.getElementById('clear'); 
    SearchButton.addEventListener("click", clear );
    
    //Listner for prev arrow 
    //var SearchButton = document.getElementById('prev'); 
    //SearchButton.addEventListener("click", goPrev );
    
    //Listner for next arrow
   // var SearchButton = document.getElementById('next'); 
   // SearchButton.addEventListener("click", goNext );
    
    //Listener for textbox 
    document.getElementById("searchString").addEventListener("keydown",function(key) {
        if(key.keyCode == 13 ) { 
            submitSearch();
        }
    });                                
}
