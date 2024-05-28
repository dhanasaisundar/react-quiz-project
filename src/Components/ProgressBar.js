import { useQuiz } from "../Context/QuizProvider";

function ProgressBar() {
  const { numQues, maxPoints, quesNo, points } = useQuiz();
  return (
    <div>
      <input
        type="range"
        min={0}
        max={14}
        value={quesNo}
        className="progress-input"
      />
      <div className="progress">
        <h3>
          Question {quesNo + 1}/{numQues}
        </h3>
        <h3>
          Points {points}/{maxPoints}
        </h3>
      </div>
    </div>
  );
}

export default ProgressBar;
