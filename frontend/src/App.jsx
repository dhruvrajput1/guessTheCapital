import axios from "axios";
import './App.css'
import { useEffect, useState } from "react";

function App() {

  const [quiz, setQuiz] = useState([]);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [index, setIndex] = useState(0);
  const [startedAndScored, setStartedAndScored] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/")
    .then((res) => {
      setQuiz(res.data);
      setIndex(generateRandomInteger(res.data.length)); // Set index after data is fetched
    })
    .catch((error) => {
      console.log(error);
    })
  }, [score]); // Dependency array includes score

  function generateRandomInteger(length) {
    return Math.floor(Math.random() * length);
  }


  const handleSubmit = () => {
    if (quiz.length > 0 && answer.toLowerCase() === quiz[index].capital.toLowerCase()) {
      setScore(score + 1);
      setAnswer(""); // Reset answer input
      setIndex(generateRandomInteger(quiz.length)); // Set new random index
    }
    else {
      setStartedAndScored(false);
    }
  }

  return startedAndScored ? (
    <>
      <h1>Write the capital of the Country: </h1>
      {quiz.length > 0 ? (
        <>
          <h2>{quiz[index].country}</h2>
          <input 
            autoFocus
            type="text" 
            placeholder="Enter your answer here" 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)} 
          />
          <hr />
          <button type="button" onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <p>Loading quiz...</p>
      )}
      <h3>Score: {score}</h3>
    </>
  ) : (
    <>
      <h2>Your answer is wrong.</h2>
      <h2>Final Score: {score}</h2>
      <h2>Click below to restart</h2>
      <button type="button" onClick={() => {
        setStartedAndScored(true);
        setScore(0);
        setIndex(generateRandomInteger(quiz.length));
        setAnswer("");
      }}>Restart</button>
    </>
    
  )
}

export default App;
