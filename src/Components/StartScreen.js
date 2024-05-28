import { useQuiz } from "../Context/QuizProvider";

function StartScreen() {
  const { numQues, handleDispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to THe React Quiz</h2>
      <h3>{numQues} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => handleDispatch("startQuiz")}
      >
        Lets Start
      </button>
    </div>
  );
}

export default StartScreen;
