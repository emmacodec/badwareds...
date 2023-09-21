'use client'

import React, {useState} from 'react'
import { quizz } from './data'

const quiz = () => {

const [activeQuestion, setActiveQuestion] = useState(0);
const [selectedAnswers, setSelectedAnswers] = useState('');
const [confirm, setConfirm] = useState(false);
const [selectedAnswersIndex, setSelectedAnswersIndex] = useState(null);
const [displayResult, setDisplayResult] = useState(false);
const [result, setResult] = useState({totalScore: 0, correctAnswer: 0, wrongAnswer: 0 });

//destructuring
const {questions} = quizz;
const {question, answers, correctAnswer} = questions[activeQuestion];

//select and check answers
const onAnswerSelected = (answer, idx) => {
setConfirm(true);
setSelectedAnswersIndex(idx)
if (answer === correctAnswer) {
  setSelectedAnswers(true)
  console.log('true')
} else {
  setSelectedAnswers(false)
  console.log('false')
}
}

  return (
    <div className='container'>
      <h1>Questions Page</h1>
      <div>
        <h2>
            Questions {activeQuestion + 1}
            <span>/{questions.length}</span>
        </h2>
      </div>
      <div>
        {!displayResult ? (
        <div className='quiz-container'>

            {/*mapping through question*/}
            <h3>{questions[activeQuestion].question}</h3>
            {answers.map((answer, idx)=>(
                <li key={idx} onClick={() =>onAnswerSelected(answer, idx)} className={selectedAnswersIndex === idx ? 'li-selected' : 'li-hover'}>
                    <span>{answer}</span>
                </li>
            ))}
        </div>
        ) :  (
        <div className='quiz-container'></div>) }
      </div>
    </div>
  )
}

export default quiz;
