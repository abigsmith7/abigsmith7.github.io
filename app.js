const loadingContainer = document.getElementById("loading");
const loadingBar = document.getElementById("loading_innerBar");
const loadingText = document.getElementById("loading_text");
const loadingX_button = document.getElementById("loadingX_button");

const clock = document.getElementById("time");

const mainPage = document.getElementById("mainPage");

//Notepad Buttons
const aboutMePage = document.getElementById("notepad");
const aboutMeX_button = document.getElementById("notepad_title_x");
const aboutMeMin_button = document.getElementById("notepad_title_min");

//Paint Buttons
const paintPicPage = document.getElementById("paint");
const paintPicX_button = document.getElementById("paint_title_x");
const paintPicMin_button = document.getElementById("paint_title_min");

//MineSweeper Buttons
const mineSweeperPage = document.getElementById("minesweeper");
const mineSweeperX_button = document.getElementById("minesweeper_title_x");
const mineSweeperMin_button = document.getElementById("minesweeper_title_min");
const mineSweeperFlag_button = document.getElementById("flagModeButton");

//All Tab Buttons
const tab1Button = document.getElementById("tab1Button");
const tab2Button = document.getElementById("tab2Button");
const tab3Button = document.getElementById("tab3Button");
const tab4Button = document.getElementById("tab4Button");
const tab5Button = document.getElementById("tab5Button");

//All Tabs
const tab1 = document.getElementById("tab1");
const tab2 = document.getElementById("tab2");
const tab3 = document.getElementById("tab3");
const tab4 = document.getElementById("tab4");
const tab5 = document.getElementById("tab5");

//All Explore Buttons
const exploreButton = document.getElementById("explore");
const explorePanel = document.getElementById("explorepanel");
const exploreNotepad = document.getElementById("notepad_button");
const explorePaint = document.getElementById("paint_button");
const exploreProjects = document.getElementById("project_button");
const exploreMineSweeper = document.getElementById("mineSweeper_button");
const exploreContactMe = document.getElementById("contactMe_button");
const exploreSettings = document.getElementById("settings_button");
const exploreShutDown = document.getElementById("shutDown_button");

//Page Objects
const notepadArrayObject = {
    page: aboutMePage,
    text: "About Me - Notepad",
    layer: 4
}
const paintArrayObject = {
    page: paintPicPage,
    text: "untitled - Paint",
    layer: 5
}
const mineSweeperObject = {
    page: mineSweeperPage,
    text: "Minesweeper",
    layer: null
}

//Explore Button Program Opening Functions
exploreButton.onclick = function(){openExplore()};
exploreNotepad.onclick = function(){exploreOpenPage(notepadArrayObject)};
explorePaint.onclick = function(){exploreOpenPage(paintArrayObject)};
exploreMineSweeper.onclick = function(){exploreOpenPage(mineSweeperObject), initializeBoard(), renderBoard()};

//Loading Screen Button Functions
loadingX_button.onclick = function(){fadeOut(loadingContainer), disableButton(loadingX_button)};

//X Buttons Functions
aboutMeX_button.onclick = function(){exitApp(aboutMePage)};
paintPicX_button.onclick = function(){exitApp(paintPicPage)};
mineSweeperX_button.onclick = function(){exitApp(mineSweeperPage)};

//Minimize Buttons Functions
aboutMeMin_button.onclick = function(){minimizeApp(aboutMePage)};
paintPicMin_button.onclick = function(){minimizeApp(paintPicPage)};
mineSweeperMin_button.onclick = function(){minimizeApp(mineSweeperPage)}; //Add pause time on close/start time on open

//Tab Button Functions
tab1Button.onclick = function(){openClose(0)};
tab2Button.onclick = function(){openClose(1)};
tab3Button.onclick = function(){openClose(2)};
tab4Button.onclick = function(){openClose(3)};
tab5Button.onclick = function(){openClose(4)};

//MineSweeper Button Function
mineSweeperFlag_button.onclick = function(){flagModeSwitch()};

function flagModeSwitch(){
    if (gameOver == true){
        initializeBoard();
        renderBoard();
    } else {
        if (flagMode){
            flagMode = false;
            mineSweeperFlag_button.innerText = "off";
        } else if (!flagMode){
            flagMode = true;
            mineSweeperFlag_button.innerText = "on";
        }
    }
}

let loadingTime = 0;

function disableButton(button){
    button.disabled = true;
}

document.addEventListener("DOMContentLoaded", function loading(){
    if (loadingTime == 0) {
        loadingTime = 1;
        var width = 1;
        var id = setInterval(frame, 40);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                loadingTime = 0;
                loadingText.innerText = "Loading Complete."
                if (!loadingContainer.style.opacity > 0)
                {
                    fadeOut(loadingContainer);
                    disableButton(loadingX_button)
                }
            } else {
                width++;
                loadingBar.style.width = width + "%";
                if (width % 10 == 0){
                    if (loadingText.innerText == "Loading Portfolio . . ."){
                        loadingText.innerText = "Loading Portfolio ."
                    } else {
                        loadingText.innerText = loadingText.innerText + " ."
                    }
                }
            }
        }
    }
});

