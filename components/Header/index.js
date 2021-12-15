import styles from "./Header.module.css";
import Image from "next/image";
import logo from "../../public/jurata.svg";
export default function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.left}>
        <Image
          unoptimized={true}
          src={logo}
          alt="logo"
          width={50}
          height={50}
        />
        <h4>QA-Bank</h4>
      </div>
      <div className={styles.right}></div>
    </div>
  );
}
