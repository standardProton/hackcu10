import Image from "next/image";
import page from "../app/css/main_page.module.css";
import styles from "../app/css/main.module.css";
import globals from "../app/css/globals.css";
import { Button } from "@mui/material";
import Link from "next/link";

import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    if (document == undefined) return;
    
    const sine = document.getElementById("sine-img");
    const iid = setInterval(() => {
      var x = parseInt(sine.style.left)
      if (isNaN(x)) x = 0
      x = x % 384;
      sine.style.left = "" + (x-1) + "px";
    }, 60);
    return () => {clearInterval(iid);}
  });

  return (<>
    <div className={page.main}>
      <div className={page.header}>
        <div className={page.header_gradient}></div>
        <div className={page.sine_img_container}>
          <div className={page.sine_img} id="sine-img">
            <Image src="/sine.png" width="1920" height="50" alt="Sine"></Image>
          </div>
        </div>
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
              <div style={{marginTop: "50px"}}>
                <Link href="/search">
                  <Button variant="contained" style={{backgroundColor: "#CFB87C", minWidth: "200px", maxWidth: "200px", minHeight: "61px", maxHeight: "61px", fontSize: "14pt"}}>Get Started</Button>
                </Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  </>);
}
