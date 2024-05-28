import { useQuiz } from "../Context/QuizProvider";

function Result() {
  const { points, maxPoints, handleDispatch } = useQuiz();
  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> Your Total Score is {points}
      </p>
      <button className="btn btn-ui" onClick={() => handleDispatch("restart")}>
        Restart Quiz
      </button>
    </>
  );
}

export default Result;
