var tickElements = document.getElementsByClassName("tick");

var tickFunction = function() {
    var tickID = this.getAttribute("id");
    tickID = tickID.substring(4);
    console.log("working on: "+tickID);
    tickToggle(tickID);
};

for (var i = 0; i < tickElements.length; i++) {
    tickElements[i].addEventListener('click', tickFunction, false);
}

function tickToggle(tickID){

    var checkInput = document.getElementById("list"+tickID).hasAttribute("disabled");
    var inputValue = document.getElementById("list"+tickID).value;

    if( checkInput == false ){
        document.getElementById("list"+tickID).disabled = "true";
        tickedValue = 1;
    }else if( checkInput == true ){
        document.getElementById("list"+tickID).removeAttribute("disabled");
        tickedValue = 0;
    }

    updateValues( tickID, tickedValue, inputValue );
}

function updateChecklistToggle(number){
    chrome.storage.sync.get(['tickID'], function(result){
        console.log(result);
    });
}

function checkWhichPage(){

    for ( const item of fullList ){

        var pageNum = item.substring(0,3);
        var tickedStatus = document.getElementById("list"+item).hasAttribute("disabled");
        
        if( tickedStatus == true ){
            console.log(item + "ticked");
            if( item == "oneone" ){
                console.log("completed it");
                displayList("0");
            }
            continue;
        }else if ( tickedStatus == false ){
            console.log(item + " unticked");
            if( pageNum == "fou" ){
                displayList("4");
            }else if( pageNum == "thr" ){
                displayList("3");
            }else if( pageNum == "two" ){
                console.log("pageNum: "+pageNum);
                displayList("2");
            }else if( pageNum == "one" ){
                displayList("1");
            }
            break;
        }

    }

}

function hideAllLists(){
    var listsToHide = document.getElementsByClassName("list-container");
    for( i=0; i<listsToHide.length; i++ ){
        listsToHide[i].style.display = "none";
    }
}

function displayList(number){
    hideAllLists();

    document.getElementById("previous-view").style.display = "none";
    document.getElementById("next-view").style.display = "none";

    document.getElementById("list-"+number).style.display = "inline";

    if(parseInt(number)>1){
        document.getElementById("next-view").style.display = "inline";
    }
    if(parseInt(number)<4){
        document.getElementById("previous-view").style.display = "inline";
    }
}

function uncheckAll(){
    var allInputs = document.getElementsByClassName("listinput");
    for( i=0; i<allInputs.length; i++){
        allInputs[i].removeAttribute("disabled");
    }
    console.log("all values unchecked");
}

function checkAll(){
    var allInputs = document.getElementsByClassName("listinput");
    for( i=0; i<allInputs.length; i++){
        allInputs[i].disabled = "true";
    }
    console.log("all values checked");
}

function changeBackground(style){
    console.log("background setting: "+style);
    if(style=="light"){
        document.getElementById("site-container").style.backgroundImage = "";
        document.getElementById("site-container").style.backgroundColor = "#f2f1d5";
        console.log("background changed to light");
        chrome.storage.sync.set( { backgroundStyle:"light" }, function(){
            console.log("Background Preference Saved");
        });
    }else if(style=="dark"){
        document.getElementById("site-container").style.backgroundImage = "";
        document.getElementById("site-container").style.backgroundColor = "#383601";
        console.log("background changed to dark");
        chrome.storage.sync.set( { backgroundStyle:"dark" }, function(){
            console.log("Background Preference Saved");
        });
    }else if(style=="image"){
        document.getElementById("site-container").style.backgroundColor = "#000";

        document.getElementById("site-container").style.backgroundImage = "url('https://source.unsplash.com/random/1024x768')";
        console.log("background changed to image");
        chrome.storage.sync.set( { backgroundStyle:"image" }, function(){
            console.log("Background Preference Saved");
        });
    }
}