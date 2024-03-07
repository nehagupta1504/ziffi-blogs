import * as React from "react";
import styles from "../../styles/header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["logo"]}>
        <Link className={styles["logo-img"]} href='/'>
          ZiffyB.
        </Link>
      </div>
      <div className={styles["header-options"]}>
        <Link className={styles["add-blog-link"]} href='/blog/addblog'>
          <div className={styles["header-option"]}>
            <span className='icon icon-write'></span>
            <span className={styles["header-item"]}>Write</span>
          </div>
        </Link>
        <Link className={styles["notification"]} href='/notication'>
          <div className={styles["header-option"]}>
            <span className='icon icon-bell'></span>
          </div>
        </Link>
        <div className={styles["user-icon"]}>
            <div className={styles["header-option"]}>
              <span className='icon icon-user'></span>
            </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
