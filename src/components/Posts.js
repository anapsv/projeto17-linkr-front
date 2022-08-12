import styled from "styled-components";
import { CgHeart } from "react-icons/cg";
import { IconContext } from "react-icons";
import { useState, useEffect, useRef } from "react";
import { useUserData } from "../contexts/UserDataContext";
import axios from "axios";

export default function Posts(props) {
  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [textArea, setTextArea] = useState(false);
  const [publicationId, setPublicationId] = useState("");
  const textareaRef = useRef("");
  const [{ token }] = useUserData();

  function getPosts() {
    console.log("oi");
  }

  function handleEnterPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      updatePost();
    }
  }

  function handleEscPress(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      setEdit(false);
    }
  }

  useEffect(() => {
    if (edit) {
      textareaRef.current.focus();
    }
  }, [edit]);

  function updatePost() {
    setTextArea(true);
    const promise = axios.post(
      "http://localhost:4000/editpost",
      { publicationId, description: textareaRef.current.value },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    promise.then((res) => {
      setEdit(false);
      getPosts();
    });
    promise.catch((err) => {
      alert("Unable to save changes. Try again!");
      setTextArea(false);
    });
  }

  return (
    <Container>
      <LikeSection>
        <img src={props.profilePic} alt="profilePic" />
        <IconContext.Provider value={{ color: "white", size: "2em" }}>
          <CgHeart />
        </IconContext.Provider>
        <p>13 Likes</p>
      </LikeSection>
      <ContentSection>
        <h1>{props.username}</h1>
        <h2>{props.description}</h2>
        <LinkMetadata>
          <LinkInformation>
            <LinkTitle>{props.urlTitle}</LinkTitle>
            <LinkDescription>{props.urlDescription}</LinkDescription>
            <LinkUrl>{props.link}</LinkUrl>
          </LinkInformation>
          <LinkImage src={props.urlImage} />
        </LinkMetadata>
      </ContentSection>
    </Container>
  );
}

const Container = styled.div`
  width: 611px;
  height: auto;
  background: #171717;
  border-radius: 16px;
  margin-bottom: 16px;
  padding: 20px;
  display: flex;
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

const ContentSection = styled.div`
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

const LinkMetadata = styled.div`
  width: 503px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  display: flex;
`;

const LinkInformation = styled.div`
  padding: 20px;
`;

const LinkTitle = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #cecece;
  margin-bottom: 10px;
`;

const LinkDescription = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  color: #9b9595;
  margin-bottom: 10px;
`;

const LinkUrl = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  color: #cecece;
`;

const LinkImage = styled.img`
  width: 153.44px;
  height: 155px;
  border-radius: 0px 12px 13px 0px;
`;
