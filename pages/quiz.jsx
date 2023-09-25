'use client'

import React, {useState} from 'react'
import { quizz } from '@/data';

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
};

//takes us to the next question and calculate score
const nextQuestion = () => {
  setSelectedAnswersIndex(null)
  setResult((prev) =>
  selectedAnswers ? {
    ...prev,
     totalScore: prev.totalScore + 10,
     correctAnswer: prev.correctAnswer + 1,   
  }
  : {
    ...prev,
    wrongAnswer: prev.wrongAnswer + 1,
  }
  );

  if (activeQuestion !== questions.length -1) {
    setActiveQuestion((prev) => prev + 1);
  } else {
    setActiveQuestion(0);
    setDisplayResult(true);
  }

  setConfirm(false);
};

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

            {confirm ? (
            <button onClick={nextQuestion} className='btn'>
              {activeQuestion === question.length -1 ? 'finish' : 'Next'}
              </button>
              ) : (
              <button onClick={nextQuestion} disabled className='btn-disable'>
                {' '}
                 {activeQuestion === question.length -1 ? 'finish' : 'Next'}
              </button>
              )}
        </div>
        ) :  (
          
        <div className='quiz-container'>
          <h3>Results</h3>
          <h3>overall {(result.totalScore /25) * 100}%</h3>

          <p>Total Questions: <span>{questions.length}</span></p>

          <p>Total Score: <span>{result.totalScore}</span></p>

          <p>Correct Answers: <span>{result.correctAnswer}</span></p>

          <p>Wrong Answers: <span>{result.wrongAnswer}</span></p>

          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
        ) }
      </div>
    </div>
  );
};

export default quiz;
