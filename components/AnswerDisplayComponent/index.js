import styles from "./AnswerDisplayComponent.module.css";
import backImage from "../../public/undraw_void_-3-ggu.svg";
import Loader from "react-loader-spinner";

export default function AnswerDisplayComponent({ answer, loading, question }) {
  console.log(answer);
  if (loading) {
    return (
      <div>
        {" "}
        <Loader
          type="Puff"
          color="#2e3d58"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    );
  } else {
    return (
      <div className={styles.answerContainer}>
        <h1>Result : </h1>
        <p>{answer.answer}</p>
        <a
          className="link"
          rel="noopener noreferrer"
          target="_blank"
          href={answer.url}
        >
          <div className={styles.card}>
            <div className={styles.background}>
              <img
                src={backImage.src}
                height={"100%"}
                width={"100%"}
                alt="answer"
              />
            </div>
            <div className={styles.realImage}>
              <img
                onError={(e) => {
                  e.target.style.display = "none";
                }}
                src={answer.image}
                height={"100%"}
                width={"100%"}
                alt=" "
              />
            </div>
            <p className={styles.bottom}> Click here to Know more..</p>
          </div>
        </a>
      </div>
    );
  }
}
