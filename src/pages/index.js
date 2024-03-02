import Image from "next/image";
import page from "../app/css/main_page.module.css";
import styles from "../app/css/main.module.css";
import globals from "../app/css/globals.css";

import { useState } from "react";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    if (document == undefined) return;

    const sine_svg = document.getElementById("sine-wave-svg");


  });

  return (
    <div className={page.main}>
      <div className={page.header}>
        <div style={{top: "0", width: "100%", height: "20px", backgroundColor: "#F0F"}}>
          <svg id="sine-wave-svg" height="100%" width="100%"></svg>
        </div>
        <div className={page.header_gradient}></div>
        <div className={page.header_menu_container}>
          <div className={styles.flex + " " + styles.hide_on_mobile}  style={{justifyContent: "right", gap: "10px"}}>
            <a href="https://google.com/">
              <div className={page.header_menu_item}>
                <span>Item 1</span>
              </div>
            </a>
            <div className={page.header_menu_item}>
              <span>Item 2</span>
            </div>
            <div className={page.header_menu_item}>
              <span>Item 3</span>
            </div>
          </div>
        </div>
      </div>
      <div className={page.content_container}>
        <div className={page.signup_container}>
            <div className={styles.box + " " + styles.margin_auto} style={{width: "35%", height: "300px"}}>
              <h1 style={{letterSpacing: "1px", fontSize: "40pt"}}>Find the perfect scholarship</h1>
            </div>
        </div>
      </div>
    </div>
  );
}
