import styled from "styled-components";
import Topbar from "./Topbar";

import Trendings from "./Trendings";
import Posts from "./Posts";

export default function Timeline() {
  return (
    <Container>
      <Topbar />
      <TimelineContainer>
        <PostsContainer>
          <Title>timeline</Title>
          <NewPost />
          <Posts />
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

const PostsContainer = styled.div``;

const NewPost = styled.div`
  width: 611px;
  height: 209px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 30px;
`;
