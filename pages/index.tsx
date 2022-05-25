import React from "react";
import type { NextPage } from "next";
import { Typography, Container } from "@mui/material";
import { useDispatch } from "react-redux";

import styles from "../styles/Home.module.css";

import axios from "axios";

const Home: NextPage = () => {
  const myLoader = ({ src }: { src: string }) => src;
  return (
    <Container fluid={true} className="p-4 mt-5">
      <Typography>This is the home page...</Typography>
    </Container>
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
