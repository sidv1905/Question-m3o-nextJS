import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import SearchComponent from "../components/SearchComponent";
export default function Home() {
  return (
    <div className={styles.container}>
      <SearchComponent />
    </div>
  );
}
