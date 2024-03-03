import Image from "next/image";
import page from "../app/css/search_page.module.css";
import styles from "../app/css/main.module.css";
import globals from "../app/css/globals.css";
import { Button } from "@mui/material";
import { word_indices } from "@/app/consts/word_indices";

import { useEffect, useState } from "react";
import PageMenu from "@/comps/PageMenu";

export default function Search() {

  const { TokenizerIt } = require('@nlpjs/lang-it');

  const [results, setResults] = useState(null);
  const [left_width, setLeftWidth] = useState(70);
  const [error_text, setErrorText] = useState(null);

  const [vocab, setVocab] = useState(null);

  useEffect(() => {
    if (vocab == null){
      const new_vocab = {};
      for (let i = 0; i < word_indices.length; i++){
        new_vocab[word_indices[i]] = i;
      }
      setVocab(new_vocab);
    }
  });

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

  function vectorize(sentence){
    const normalizer = new TokenizerIt();
    const s = normalizer.tokenize(sentence.toLowerCase(), true);
    console.log(s);

    const r = new Array(word_indices.length).fill(0);
    for (let i = 0; i < s.length; i++){
      const index = vocab[s[i]];
      if (index != undefined) r[index] += 1;
    }
    console.log(r);
    return r;
    
  }

  async function search(){

    const majors = document.getElementById("major-input").value;
    const resume = document.getElementById("resume-input").value;

    if (majors.length == 0 && resume.length == 0){
      setErrorText("You must add your major(s) or resume!");
      return;
    }
    setErrorText(null);

    const search_text = majors + " " + resume;

    const res1 = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({search_text, vectorized: vectorize(search_text)})
    });
    const res = await res1.json();

    console.log(res);

    if (res.error_msg != undefined){
      console.error(res.error_msg);
      setErrorText("There was an error!");
      return;
    }

    setResults(res.results);

    setPrimarySection(true);

  }

  function shrinkString(s, size){
    if (s.length <= size) return s;
    return s.substring(0, size) + "...";
  }

  return (
    <div className={page.main}>
      <PageMenu></PageMenu>
      <div className={page.container + " " + styles.margin_auto}>
        <div className={page.col1} style={{width: left_width + "%"}}>
          <div className={styles.box} style={{height: "100%", paddingBottom: "0"}} onClick={() => setPrimarySection(false)}>
            <div style={{marginBottom: "12px"}}>
              <span style={{fontSize: "16pt"}}>Select a college:</span>
            </div>
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
            <div style={{marginBottom: "12px"}}>
              <span style={{fontSize:"22pt"}}>Search Results</span>
            </div>
            {results != null ? (
              <div className={page.scholarships_container}>
              {results.map((scholarship, i) => (
                <a href={scholarship.url} target="_blank">
                  <div className={page.scholarship_entry + " " + (i % 2 == 0 ? page.even_entry : page.odd_entry)}>
                    <div>
                      <b>{shrinkString(scholarship.name, left_width >= 60 ? 20 : 65)}</b>
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
            ) : (
              <div>
                <span style={{color: "#bbb", fontSize: "12pt"}}>Click the search button to begin!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
