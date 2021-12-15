import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import styles from "./SearchComponent.module.css";
import { queryGet } from "../../apis/queries/getAnswers";
import { BiSearchAlt } from "react-icons/bi";
import { IconContext } from "react-icons";
import AnswerDisplayComponent from "../AnswerDisplayComponent";

export default function SearchComponent({ Serverdata, title }) {
  console.log(Serverdata, "SERVER DATA");
  const [question, setQuestion] = useState("");
  const [getAnswer, { loading, error, data }] = useLazyQuery(queryGet, {
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

  return (
    <div className={styles.mainContainer}>
      <h1>{title.title}</h1>
      <div className={styles.inputSearch}>
        <input
          type="text"
          id="search"
          placeholder={title.Search}
          value={question}
          onChange={handleChange}
        />
        <button type="text" onClick={handleSubmit} id="search-button">
          <IconContext.Provider value={{ color: "white", size: 42 }}>
            <BiSearchAlt height={100} width={100} />
          </IconContext.Provider>
        </button>
      </div>
      {(data?.getData || loading || Serverdata) && (
        <AnswerDisplayComponent
          loading={loading}
          answer={data?.getData || Serverdata?.getData}
        />
      )}
    </div>
  );
}
