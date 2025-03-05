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
    function handleDeleteQuestion(id) {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setQuestions((prevQuestions) =>
            prevQuestions.filter((q) => q.id !== id)
          );
        })
        .catch((error) => console.error("Error deleting question:", error));
    }
  


    function handleUpdateQuestion(id, newCorrectIndex) {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex: newCorrectIndex }),
      }) 
        .then((response) => response.json())
        .then((updatedQuestion) => {
          setQuestions((prevQuestions) =>
            prevQuestions.map((q) => (q.id === id ? updatedQuestion : q))
          );
        })
        .catch((error) => console.error("Error updating question:", error));
    }

    
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
        <QuestionItem
        key={question.id}
        question={question}
        onDelete={handleDeleteQuestion}
        onUpdate={handleUpdateQuestion}
        />
      ))}
      </ul>
    </section>
  );
}

export default QuestionList;
