import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/ui/Layout";

export default function Post({ post }) {
  const {
    query: { id },
  } = useRouter();
  React.useEffect(() => {
    console.log(id, post);
  }, [id]);
  return (
    <div className="p-4 m-8 bg-gray-600">Hate the game,not the player.... </div>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  let url = "https://jsonplaceholder.typicode.com/users/";
  const res = await fetch(url);
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  let url = `https://jsonplaceholder.typicode.com/posts/${params.id}`;
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
