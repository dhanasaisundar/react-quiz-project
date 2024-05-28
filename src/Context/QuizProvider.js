import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading",
  quesNo: 0,
  points: 0,
  sessionTime: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      state = { ...state, questions: action.payload, status: "ready" };
      return state;
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        sessionTime: state.questions.length * SECS_PER_QUESTION,
      };
    case "userClicked":
      return { ...state, points: action.payload };
    case "next":
      if (state.quesNo === state.questions.length - 1) {
        state = { ...state, status: "finished" };
        return state;
      }
      return { ...state, quesNo: state.quesNo + 1 };
    case "timer":
      if (state.sessionTime === 0) {
        state = { ...state, status: "finished" };
        return state;
      }
      state = { ...state, sessionTime: state.sessionTime - 1 };
      return state;
    case "restart":
      return {
        ...state,
        status: "active",
        quesNo: 0,
        points: 0,
        sessionTime: state.questions.length * SECS_PER_QUESTION,
      };
    default:
      throw new Error("Unknown Action type");
  }
}
const QuizContext = createContext();
function QuizProvider({ children }) {
  const [{ questions, status, quesNo, points, sessionTime }, dispatch] =
    useReducer(reducer, initialState);
  const numQues = questions.length;
  const maxPoints = questions.reduce((accumulator, currentElement) => {
    return accumulator + currentElement.points;
  }, 0);
  const question = questions[quesNo];
  function handleDispatch(type) {
    dispatch({ type });
  }

  function handleUserAnswer(useAns, correctAns, points) {
    if (useAns === correctAns) {
      dispatch({ type: "userClicked", payload: points });
    }
  }

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => {
        dispatch({ type: "dataFailed" });
      });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        question,
        status,
        quesNo,
        points,
        sessionTime,
        numQues,
        maxPoints,
        handleDispatch,
        handleUserAnswer,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("Quiz Context used outside Quiz Provider");
  }
  return context;
}

export { QuizProvider, useQuiz };
