import Image from "next/image";
import page from "../app/css/search_page.module.css";
import styles from "../app/css/main.module.css";
import globals from "../app/css/globals.css";
import { Button } from "@mui/material";
import Head from "next/head";

import { useState } from "react";
import PageMenu from "@/comps/PageMenu";

export default function Search() {

  const [results, setResults] = useState(null);
  const [left_width, setLeftWidth] = useState(70);
  const [error_text, setErrorText] = useState(null);

  function setPrimarySection(right){

    var curr_left_width = left_width;
    if (right){
      const iid = setInterval(() => {
        if (curr_left_width > 30){
          curr_left_width -= 1;
          setLeftWidth(curr_left_width);
        } else clearInterval(iid);
      }, 3);
    } else {
      const iid = setInterval(() => {
        if (curr_left_width < 70) {
          curr_left_width += 1;
          setLeftWidth(curr_left_width);
        } else clearInterval(iid);
      }, 3);
    }
  }

  async function search(){

    const majors = document.getElementById("major-input").value;
    const resume = document.getElementById("resume-input").value;

    if (majors.length == 0 && resume.length == 0){
      setErrorText("You must add your major(s) or resume!");
      return;
    }
    setErrorText(null);

    const res1 = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({search_text: majors + " " + resume})
    });
    const res = await res1.json();

    console.log(res);

    if (res.error_text != undefined){
      console.error(error_text);
      setErrorText("There was an error!");
      return;
    }

    setResults(res.results);

    setPrimarySection(true);

  }

  function shrinkString(s){
    if (s.length <= 20) return s;
    return s.substring(0, 20) + "...";
  }

  return (
    <div className={page.main}>
      <PageMenu></PageMenu>
      <div className={page.container + " " + styles.margin_auto}>
        <div className={page.col1} style={{width: left_width + "%"}}>
          <div className={styles.box} style={{height: "100%", paddingBottom: "0"}} onClick={() => setPrimarySection(false)}>
            <div style={{marginBottom: "12px"}}>
              <span style={{fontSize: "16pt"}}>Enter your major(s) and minor(s):</span>
            </div>
            <div style={{marginBottom: "12px"}}>
              <input className={page.input} id="major-input"></input>
            </div>
            <div style={{marginBottom: "12px"}}>
              <span style={{fontSize: "16pt"}}>Describe your experience or paste your résumé:</span>
            </div>
            <div>
              <textarea style={{minHeight: "40vh"}} className={page.textarea} id="resume-input"></textarea>
            </div>
            {error_text != null && (<div>
              <span style={{fontSize: "14pt", color: "#f30404"}}>{error_text}</span>
            </div>)}
            <Button variant="contained" size="large" onClick={search} style={{backgroundColor: "#CFB87C", marginTop: "12px"}}>Search</Button>
          </div>
        </div>

        <div className={page.col2} style={{width: (100-left_width) + "%"}} onClick={() => {if (results != null) setPrimarySection(true)}}>
          <div className={styles.box} style={{height: "100%", paddingBottom: "0"}}>
            <div>
              <span style={{fontSize:"22pt"}}>Search Results</span>
            </div>
            {results != null && (
              <div className={page.scholarships_container}>
              {results.map((scholarship, i) => (
                <a href={scholarship.url} target="_blank">
                  <div className={page.scholarship_entry + " " + (i % 2 == 0 ? page.even_entry : page.odd_entry)}>
                    <div>
                      <b>{left_width >= 60 ? shrinkString(scholarship.name) : scholarship.name}</b>
                    </div>
                    <div className={styles.flex} style={{gap: "15px", fontSize: "14pt", color: "#ccc"}}>
                      <div>
                        <span>{scholarship.amount}</span>
                      </div>
                      <div>
                        <span>{"Due " + scholarship.due}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