//clock
function currentTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let session = "AM";

    if (hh == 0){
        hh = 12;
    }
    if (hh > 12){
        hh = hh-12;
        session = "PM";
    }

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;

    let time = hh + ":" + mm + " " + session;

    clock.innerText = time;
    let t = setTimeout(function(){ currentTime() }, 1000);
}
currentTime();


//fade into main screen
function fadeIn(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 50);
    aboutMePage.style.zIndex = 40;
    paintPicPage.style.zIndex = 50;
}

function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
            fadeIn(mainPage);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

//tabs
let activeTabs = [notepadArrayObject,paintArrayObject];

function nameTabs() {
    for (let i = 0; i < activeTabs.length; i++){
        let currentTab = document.getElementById("tab"+(i+1)+"Button");
        currentTab.innerText = activeTabs[i].text;
    }
}

function exitApp(element) {
    for (let i = 0; i < activeTabs.length; i++) {

        element.style.opacity = 0;
        let closingTab = document.getElementById("tab"+(activeTabs.length));
        closingTab.style.opacity = 0;

        if (activeTabs[i].page == element){
            activeTabs.splice(i,1);
            nameTabs()
        }
    }
}

function minimizeApp(element) {
    for (let i = 0; i < activeTabs.length; i++) {
        element.style.opacity = 0;
        if (activeTabs[i].page == element){
            let closingTab = document.getElementById("tab"+(i+1));
            closingTab.style.borderTop = ("3px solid #ced3db")
            closingTab.style.borderLeft = ("3px solid #ced3db")
            closingTab.style.borderRight = ("3px solid #3b3e40")
            closingTab.style.borderBottom = ("3px solid #3b3e40")
        }
    }
}

function openClose(num) {
    let openedTab = document.getElementById("tab"+(num+1));
    if (window.getComputedStyle(activeTabs[num].page).opacity == 1){
        activeTabs[num].page.style.opacity = 0;
        openedTab.style.borderTop = ("3px solid #ced3db")
        openedTab.style.borderLeft = ("3px solid #ced3db")
        openedTab.style.borderRight = ("3px solid #3b3e40")
        openedTab.style.borderBottom = ("3px solid #3b3e40")
    } else {
        activeTabs[num].page.style.opacity = 1;
        openedTab.style.borderTop = ("3px solid #3b3e40")
        openedTab.style.borderLeft = ("3px solid #3b3e40")
        openedTab.style.borderRight = ("3px solid #ced3db")
        openedTab.style.borderBottom = ("3px solid #ced3db")
    }
}

//Explore
function openExplore(){
    if (window.getComputedStyle(explorePanel).opacity == 0){
        explorePanel.style.opacity = 1;
    } else {
        explorePanel.style.opacity = 0;
    }
}

function exploreOpenPage(element){
    if (!activeTabs.includes(element)){
        activeTabs.push(element)
        setTop(element.page);
        nameTabs();
        let openingTab = document.getElementById("tab"+(activeTabs.length));
        openingTab.style.opacity = 1;
        element.page.style.opacity = 1;
    }
}

document.onclick = function(e){
    if (window.getComputedStyle(explorePanel).opacity == 1){
        if (e.target.id != "explorePanel" && e.target.id != "explore" && e.target.id != "exploreButton"){
            explorePanel.style.opacity = 0;
        }
    }
}


//Dragging
dragElement(notepad);
dragElement(paint);
dragElement(minesweeper);

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(element.id + "_title")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(element.id + "_title").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
     element.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();

      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  //Appear on Top
aboutMePage.onmousedown = function(){setTop(aboutMePage)};
paintPicPage.onmousedown = function(){setTop(paintPicPage)};
mineSweeperPage.onmousedown = function(){setTop(mineSweeperPage)};

  function setTop(element) {
    for (let i = 0; i < activeTabs.length; i++){
        if (element == activeTabs[i].page && activeTabs[i].layer == 5){
            activeTabs[i].page.style.zIndex = 50;
            for (let j = 0; j < activeTabs.length; j++){
                if (activeTabs[j].layer == 5 && activeTabs[j].page != element){
                   activeTabs[j].layer--;
                   activeTabs[j].page.style.zIndex = (activeTabs[j].layer*10);
               }
           }
        } else if (element == activeTabs[i].page && activeTabs[i].layer != 5){
            for (let j = 0; j < activeTabs.length; j++){
                 if (activeTabs[j].layer > activeTabs[i].layer || activeTabs[i].layer == null){
                    activeTabs[j].layer--;
                    activeTabs[j].page.style.zIndex = (activeTabs[j].layer*10);
                }
            }
            activeTabs[i].layer = 5;
            activeTabs[i].page.style.zIndex = 50;
        }
    }
  }