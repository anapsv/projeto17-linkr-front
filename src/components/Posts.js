import styled from "styled-components";
import { CgHeart } from "react-icons/cg";
import { IconContext } from "react-icons";

export default function Posts() {
  return (
    <Container>
      <LikeSection>
        <img
          src="https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg"
          alt="profilePic"
        />
        <IconContext.Provider value={{ color: "white", size: "2em" }}>
        <CgHeart/>
        </IconContext.Provider>
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
  margin-bottom: 16px;
  padding: 20px;
  display: flex;

  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 23px;
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
    margin-bottom: 19px;
  }

  p {
    font-family: "Lato";
    font-style: normal;
    margin-top: 5px;
    font-weight: 400;
    font-size: 11px;
    color: #ffffff;
    align-items: center;
    justify-content: center;
  }
`;
