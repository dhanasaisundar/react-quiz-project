import { useQuiz } from "../Context/QuizProvider";
import Timer from "./Timer";

function Footer() {
  const { handleDispatch } = useQuiz();
  return (
    <div className="app-header ">
      <Timer />
      <button className="btn btn-ui" onClick={() => handleDispatch("next")}>
        Next
      </button>
    </div>
  );
}

export default Footer;
