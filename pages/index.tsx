import React from "react";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/ui/Layout";
import styles from "../styles/Home.module.css";

import AddActivity from "../components/AddActivity";
import AddProject from "../components/AddProject";
import axios from "axios";

const Home: NextPage = () => {
  const myLoader = ({ src }: { src: string }) => src;
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="flex justify-evenly items-start">
          <AddProject />
          <hr />

          <AddActivity />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              loader={myLoader}
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;

/*
//export
  async function getStaticProps() {
  let url = "https://jsonplaceholder.typicode.com/users";
  try {
    const res = await fetch(url);

    if (res.ok) {
      const data = await res.json();
      return { props: { data } };
    } else {
      return { props: { data: [] } };
    }
  } catch (error: any) {
    console.log(error?.message);
  }
}
*/
