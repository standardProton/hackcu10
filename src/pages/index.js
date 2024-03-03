import Image from "next/image";
import page from "../app/css/main_page.module.css";
import styles from "../app/css/main.module.css";
import globals from "../app/css/globals.css";
import { Button } from "@mui/material";
import Link from "next/link";

import { useEffect, useState } from "react";
import PageMenu from "@/comps/PageMenu";

export default function Home() {

  const [loaded_page, setLoadedPage] = useState(false);

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

  useEffect(() => {
    if (!loaded_page){
      const load_cache = async () => {
        const headers = new Headers();
        headers.append('Content-Type', 'text/json');
        headers.append('cache-control', 'public, max-age=31536000, immutable, no-custom');
        fetch("/api/search", {headers});
        setLoadedPage(true);
      }
      load_cache();
    }
  })

  return (<>
    <div className={page.main}>
      <div className={page.header}>
        <div className={page.header_gradient}></div>
        <div className={page.sine_img_container}>
          <div className={page.sine_img} id="sine-img">
            <Image src="/sine.png" width="1920" height="50" alt="Sine"></Image>
          </div>
        </div>
        <PageMenu alignRight={true}></PageMenu>
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
