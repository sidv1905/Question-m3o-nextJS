import client from "../apis/apollo-client";
import { queryGet } from "../apis/queries/getAnswers";
import styles from "../styles/Home.module.css";
import SearchComponent from "../components/SearchComponent";
import { useRouter } from "next/router";
import Header from "../components/Header";
import localeJSON from "../locales/locale.json";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Head from "next/head";
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
    if (locale == "en") {
      notify("Welcome To English Version !");
    } else if (locale == "de") {
      notify("Welcome To German Version !");
    }
  });
  return (
    <div className={styles.container}>
      <Head>
        {" "}
        <title>QA - Bank</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Have any Question ? Search for it here !"
        />
        <meta property="og:title" content="QA - Bank" key="ogtitle" />
        <meta
          property="og:url"
          content="https://twitter.com/SiddharthVaran4"
          key="ogurl"
        />
        <meta property="og:site_name" content="QA - Bank" key="ogsitename" />
        <meta property="og:title" content="QA - Bank" key="ogtitle" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
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
