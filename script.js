import cardsArr from "./cardNames.js"

let cardsArrTwin = [cardsArr];
const cardContainer = document.querySelector('#cards-container');
const cardChoiceContainer = document.querySelector('#card-choice-container')

const hudContainer = document.querySelector('.hud-container')
const hudTimer = document.querySelector('.hud-timer-box')
const boxOverlay = document.querySelector('.box-overlay')
const closeButt = document.querySelector('.closeButt')
const restButt = document.querySelector('.restButt')


const colorsArr = ['red', 'blue', 'green', 'orange', 'purple', 'white']
let isChosen = false;
let twinmode = false;
let chosenCard;
let fadeTop = "m3-animate-top";
let timer = 0;


// copyFunc copies the text to your clipboard
function copyFunc() {
  /* Get the text field */
  var copyText = document.getElementById("clipboard");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}

// function
window.onclick = myFunction;
// https://www.w3schools.com/jsref/event_onclick.asp
// If the user clicks in the window, set the background color of <body> to yellow
function myFunction() {
  const randomNum = Math.floor(Math.random() * Math.floor(colorsArr.length))
  document.getElementsByTagName("BODY")[0].style.background = colorsArr[randomNum]
}

// onclick of the SHUFFLE button, we begin shuffling out the cards on the table
// press the button and if the first item is whatever, do the thing.  else, shuffle?
document.getElementById("Button").onclick = function() {
  // try to put an icon here
  // document.createElement(<i class="fab fa-accessible-icon"></i>)
  // check for an empty array : 
  if (cardsArr.cards.length > 0) {
    // this if statement is unnecessary, but it does show that cardsArr [0] is first 
    if (cardsArr.cards[0].name  == "Plank"){
      // what does splice again? maybe this is like the for loop? o r is this the remover?
      var removedE = cardsArr.cards.splice(0, 1);
      // console.log("REMOVED", removedE)
      // put it in a div
      const charCard = document.createElement("div");
      // classes for css, including the idea to animate it in
      charCard.classList.add("card")
      charCard.classList.add(fadeTop)
      // id $ whatever the name of the card is (MJ FIRST if!)
      charCard.id = `${removedE[0].name}`
      // make the card flippable (using css )
      charCard.onclick = function(e){       
        togOverlay()
        setTimer(removedE[0].time)
        
        charCard.classList.toggle("hidden");
        isChosen ? null : isChosenFunc(e)
        
      }
      // give mj doubleclick
      charCard.ondblclick = function(e){
        console.log('dblclicked')
        // if chosen is true than null, if chosen is false then :
        // isChosen ? null : isChosenFunc(e)
      }
      // onmouseover effect
      // charCard.onmouseover 
      // this is what html the card has
      charCard.innerHTML = `
          <h2> ${removedE[0].name}</h2>
          <img src=${removedE[0].picture} alt="">
          <p> ${removedE[0].time}, ${removedE[0].sets}</p>
      `
      //   
      cardContainer.appendChild(charCard)
    }
    // this is the trueshuffling spot
    else {
      var optionsE = Math.floor(Math.random() * cardsArr.cards.length);
      var removedE = cardsArr.cards.splice(optionsE, 1);
      // console.log("REMOVED", removedE)
      for(var i = 0; i < removedE[0].sets; i++){
        const charCard = document.createElement("div");
          charCard.classList.add("card")
          // charCard.classList.add(fadeTop)
          // https://www.w3schools.com/w3css/w3css_animate.asp
          charCard.classList.add("m3-animate-top")
          // charCard.id = `${removedE[0].name}`
          // if sets =>1 -1 sets, but copy and rename reshuffle the modified card back into the deck.
          charCard.onclick = function(e){
            charCard.classList.toggle("hidden");
            isChosen ? null : isChosenFunc(e)
          }
          charCard.innerHTML = `
            <h2> ${removedE[0].name}</h2>
            <img src=${removedE[0].picture} alt="">
            <p> ${removedE[0].time}, 1 set</p>
          `
          
      //   what does this do again?
      // charCard.id = `${removedE[0].name}${i}`
      cardContainer.appendChild(charCard)
      }
      // document.getElementById("Answer").innerHTML = removedE[0];
    }
  
  } else {
    alert("the array is now empty");
    document.querySelector('#Button').remove()
  }
}


document.getElementById("twin").onclick = function(){
  let twinmode=true
  // select the play area (including images and selected character) and = copythat
  let copythat = document.querySelector('#play-table');
  // create thatcopy which is a .cloneNode(deep = troo)
  let thatcopy = copythat.cloneNode(true);
  // targets orig cards with card class .card classes in the orig cards container and makes it kids
  const kids = thatcopy.childNodes[3].childNodes
  thatcopy.id = 'twin-copy';
  document.body.appendChild(thatcopy);
  // dans debug solution: delete all the crap and make a cards constant 
  const cards = document.querySelectorAll('.card')
  // target all the bards and loop through them giving them the flip onclick toggle
  for (const el of cards){
    //if the el. with card class doesn't already have an onclick
    if (!el.hasAttribute('onclick')){
      el.classList.add('newtwin')
      // the ! reverses it: IF IT DOESN'T have the onclick! ex: !false = true 
      el.onclick = function(){
        // console.log("works")
        el.classList.toggle("hidden")
        // timerFunc(60)
        // mark the card somehow
        
      }
    }
  } 
}


const isChosenFunc = (e) => {
  let chosenCardElement;
  console.log("you chose", e.path[1].id)
  chosenCard = e.path[1].id

  console.log(cardsArr)
  //loop over cardsArr
  cardsArr.cards.forEach(card => {
    //find the index of matching object
    if(card.name == chosenCard){
      chosenCardElement = `
      <h2> ${card.name}</h2>
      <img src=${card.picture} alt="">
      `
    }
  })
  const chosenCharCard = document.createElement("div");
  chosenCharCard.innerHTML = `${chosenCardElement}`
  cardChoiceContainer.appendChild(chosenCharCard)
  isChosen = true;
}


// this is a mess or is it? it makes sense!
function setTimer(timer){
  timer += 3 
  hudTimer.innerHTML = `${timer} sec`
  // callback function
  const x = setInterval(function() {
    closeButt.onclick = function(){
      hudContainer.classList.remove('show')
      clearInterval(x)
    }
    hudTimer.innerHTML = `${timer} sec`
    if (timer <= 0 ){
      // clearInterval(x)
      hudTimer.innerHTML = `you win`
      if (timer <= -5){
      hudTimer.innerHTML = `you won already go do another`  
    clearInterval(x)  
    }
    } else{
      timer--
    }
  }, 1000)
}
function togOverlay(){
  // the essence of setOverlay without the ifs
  hudContainer.classList.add('show')
}