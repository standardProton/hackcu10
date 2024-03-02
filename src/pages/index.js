import Image from "next/image";
import styles from "../app/page.module.css";
import globals from "../app/globals.css";


export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>

      </div>
      <div className={styles.container}>
        <div className={styles.signup_container}>
          <div className={styles.box}>
            <h1>Find the perfect scholarship</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
