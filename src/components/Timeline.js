import styled from "styled-components";

import Top from "./Header";
import Trendings from "./Trendings";
import Posts from "./Posts";
import NewPost from "./NewPost";
import { useUserData } from "../contexts/UserDataContext";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Timeline() {
  const [{ token }] = useUserData();
  const [publications, setPublications] = useState([]);
  console.log(publications);
  const [isLoading, setIsLoading] = useState(false);

  function getPosts() {
    return "oi";
  }

  useEffect(() => {
    setIsLoading(true);
    const url = "http://localhost:4000/timeline";
    const auth = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(url, auth)
      .then((res) => {
        setIsLoading(false);
        setPublications(res.data);
      })
      .catch((error) => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
        console.log(error.data);
      });
  }, []);

  function RenderPosts() {
    return publications.map((publi) => (
      <Posts
        key={publi.id}
        id={publi.id}
        description={publi.description}
        link={publi.link}
        profilePic={publi.profilePic}
        username={publi.username}
        urlDescription={publi.urlDescription}
        urlImage={publi.urlImage}
        urlTitle={publi.urlTitle}
      />
    ));
  }

  function Loading() {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (!isLoading && publications.length === 0) {
      return <p>There are no posts yes</p>;
    } else {
      return <RenderPosts />;
    }
  }

  return (
    <Container>
      <Top />
      <TimelineContainer>
        <PostsContainer>
          <Title>timeline</Title>
          <NewPost getPosts={getPosts} />
          <Loading />
        </PostsContainer>
        <Trendings />
      </TimelineContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #333333;
  display: flex;
  justify-content: center;
`;

const TimelineContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 43px;
  font-weight: bold;
  color: #ffffff;
  font-family: "Oswald", sans-serif;
  margin-top: 125px;
  margin-bottom: 43px;
`;

const PostsContainer = styled.div`
  > p {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-size: 40px;
    margin-top: 100px;
    color: #ffffff;
    font-family: "Oswald", sans-serif;
    font-weight: bold;
  }
`;
