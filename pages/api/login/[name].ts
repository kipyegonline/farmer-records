import React from "react";

export default function HandleLogin(req, res) {
  console.log(req.cookies, "request");

  const {
    query: { name },
  } = req;
  res.json({ name, id: 1 });
}
