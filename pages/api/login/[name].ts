import React from "react";

export default function HandleLogin(req, res) {
  console.log(req, "request");
  const {
    query: { name },
  } = req;
  res.send({ name, id: 1 });
}
