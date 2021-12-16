import Head from "next/head";
import Image from "next/image";
import client from "../apis/apollo-client";
import { queryGet } from "../apis/queries/getAnswers";
import styles from "../styles/Home.module.css";
import SearchComponent from "../components/SearchComponent";
import { useRouter } from "next/router";
import Header from "../components/Header";
import localeJSON from "../locales/locale.json";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export const notify = (message) => {
  toast(message, {
    icon: "👏",
    style: {
      borderRadius: "10px",
      background: "#2e3d58",
      color: "#fff",
    },
  });
};

export default function Home({ data }) {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  useEffect(() => {
    notify("Welcome !");
  });
  return (
    <div className={styles.container}>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <Header rightHeader={localeJSON[locale]} />
      <SearchComponent Serverdata={data} title={localeJSON[locale]} />
    </div>
  );
}
export async function getServerSideProps({ query }) {
  const question = query.question;
  if (query.question) {
    const { data } = await client.query({
      query: queryGet,
      context: { clientName: "rest" },
      variables: {
        input: {
          query: question,
        },
      },
    });

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
