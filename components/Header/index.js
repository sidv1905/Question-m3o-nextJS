import styles from "./Header.module.css";
import Image from "next/image";
import logo from "../../public/jurata.svg";
import Link from "next/link";
import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { ImCross } from "react-icons/im";
export default function Header({ rightHeader }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleDrawer = () => {
    setShowMenu(!showMenu);
  };
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
      <div className={styles.right}>
        <Link href="/" locale="en">
          {rightHeader.English}
        </Link>
        <Link href="/" locale="de">
          {rightHeader.German}
        </Link>
      </div>

      <div className={styles.rightMobile} onClick={toggleDrawer}>
        <FaHamburger size="30" color="white" />
      </div>
      <div
        className={
          showMenu
            ? `${styles.languageDrawer} ${styles.activateDrawer}`
            : `${styles.languageDrawer}`
        }
      >
        <div className={styles.cross}>
          <ImCross size="30" color="white" onClick={toggleDrawer} />
        </div>
        <Link href="/" locale="en">
          {rightHeader.English}
        </Link>
        <Link href="/" locale="de">
          {rightHeader.German}
        </Link>
      </div>
    </div>
  );
}
