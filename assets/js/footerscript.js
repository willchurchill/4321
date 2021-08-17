/* WATCH FOR TICKED ITEMS */
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
        document.getElementById("site-container").style.backgroundColor = "#EFEBE9";
        console.log("background changed to light");
        chrome.storage.sync.set( { backgroundStyle:"light" }, function(){
            console.log("Background Preference Saved");
        });
    }else if(style=="dark"){
        document.getElementById("site-container").style.backgroundImage = "";
        document.getElementById("site-container").style.backgroundColor = "#102027";
        console.log("background changed to dark");
        chrome.storage.sync.set( { backgroundStyle:"dark" }, function(){
            console.log("Background Preference Saved");
        });
    }else if(style=="image"){
        document.getElementById("site-container").style.backgroundColor = "#102027";

        document.getElementById("site-container").style.backgroundImage = "url('https://source.unsplash.com/random/1024x768')";
        console.log("background changed to image");
        chrome.storage.sync.set( { backgroundStyle:"image" }, function(){
            console.log("Background Preference Saved");
        });
    }
}

function loadBackgroundImage(){
    chrome.storage.sync.get( ["backgroundStyle"], function(result){
        if( result ){
            changeBackground( result.backgroundStyle );
        }else{
            changeBackground( "image" );
        }
    });
}

function nextView() {

    var val = document.getElementById("current-view").value;

    if( val ){}else{ val=4; }
    
    console.log("old page: "+val);
    var newVal = parseInt(val)-1;
    console.log("new page: "+newVal);
    document.getElementById("current-view").value = newVal.toString();

    displayList( newVal );

}

function previousView() {

    var val = document.getElementById("current-view").value;
    console.log("old page: "+val);
    var newVal = parseInt(val)+1;
    console.log("new page: "+newVal);
    document.getElementById("current-view").value = newVal.toString();

    displayList( newVal );

}

function finalView(){
    document.getElementById("list-1").style.display = "none";
    document.getElementById("list-0").style.display = "inline";
}

/* SAVE AND UPDATE LIST VALUES */
function updateValues( nName, nTicked, nValue ){

    for ( const item of fullList ){
        var cName = item;
        var cValue = document.getElementById('list'+item).value;
        var checkTicked = document.getElementById("list"+item).hasAttribute("disabled");
        if ( checkTicked == false ){
            var cTicked = 0;
        }else if ( checkTicked == true ){
            var cTicked = 1;
        }
        window["value"+cName] = { name: cName, value: cValue, ticked: cTicked };
    }

    if( nName == "fourone" ){
        valuefourone = { name: "fourone", value: nValue, ticked: nTicked };
    }else if( nName == "fourtwo" ){
        valuefourtwo = { name: "fourtwo", value: nValue, ticked: nTicked };
    }else if( nName == "fourthree" ){
        valuefourthree = { name: "fourthree", value: nValue, ticked: nTicked };
    }else if( nName == "fourfour" ){
        valuefourfour = { name: "fourfour", value: nValue, ticked: nTicked };
    }else if( nName == "threeone" ){
        valuethreeone = { name: "threeone", value: nValue, ticked: nTicked };
    }else if( nName == "threetwo" ){
        valuethreetwo = { name: "threetwo", value: nValue, ticked: nTicked };
    }else if( nName == "threethree" ){
        valuethreethree = { name: "threethree", value: nValue, ticked: nTicked };
    }else if( nName == "twoone" ){
        valuetwoone = { name: "twoone", value: nValue, ticked: nTicked };
    }else if( nName == "twotwo" ){
        valuetwotwo = { name: "twotwo", value: nValue, ticked: nTicked };
    }else if( nName == "oneone" ){
        valueoneone = { name: "oneone", value: nValue, ticked: nTicked };
    }

    chrome.storage.sync.set( { inputValues : [ 
        valuefourone, valuefourtwo, valuefourthree, valuefourfour, 
        valuethreeone, valuethreetwo, valuethreethree, 
        valuetwoone, valuetwotwo,
        valueoneone 
    ] }, function(){
        console.log("Values updated");
    } );
    
}

function saveValues(){

    for ( const item of fullList ){
        var cName = item;
        var cValue = document.getElementById('list'+item).value;
        var checkTicked = document.getElementById("list"+item).hasAttribute("disabled");
        if ( checkTicked == false ){
            var cTicked = 0;
        }else if ( checkTicked == true ){
            var cTicked = 1;
        }
        window["value"+cName] = { name: cName, value: cValue, ticked: cTicked };
    }

    chrome.storage.sync.set( { inputValues : [ 
        valuefourone, valuefourtwo, valuefourthree, valuefourfour, 
        valuethreeone, valuethreetwo, valuethreethree, 
        valuetwoone, valuetwotwo,
        valueoneone 
    ] }, function(){
        console.log("Values saved");
    } );

}

function resetValues(){

    chrome.storage.sync.set( { inputValues : 
        [
            { name: "fourone", ticked: 0, value: "" },
            { name: "fourtwo", ticked: 0, value: "" },
            { name: "fourthree", ticked: 0, value: "" },
            { name: "fourfour", ticked: 0, value: "" },
            { name: "threeone", ticked: 0, value: "" },
            { name: "threetwo", ticked: 0, value: "" },
            { name: "threethree", ticked: 0, value: "" },
            { name: "twoone", ticked: 0, value: "" },
            { name: "twotwo", ticked: 0, value: "" },
            { name: "oneone", ticked: 0, value: "" },
        ] 
    }, function(){
        console.log("Values reset");
    } );

    displayList(4);
    uncheckAll();
    fillListItems();

}