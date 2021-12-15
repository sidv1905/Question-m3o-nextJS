import Head from "next/head";
import Image from "next/image";
import client from "../apis/apollo-client";
import { queryGet } from "../apis/queries/getAnswers";
import styles from "../styles/Home.module.css";
import SearchComponent from "../components/SearchComponent";
import { useRouter } from "next/router";
import Header from "../components/Header";
import localeJSON from "../locales/locale.json";

export default function Home({ data }) {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  console.log(localeJSON);

  console.log(locale, locales, defaultLocale, "NEXTJS LOCALE");
  console.log("question + data from server", data);

  return (
    <div className={styles.container}>
      <Header rightHeader={localeJSON[locale]} />
      <SearchComponent Serverdata={data} title={localeJSON[locale]} />
    </div>
  );
}
export async function getServerSideProps({ query }) {
  const question = query.question;
  if (query.question) {
    console.log(query.question, "query params");
    const { data } = await client.query({
      query: queryGet,
      context: { clientName: "rest" },
      variables: {
        input: {
          query: question,
        },
      },
    });

    console.log(question, data, " in server");
    return {
      props: {
        data: data,
      },
    };
  } else {
    return {
      props: {
        data: null,
      },
    };
  }
}
