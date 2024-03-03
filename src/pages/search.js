import Image from "next/image";
import page from "../app/css/search_page.module.css";
import styles from "../app/css/main.module.css";
import globals from "../app/css/globals.css";
import { Button } from "@mui/material";
import Head from "next/head";

import { useState } from "react";

export default function Search() {

  const [results, setResults] = useState(null);

  return (
    <div className={page.main}>
      <div className={page.container}>
        <div className={styles.col1}>
          <div className={styles.box}>
            <h3>Paste your Resume:</h3>
            <textarea className={styles.textarea}>

            </textarea>
          </div>
        </div>
        <div className={styles.col2}>

        </div>
      </div>
    </div>
  );
}
