import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SliderComponent from './quizComponents/SliderComponent';
import RadioComponent from './quizComponents/RadioComponent';
import SelectComponent from './quizComponents/SelectComponent';
import TextInputComponent from './quizComponents/TextInputComponent';
import CheckboxComponent from './quizComponents/CheckboxComponent';
import '../style/main.css';

const QuizComponent = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const response = await fetch('http://localhost:8020/api/quiz/');
    const data = await response.json();
    setQuizzes(data);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const handleAnswerSubmission = (isCorrect) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const componentMapping = {
    radio: RadioComponent,
    text: TextInputComponent,
    select: SelectComponent,
    checkbox: CheckboxComponent,
    range: SliderComponent
  };

  return (
    <div className="quiz-container" id="pageStart">
      <Navbar />
      <h1>Quiz sobre música</h1>
      <form style={styles.formStyle}>
        {quizzes.map((quiz, quizIndex) => {
          const currentQuizQuestions = quiz.questions;
          const question = currentQuizQuestions[currentQuestionIndex];

          if (question) {
            const Component = componentMapping[question.questionType];
            if (Component) {
              return (
                <Component
                  key={`${quizIndex}-${currentQuestionIndex}`}
                  question={question}
                  handleAnswerSubmission={handleAnswerSubmission}
                />
              );
            } else {
              console.error(`No component found for question type: ${question.questionType}`);
            }
          }

          return null;
        })}

        <div>
          {currentQuestionIndex > 0 && (
            <button onClick={handlePreviousQuestion}>Previous</button>
          )}

          {currentQuestionIndex < quizzes.length - 1 ? (
            <button onClick={handleNextQuestion}>Next</button>
          ) : (
            <button onClick={() => console.log("View Score")}>View Score</button>
          )}
        </div>
      </form>
    </div>
  );
};

const styles = {
  formStyle: {
    margin: '10vw',
    padding: '5vw',
  }
}

export default QuizComponent;
