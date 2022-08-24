import { useState } from 'react'

const Header = ({header}) => <h1>{header}</h1>

const Button = ({name, addReview}) => <button onClick={addReview}>{name}</button>

const StatisticLine = ({title, number, suffix=''}) => (
  <tr>
    <td>{title}</td>
    <td>{(Number.isNaN(number)) ? 0 : number}{suffix}</td>
  </tr>
  
)

const Statistics = ({good, neutral, bad}) => {
  if (good + bad + neutral > 0)
    return (
      <>
        <StatisticLine title='good' number={good}/>
        <StatisticLine title='neutral' number={neutral}/>
        <StatisticLine title='bad' number={bad}/>
        <StatisticLine title='all' number={good + neutral + bad}/>
        <StatisticLine title='average' number={(good - bad) / (good + neutral + bad)}/>
        <StatisticLine title='positive' number={good / (good + neutral + bad) * 100} suffix='%'/>
      </>
    )
  else
      return <p>No feedback given</p>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <Header header='give feedback'/>
      <Button name='good' addReview={addGood}/>
      <Button name='neutral' addReview={addNeutral}/>
      <Button name='bad' addReview={addBad}/>

      <Header header='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App