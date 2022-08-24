import { useState } from 'react'

const Header = ({heading}) => <h1>{heading}</h1>

const SelectButton = ({anecdotes, setSelected}) => {
  // Get random index from anecdotes array
  const getRandomInt = () => Math.floor(Math.random() * anecdotes.length)

  // Choose the anecdote with a random number
  const selectAnecdote = () => {
    const randomInt = getRandomInt()
    setSelected(randomInt)
    return anecdotes[randomInt]
  }

  return <button onClick={() => selectAnecdote()}>next anecdote</button>
}

const VoteButton = ({selected, points, setPoints}) => {
  // Add point to current anecdote
  const addPoint = () => {
    const copy = [...points]
    copy[selected]++
    setPoints(copy)
  }

  return <button onClick={() => addPoint()}>vote</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const highestVotesIndex = points.indexOf(Math.max(...points))

  return (
    <div>
      <Header heading='Anecdote of the day'/>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <div>
        <VoteButton selected={selected} points={points} setPoints={setPoints}/>
        <SelectButton anecdotes={anecdotes} setSelected={setSelected}/>
      </div>
      <Header heading='Anecdote with most votes'/>
      <p>{anecdotes[highestVotesIndex]}</p>
      <p>has {points[highestVotesIndex]} votes</p>
    </div>
  )
}

export default App