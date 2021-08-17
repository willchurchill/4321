/* DEFINE THE FULL LIST OF TODOS */
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

