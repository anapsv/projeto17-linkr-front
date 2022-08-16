import styled from "styled-components";
import Top from "./Header";
import Trendings from "./Trendings";
import Posts from "./Posts";
import NewPost from "./NewPost";
import NewPostsOnServer from "./NewPostsOnServer";
import { useUserData } from "../contexts/UserDataContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { APIHost } from "../config/config";
import useInterval from "use-interval";

export default function Timeline() {
  const [{ token }] = useUserData();
  const [publications, setPublications] = useState([]);
  console.log(publications);
  const [countNewPublications, setCountNewPublications] = useState(0);
  const [lastPublicationId, setLastPublicationId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  console.log(lastPublicationId);
  console.log(countNewPublications);

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function fetchPosts() {
    const url = APIHost + `timeline`;

    axios
      .get(url, auth)
      .then((res) => {
        setIsLoading(false);
        setLastPublicationId(res.data[0].id);
        setPublications(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
        console.log(error.data);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    fetchPosts();
  }, []);

  useInterval(() => {
    const url = APIHost + `timeline/${lastPublicationId}`;

    axios
      .get(url, auth)
      .then((res) => {
        setCountNewPublications(Number(res.data[0].count));
      })
      .catch((error) => {
        alert("An error occured, please refresh the page");
        console.log(error.data);
      });
    // Your custom logic here
    //setCount(count + 1);
  }, 15000);

  function RenderPosts() {
    return publications.map((publi) => (
      <Posts
        key={publi.id}
        id={publi.id}
        description={publi.description}
        link={publi.link}
        profilePic={publi.profilePic}
        username={publi.username}
        userId={publi.userId}
        urlDescription={publi.urlDescription}
        urlImage={publi.urlImage}
        urlTitle={publi.urlTitle}
        fetchPosts={fetchPosts}
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
    <>
      <Top />
      <TimelineContainer>
        <PostsContainer>
          <Title>timeline</Title>
          <NewPost fetchPosts={fetchPosts} />
          {countNewPublications === 0 ? (
            ""
          ) : (
            <NewPostsOnServer
              fetchPosts={fetchPosts}
              countNewPublications={countNewPublications}
              setCountNewPublications={setCountNewPublications}
            />
          )}
          <Loading />
        </PostsContainer>
        <Trendings />
      </TimelineContainer>
    </>
  );
}

const TimelineContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 43px;
  font-weight: bold;
  color: #ffffff;
  font-family: "Oswald", sans-serif;
  margin-top: 125px;
  margin-bottom: 43px;
  @media (max-width: 821px) {
    font-size: 33px;
    padding-left: 17px;
    margin-top: 100px;
    margin-bottom: 30px;
  }
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
