import styled from "styled-components";
import Top from "./Header";
import Trendings from "./Trendings";
import Posts from "./Posts";
import NewPost from "./NewPost";
import NewPostsOnServer from "./NewPostsOnServer";
import InfiniteScroll from "react-infinite-scroller";
import { useUserData } from "../contexts/UserDataContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { APIHost } from "../config/config";
import useInterval from "use-interval";
import Loading from './Loader';

export default function Timeline() {
  const [{ token }] = useUserData();
  const [publications, setPublications] = useState([]);
  const [countNewPublications, setCountNewPublications] = useState(0);
  const [lastPublicationId, setLastPublicationId] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isCreatingPostLoading, setIsCreatingPostLoading] = useState(false);
  const [isFetchPostsLoading, setIsFetchPostsLoading] = useState(false);
  const [checkFollowing, setCheckFollowing] = useState(false);

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function fetchPosts() {
    if (isFetchPostsLoading) return;

    setIsFetchPostsLoading(true);

    const url = APIHost + `timeline/${page}`;

    axios
      .get(url, auth)
      .then((res) => {
        // console.log(res.data);
        if (res.data.length < 10) { 
          setHasMore(false);
        }
        setLastPublicationId(res.data[0].id);
        setPublications([...publications, ...res.data]);
        setPage(page + 1);
        setIsFetchPostsLoading(false);
        if (res.data.length < 10) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
        setIsFetchPostsLoading(false);
        console.log(error.data);
      });
  }

  function checkIfUserFollows () {
    const url = APIHost + `following`;
    axios
      .get(url, auth)
      .then((res) => {
        setCheckFollowing(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function createNewPost(link, description) {
    setIsCreatingPostLoading(true);
    try {
      await axios.post(
        APIHost + `publish`,
        { link, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsCreatingPostLoading(false);
      fetchUpdatedPosts();
    } catch (e) {
      setIsCreatingPostLoading(false);
      alert("Houve um erro ao publicar seu link.");
    }
  }

  function fetchUpdatedPosts() {
    setPublications([]);
    setPage(0);
  }

  useInterval(() => {
    const url = APIHost + `countPublications/${lastPublicationId}`;

    axios
      .get(url, auth)
      .then((res) => {
        setCountNewPublications(Number(res.data[0].count));
      })
      .catch((error) => {
        alert("An error occured, please refresh the page");
        console.log(error.data);
      });
  }, 15000);

  // function Loading() {
  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }
  //   if (!isLoading && publications.length === 1 && checkFollowing === true) {
  //     return <p>No posts found from your friends</p>;
  //   } if (!isLoading && publications.length === 1 && checkFollowing === false ) {
  //     return <p>You don't follow anyone yet. <br /> Search for new friends!</p>;  
  //   }    
  //   else {
  //     return <RenderPosts />;
  //   }
  // }

  return (
    <>
      <Top />
      <TimelineContainer>
        <PostsContainer>
          <Title>timeline</Title>
          <NewPost
            createNewPost={createNewPost}
            isCreatingPostLoading={isCreatingPostLoading}
          />
          {countNewPublications === 0 ? (
            ""
          ) : (
            <NewPostsOnServer
              fetchPosts={fetchUpdatedPosts}
              countNewPublications={countNewPublications}
              setCountNewPublications={setCountNewPublications}
            />
          )}
          <InfiniteScroll
            pageStart={0}
            loadMore={fetchPosts}
            hasMore={hasMore}
            loader={
              <Scroll>
                <div>Loading more posts...</div>
                <Loading />
              </Scroll>
            }
          >
            {publications.map((publi) => (
              <Posts
                key={publi.id}
                id={publi.publicationId}
                description={publi.description}
                link={publi.link}
                profilePic={publi.profilePic}
                username={publi.username}
                userId={publi.userId}
                urlDescription={publi.urlDescription}
                urlImage={publi.urlImage}
                urlTitle={publi.urlTitle}
                page={page}
                fetchUpdatedPosts={fetchUpdatedPosts}
                publicationId={publi.publicationId}
              />
            ))}
          </InfiniteScroll>
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

const Scroll = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  color: #6d6d6d;
`;
