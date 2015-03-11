

var SearchText = ""; 

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
   SearchText = document.getElementById('searchString').value;
    
    if( SearchText != "" ) { 
        
        request = makeHttpObject(); 
        var url = "http://heyitsmartin.com/uniSearch/return.php?word="+SearchText;
        //var url = "http://google.com";
        request.onerror = function() { 
                alert("you fucked up");
            }
        request.onreadystatechange=function(){
            
            if(request.readyState==4 && request.status==200){ 
                console.log(request.responseText);
                sF(request.responseText);
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

function startFind(returnString) { 
    if(returnString != "") { 
        var sWords = returnString.split(","); 
        chrome.tabs.query({active:true,currentWindow:true}, function( tabs) { 
            chrome.tabs.executeScript(tabs[0].id, {file:"find.js"});
            chrome.tabs.sendMessage(tabs[0].id,{method:'find', searchString:sWords});
        });
    }
    
    
}

function submitSearch() { 
    var returnString = ""; 
    returnString = grabSyns(startFind); 
    
    
    
}

window.onload = function(){     
    
    //document.getElementById('searchButton').onclic = searchText;

   // alert(searchTest);
    var SearchButton = document.getElementById('searchButton'); 
    SearchButton.addEventListener("click", submitSearch );
                                     
}
