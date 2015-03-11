var SearchText = ""; 
var returnString = ""; 

function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}
  throw new Error("Could not create HTTP request object.");
}
    
function submitSearch() { 
    alert("hi");
    if( SearchText != "" ) { 
        var request = makeHttpObject(); 
        request.open("GET","http://heyitsmartin.com/uniSearch/return.php?word="+SearchText); 
        request.onreadystatechange=function(){
            if(request.readState==4){ 
                alert(request.responseText);
            }
        }
    }
}

alert("HELLO");