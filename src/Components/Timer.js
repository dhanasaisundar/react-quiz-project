import { useEffect } from "react";
import { useQuiz } from "../Context/QuizProvider";

function Timer() {
  const { sessionTime, dispatch } = useQuiz();
  const minutes = Math.floor(sessionTime / 60);
  const seconds = sessionTime % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <button className="btn btn-ui timer">
      {minutes < 10 ? "0" + minutes : minutes}:
      {seconds < 10 ? "0" + seconds : seconds}
    </button>
  );
}

export default Timer;
