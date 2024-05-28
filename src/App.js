import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import Questions from "./Components/Questions";
import Footer from "./Components/Footer";
import Result from "./Components/Result";
import { useQuiz } from "./Context/QuizProvider";

function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Questions />
            <Footer />
          </>
        )}
        {status === "finished" && <Result />}
      </Main>
    </div>
  );
}

export default App;
