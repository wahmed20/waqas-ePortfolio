"use strict";

//declaring variable

var httpRequest = false;

function getRequestObject() {

    try {

        httpRequest = new XMLHttpRequest();

    }

    catch (requestError) {

        //display city and state field and labels for manual input

        document.getElementById("csset").style.visibility = "visible";

        //remove event listener so additional input is ignored

        var zip = document.getElementById("zip").value;

        if (zip.addEventListener) {

            zip.removeEventListener("keyup", checkInput, false);

        }

        else if (zip.attachEvent) {

            zip.detachEvent("onkeyup", checkInput);

        }

        return false;

    }

    return httpRequest;

}

//function checkInput()

function checkInput()

{

    var zip = document.getElementById("zip").value;

    //checking zip length

    if(zip.length===5)

    {

        getLocation();//function call

    }

    else{

        document.getElementById("city").value="";//clear entry

        document.getElementById("state").value="";//clear entry

    }

}

//function getLocation()

function getLocation()

{

    var zip = document.getElementById("zip").value;//get zip

    if(!httpRequest)

    {

        httpRequest=getRequestObject();

    }

    httpRequest.abort();

    httpRequest.open("get","http://api.zippopotam.us/us/"+zip,true);

    httpRequest.send();

    httpRequest.onreadystatechange=displayData;

}

//function displayDate()

function displayData()

{

    if(httpRequest.readyState===4 && httpRequest.status===200)

    {

        var resultData=JSON.parse(httpRequest.responseText);

        var city=document.getElementById("city");
        city.disabled=true;

        var state=document.getElementById("state");
        state.disabled=true;

        city.value=resultData.places[0]["place name"];

        state.value=resultData.places[0]["state abbreviation"];

        document.getElementById("zip").blur();

        document.getElementById("csset").style.visibility="visible";

    }

}

var zip = document.getElementById("zip");

if (zip.addEventListener) {

    zip.addEventListener("keyup", checkInput, false);

}

else if (zip.attachEvent) {

    zip.attachEvent("onkeyup", checkInput);

}

// declaring variables
var list = []
var evt;
// This function generateList() check and removes any existing "li" elements in the document. For loop creates a
// new "li" element with each Array element and also creates the content as well as first & last button is created
// with span element. Event listner with move the First button to the top and Last button to the bottom. 
function generateList()
{
    var listItems = document.getElementsByTagName("li");
    for (var i = listItems.length - 1; i >= 0; i--) 
    {
        document.getElementsByTagName("ol")[0].removeChild(listItems[i]);
    }
    for (var i = 0; i < list.length; i++)
    {
        var zip = "<span class='first'>Top</span>" + "<span class='last'>Bottom</span>" + list[i];
        var newListItem = document.createElement("li");
        newListItem.innerHTML = zip;
        document.getElementsByTagName("ol")[0].appendChild(newListItem);
        var firstButtons = document.querySelectorAll(".first");
        var lastFirstButton = firstButtons[firstButtons.length - 1];
        var lastButtons = document.querySelectorAll(".last");
        var lastLastButton = lastButtons[lastButtons.length - 1];
        if (lastFirstButton.addEventListener)
        {
            lastFirstButton.addEventListener("click", moveToTop, false);
            lastLastButton.addEventListener("click", moveToBottom, false);
        }
        else if (lastFirstButton.attachEvent)
        {
            lastFirstButton.attachEvent("onclick", moveToTop);
            lastLastButton.attachEvent("onclick", moveToBottom);
        }
    }
}
// This function addItem() collects the value from the edit box to the end of list Array using the Push method. 
// After clearing the text from edit box, generateList() function is called. 
function addItem() 
{
    var city = document.getElementById("city");
    list.push(city.value);
    city.focus();
    city.value = "";
    zip.value = "";
    state.value = "";
    
    generateList();
}
// This function moveToTop() will be called once First button is clicked from the bottom of list
function moveToTop()
{
    if (evt == evt)
    {
        evt = window.event;
    }
    var callerElement = evt.target || evt.srcElement;
    var listItems = document.getElementsByTagName("li");
    var parentItem = callerElement.parentNode;
    for (var i = 0; i < list.length; i++)
    {
        if (parentItem.innerHTML.search(list[i]) !== -1)
        {
            var itemToMove = list.splice(i, 1);
            list.unshift(itemToMove);
        }
    }
    generateList();
}
// This function moveToBottom() will be called once Last button is clicked from Top of the list
function moveToBottom()
{
    if (evt == evt)
    {
        evt = window.event;
    }
    var callerElement = evt.target || evt.srcElement;
    var listItems = document.getElementsByTagName("li");
    var parentItem = callerElement.parentNode;
    for (var i = 0; i < list.length; i++)
    {
        if (parentItem.innerHTML.search(list[i]) !== -1)
        {
            var itemToMove = list.splice(i, 1);
            list.push(itemToMove);
        }
    }
    generateList();
}
// This function createEventListener() will create an event listner for the buttons
function createEventListener()
{
    var addButton = document.getElementById("button");
    if (addButton.addEventListener) 
    {
        addButton.addEventListener("click", addItem, false);
    }
    else if (addButton.attachEvent)
    {
        addButton.attachEvent("onclick", addItem);
    }
}
if (window.addEventListener)
{
    window.addEventListener("load", createEventListener, false);
}
else if (window.attachEvent)
{
    window.attachEvent("onload", createEventListener);
}

