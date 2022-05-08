let deckId = ''


fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
    
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });


document.querySelector('button').addEventListener('click', drawTwo)


function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`

  fetch(url)
  
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
       
        const playerOneImages = document.querySelectorAll('#player1 img') 
        const playerTwoImages = document.querySelectorAll('#player2 img')
        
        if (playerOneImages.length){  // if the length is not zero, this will run
          for (let i = 0; i < playerOneImages.length; i++){
            playerOneImages[i].src = data.cards[i].image
            playerTwoImages[i].src = data.cards[i+2].image // we're adding 2 to i here because our loop is only going to run twice, so in order to target data.cards[2] and [3], we need to increase i by two
          }
        }
        else{
          const playerOne = document.querySelector('#player1')
          const cardZero = document.createElement('img')
          const cardOne = document.createElement('img')
          cardZero.src = data.cards[0].image
          cardOne.src = data.cards[1].image
          playerOne.appendChild(cardZero)
          playerOne.appendChild(cardOne)
      
          const playerTwo= document.querySelector('#player2')
          const cardTwo = document.createElement('img')
          const cardThree = document.createElement('img')
          cardTwo.src = data.cards[2].image
          cardThree.src = data.cards[3].image
          playerTwo.appendChild(cardTwo)
          playerTwo.appendChild(cardThree)
        }

      

        let player1Val = convertToNum(data.cards[0].value) + convertToNum(data.cards[1].value)
       
        
        let player2Val = convertToNum(data.cards[2].value)+ convertToNum(data.cards[3].value)
       

        if(player1Val === 21) {
          document.querySelector('h3').innerText = 'Player 1 Wins'

        }else if(player2Val === 21 ){
            document.querySelector('h3').innerText = 'Player 2 Wins'
        
        }else if(player2Val > 21 && player1Val < 21){
            document.querySelector('h3').innerText = 'Player 1 Wins'

        }else if(player1Val > 21 && player2Val < 21){
            document.querySelector('h3').innerText = 'Player 2 Wins'
        
        }else if(player2Val === 21  && player1Val === 21 ){
            document.querySelector('h3').innerText = 'Tie!'
            
        }else if(player1Val > player2Val ){
            document.querySelector('h3').innerText = 'Player 1 Wins'
        
          }else if(player2Val > player1Val ){ 
            document.querySelector('h3').innerText = 'Player 2 Wins'} 

      });  
  
}

function convertToNum(val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
    return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{
    return Number(val)
  }
  console.log(val)
}


















