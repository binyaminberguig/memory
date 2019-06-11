import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'
import './App.css'
import Card from './Card'
import GuessCount from './GuessCount'
import HallOfFame from './HallOfFame'
import HighScoreInput from './HighScoreInput'

import jamespot from 'jamespot-user-api'


console.log(jamespot);

const VISUAL_PAUSE_MSECS = 750
const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'

class App extends Component {
  state = {
    cards: this.generateCards(),  //tableau des cartes
    currentPair: [],              //currentPair represente l'index de la carte selectionne
    guesses: 0,                   //nbr d'essai
    halloffame: null,             //tableau des scores
    matchedCardIndices: [],       //Indice des cartes reussies 
    
  }




  componentWillMount(){
    console.log('mount');

    
  }




// Arrow fx for binding recupere le tableau des scores
displayHallOfFame = (hallOfFame) => {
  this.setState({ hallOfFame })
}

  generateCards() {
    const result = []
    const size = SIDE * SIDE
    //melange des symboles
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      //.pop sert a supprimer le dernier element et a le retourne
      const card = candidates.pop()
      //je rajoute 2 fois les cartes
      result.push(card, card)
    }
    //je remelange la pioche
    return shuffle(result)
  }


// dire si une carte doit etre retourne ou affiche
  getFeedbackForCard(index) {  
    // je recupere l'indice de la premiere carte currentpair et l'indice des cartes retournees
  const { currentPair, matchedCardIndices } = this.state
  //.include signifie est ce que le tableau contient l'index
  //si l'index de la carte est deja dans la collec matché grace a la fonction handleclick
  const indexMatched = matchedCardIndices.includes(index)

  //si il y a une carte ou zero dans mon ancien tableau 
  if (currentPair.length < 2) {
    //si index matched ou si element courant(premier element de currentPair) j'affiche
    return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
  }

  //pour les deux cartes du tableau current
  if (currentPair.includes(index)) {
    //si l 'index de la carte selectionne est dans les cartes matchés alors justMatched sinon justMismatched
    return indexMatched ? 'justMatched' : 'justMismatched'

  }

  return indexMatched ? 'visible' : 'hidden'
}
  

handleApiClick(){

 /* jamespot.user.signIn('antony.meunier@jamespot.com', 'A').then((response) => {
      console.log(response);
    })
*/

  jamespot.user.autocomplete('a').then((response) => {
      console.log(response);
    })
}

  // Arrow fx for binding
  //fonction handlecardclick qui prend un index en param
handleCardClick = index => {
  //la carte actuelle recupere les states de l'objet actuel
  const { currentPair } = this.state

  //si 2 carte etaient decouvertes
  if (currentPair.length === 2) {
    return
  }
  //si 1 cartes decouverte car dans le passe le tableau etait vide
  if (currentPair.length === 0) {
    //je rajoute la carte actuelle a currentPair
    this.setState({ currentPair: [index] })
    return
  }
  //si je clique sur la deuxieme carte dans mon tableau il y a une carte dans mon tableau current
  this.handleNewPairClosedBy(index)
}

  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state

    const newPair = [currentPair[0], index]
    const newGuesses = guesses + 1
    //Verification si les deux cartes sont egales
    const matched = cards[newPair[0]] === cards[newPair[1]] && newPair[0]!==newPair[1]
    this.setState({ currentPair: newPair, guesses: newGuesses })
    if (matched) {
      //si c'est les memes cartes je modifie l'indice des cartes matchés en ajoutant les nouvels indices
      this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
    }
   
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
  }

 render() {
  //au debut du render je dois recuperer les variables locales (le state)
   
  const { cards, guesses, hallOfFame, matchedCardIndices } = this.state
  // won prend la variable vrai si les cartes matchées sont egales au nbr de carte total
  const won = matchedCardIndices.length === cards.length

  return (
    <div className="memory">
      <button onClick={this.handleApiClick}>api test</button>
      <GuessCount guesses={guesses} />
     {
      // j'appelle chacune des images de cards, l'index est instancier automatiquement 
      //puis j'appelle les composants card un par un et je les instacie 
      // cards.map represente le changement du tableau cards 
        cards.map((card, index) => (
          <Card
            card={card}
            feedback={this.getFeedbackForCard(index)}
            index={index}
            key={index}
            onClick={this.handleCardClick}
          />
        ))
      }
     
          {won && 
             (hallOfFame ? (<HallOfFame entries={hallOfFame} />) 
                          : 
                          (<HighScoreInput guesses={guesses} onStored={this.displayHallOfFame} />))
          } 
         
        </div>
      )
  }
}

export default App