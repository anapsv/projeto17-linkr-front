import { useState, useEffect } from "react";
import { useUserData } from "../contexts/UserDataContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Trendings from "./Trendings";
import Posts from "./Posts";
import Top from "./Header";
import styled from "styled-components";
import { APIHost } from "../config/config";
import FollowButton from './FollowButton';

export default function UserTimeline() {
  const [{ token }] = useUserData();
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followed, setFollowed] = useState(false);


  const { id } = useParams();

  function fetchPosts() {
    const url = APIHost + `user/${id}`;
    const auth = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(id);

    axios
      .get(url, auth)
      .then((res) => {
        setIsLoading(false);
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
    if (token && id) checkIfUserFollows();
  }, [id, token]);

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

  function checkIfUserFollows () {
    const promise = axios({
      url: `${APIHost}followers`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: { userPageId: id}
    });
    promise.then((res) => {
      console.log(res.data);
      if (res.data === true) {
        setFollowed(true);
      } if (res.data === false) {
        setFollowed(false);
      }
    })
    promise.catch((err) => {
      
    })
  }

  function Loading() {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (!isLoading && publications.length === 0) {
      return <p>There are no posts yet</p>;
    } else {
      return (
        <>
          <UserInfo>
            <div>
              <ProfileImage src={publications[0].profilePic} />
              <Title>{publications[0].username + "'s posts"}</Title>
            </div>
            <div>
              <FollowButton id={id} followed={followed} setFollowed={setFollowed} />
            </div>
          </UserInfo>
          <RenderPosts />
        </>
      );
    }
  }


  return (
    <Container>
      <Top />
      <TimelineContainer>
        <PostsContainer>
          <Loading />
        </PostsContainer>
        <Trendings />
      </TimelineContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #333333;
  display: flex;
  justify-content: center;
`;

const TimelineContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const UserInfo = styled.div`
  margin-top: 125px;
  margin-bottom: 37px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
  }
`;

const Title = styled.div`
  font-size: 43px;
  font-weight: bold;
  color: #ffffff;
  font-family: "Oswald", sans-serif;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
`;

const PostsContainer = styled.div`
  > p {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-size: 40px;
    margin-top: 300px;
    color: #ffffff;
    font-family: "Oswald", sans-serif;
    font-weight: bold;
    width: 611px;
  }
`;
