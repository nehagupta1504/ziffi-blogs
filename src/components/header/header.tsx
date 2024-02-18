import * as React from "react";
import styles from "../../styles/header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["logo"]}>
        <Link className={styles["logo-img"]} href="/">ZiffyB.</Link>
      </div>
      <div className={styles["header-options"]}>
        <Link className={styles['add-blog-link']} href="/addblog">Add Blog</Link>
      </div>
    </header>
  );
};
export default Header;
