fullList = ["fourone","fourtwo","fourthree","fourfour","threeone","threetwo","threethree","twoone","twotwo","oneone"];

window.onload=function(){

    // Event Listeners
    const elsave = document.getElementById("site-container");
    elsave.addEventListener("click", saveValues);

    const pView = document.getElementById("previous-view");
    pView.addEventListener("click", previousView);

    const nView = document.getElementById("next-view");
    nView.addEventListener("click", nextView);

    const elreset = document.getElementById("reset-list");
    elreset.addEventListener("click", resetValues);

    const elLinkClearAll = document.getElementById("settings-clear-all");
    elLinkClearAll.addEventListener("click", resetValues);
    const elLinkCheckAll = document.getElementById("settings-check-all");
    elLinkCheckAll.addEventListener("click", checkAll);
    const elLinkUncheckAll = document.getElementById("settings-uncheck-all");
    elLinkUncheckAll.addEventListener("click", uncheckAll);

    const elBackgroundLight = document.getElementById("settings-background-light");
    elBackgroundLight.addEventListener("click", function(){ changeBackground('light'); }, false);
    const elBackgroundDark = document.getElementById("settings-background-dark");
    elBackgroundDark.addEventListener("click", function(){ changeBackground('dark'); }, false);
    const elBackgroundImage = document.getElementById("settings-background-image");
    elBackgroundImage.addEventListener("click", function(){ changeBackground('image'); }, false);

    // Other load tasks
    fillListItems();
    loadBackgroundImage();
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

function fillListItems(){

    chrome.storage.sync.get( ["inputValues"], function(result){
        
        console.log("Full values: ");
        console.log(result);
        console.log("/end full values");

        for ( i=0; i<10; i++ ){
            var listName = "list"+result.inputValues[i].name;
            var listValue = result.inputValues[i].value;
            document.getElementById(listName).value = listValue;

            if ( result.inputValues[i].ticked == 1 ){
                document.getElementById( listName ).disabled = "true";
            }
        }
        
        checkWhichPage();

    } );
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