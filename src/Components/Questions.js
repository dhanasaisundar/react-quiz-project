import { useQuiz } from "../Context/QuizProvider";
import ProgressBar from "./ProgressBar";
import Question from "./Question";
function Questions() {
  const { question } = useQuiz();
  return (
    <div>
      <ProgressBar />
      <Question key={question.question} />
    </div>
  );
}

export default Questions;
