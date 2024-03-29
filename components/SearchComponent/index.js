import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import styles from "./SearchComponent.module.css";
import { queryGet } from "../../apis/queries/getAnswers";
import { BiSearchAlt } from "react-icons/bi";
import { IconContext } from "react-icons";
import AnswerDisplayComponent from "../AnswerDisplayComponent";
import client from "../../apis/apollo-client";
import { notify } from "../../pages";
export default function SearchComponent({ Serverdata, title }) {
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
    // Check if in apollo client cache if not then go for server side
    try {
      const data = client.readQuery({
        query: queryGet,
        context: { clientName: "rest" },
        variables: {
          input: {
            query: question,
          },
        },
      });
      if (data) {
        notify("Data From Cache ! Yes We have it");
        console.log(data, "data from cache");
      } else {
        notify("Fetching for you from  m3o server");
        console.log("data from server");
      }
    } catch (err) {
      notify("Data From Cache ! Yes We have it");
      console.log(err, "err");
    } finally {
      getAnswer({
        context: { clientName: "rest" },
        variables: {
          input: {
            query: question,
          },
        },
      });
    }
  };

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
        <button type="submit" onClick={handleSubmit} id="search-button">
          <IconContext.Provider value={{ color: "white", size: 42 }}>
            <BiSearchAlt className="search-icon" height={100} width={100} />
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
