import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions", error));
    }, []);
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => (
        <li key={question.id}>{question.prompt}</li>
      ))}
      </ul>
    </section>
  );
}

export default QuestionList;
