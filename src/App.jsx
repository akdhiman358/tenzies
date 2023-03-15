import React from 'react'
import Die from './Die'
import './App.css'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"
import Stats from './Stats'


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies,setTenzies] = React.useState(false)
  const [moves,setMoves] = React.useState(0)

  // cecking if all the dies are having the same value
  React.useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die=>die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("you fucking won")
    }
  },[dice])

  
  // generating a New Die
  function geterateNewDie(){
          return {
            value:Math.ceil(Math.random()*6),
            isHeld:false,
            id:nanoid()
          }
  }
  // creating a Dice with 10 dies in it
    function allNewDice(){
      const newDice = []
      for(let i=1;i<=10;i++)
      {
       newDice.push(geterateNewDie())
      } 
    return newDice
   }
    // Flipping the value of isHeld from True to False
    function holdDice(id)
    {
        setDice(oldDice =>{
          return oldDice.map(die => {
            return die.id === id ? {...die,isHeld: !die.isHeld} : die
          })
        })
    }

   

   //Creating 10 Dice Elements to render on the page
  const diceElements = dice.map(die=>
     <Die
         key = {die.id} 
         value={die.value} 
         isHeld = {die.isHeld} 
         holdDice = {()=>holdDice(die.id)} />)

   //Rolling the Dice on "Roll" button click
   function roll(){
    if(!tenzies){ 
                  setMoves(oldMoves => oldMoves +1)
                  setDice(oldDice=>{
                    return oldDice.map(die =>{
                      return die.isHeld ? die: geterateNewDie()
                    })
                  })
                }
    else{
      setTenzies(false)
      setDice(allNewDice())
      setMoves(0)
    }            
   }

  return (
  
  <main>
     {tenzies && <Confetti className='confetti'/>}
   
    <h1 className="title">Tenzies Game</h1>
    <p className="instructions">
      {tenzies ? `🎉 Congratulations... You won the Game 🎉`:
      "To Win this Game you need to get same number on all the dies. Click to freeze the same numbers and keep Rolling.."}
    </p>
    <div className='dice-container'>
      {diceElements}
    </div>
    <Stats moves= {moves}/>
    <button className='roll-btn' onClick={roll}>
      {tenzies ? 'New Game' : 'Roll'}
    </button>
  </main>
 
  
  )
}

export default App
