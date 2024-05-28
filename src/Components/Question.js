import { useState } from "react";
import { useQuiz } from "../Context/QuizProvider";

function Question() {
  const { question, points, handleUserAnswer } = useQuiz();
  const [isClicked, setIsClicked] = useState(false);
  let ansClass;

  function handleAnswerBtn(index) {
    const totalPoints = question.points + points;
    handleUserAnswer(index, question.correctOption, totalPoints);
    setIsClicked(true);
  }

  return (
    <div>
      <h2>{question.question}</h2>
      <div className="options">
        {question.options.map((answer, index) => {
          const correctAns = index === question.correctOption;
          ansClass = correctAns ? "correct answer" : "wrong";
          return (
            <button
              key={answer}
              className={`btn btn-option ${isClicked ? ansClass : ""}`}
              onClick={() => {
                handleAnswerBtn(index);
              }}
              disabled={isClicked}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
