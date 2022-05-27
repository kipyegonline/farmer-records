import React from "react";

export default function Login() {
  const fetchData = async (name) => {
    try {
      const res = await fetch("/api/login/" + name);
      console.log("fetching.... 2");
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  React.useEffect(() => {
    fetchData("Jules");
  }, []);
  return <div>Login please</div>;
}
