import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import styles from "./SearchComponent.module.css";
import { query } from "../../apis/queries/getAnswers";

const base_url = "https://api.m3o.com/v1/answer/Question";

export default function SearchComponent() {
  const [question, setQuestion] = useState("");
  const [getAnswer, { loading, error, data }] = useLazyQuery(query, {
    context: { clientName: "rest" },
    variables: {
      input: {
        query: "Google",
      },
    },
  });

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getAnswer({
      context: { clientName: "rest" },
      variables: {
        input: {
          query: question,
        },
      },
    });
  };

  console.log(data, loading, error);
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={styles.mainContainer}>
        <h1>Enter question</h1>
        <input
          type="text"
          id="search"
          placeholder="Search..."
          value={question}
          onChange={handleChange}
        />
        <button type="text" onClick={handleSubmit} id="search-button">
          Search
        </button>
        <div className={styles.answerBox}>
          <h3>Answer : {data?.getData?.answer}</h3>
        </div>
      </div>
    );
  }
}
