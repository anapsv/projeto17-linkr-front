import styled from "styled-components";
import { IoHeartOutline } from "react-icons/io5";
import { useState } from "react";

export default function Posts() {
  const [post, setPosts] = useState([]);
  return (
    <Container>
      <LikeSection>
        <img
          src="https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg"
          alt="profilePic"
        />
        <IoHeartOutline color={"#ffffff"} height="20px" width="18px" />
        <p>13 Likes</p>
      </LikeSection>
      <div>
        <h1>Juvenal Juvêncio</h1>
        <h2>
          Muito maneiro esse tutorial de Material UI com React, deem uma olhada!
          #React #material
        </h2>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 611px;
  height: 276px;
  background: #171717;
  border-radius: 16px;
  margin-bottom: 15px;
  padding: 17px;
  display: flex;

  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    color: #ffffff;
    margin-bottom: 10px;
  }

  h2 {
    font-weight: 400;
    font-size: 17px;
    color: #b7b7b7;
    font-family: "Lato";
    margin-bottom: 10px;
  }
`;

const LikeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 15px;
  }

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    color: #ffffff;
    align-items: center;
    justify-content: center;
  }
`;
