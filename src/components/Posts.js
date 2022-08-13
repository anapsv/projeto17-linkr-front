import styled from "styled-components";
import { CgHeart } from "react-icons/cg";
import { IconContext } from "react-icons";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useUserData } from "../contexts/UserDataContext";
import NewPost from "./NewPost";
import { CgTrashEmpty } from "react-icons/cg";
import { TiPencil } from "react-icons/ti";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";

export default function Posts(props) {
  const [post, setPost] = useState([]);
  const [edit, setEdit] = useState(false);
  const [textArea, setTextArea] = useState(false);
  const [publicationId, setPublicationId] = useState("");
  const textareaRef = useRef("");
  const [{ token }] = useUserData();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleEnterPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      // updatePost();
    }
  }

  function handleEscPress(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      setEdit(false);
    }
  }

  function deletePostById(publicationId) {
    //setOpen((open) => !open);
    console.log(publicationId);
    setLoading(true);

    const promise = axios.delete(`http://localhost:4000/deletepost`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        publicationId,
      },
    });
    promise.then((res) => {
      setLoading(false);
    });
    promise.catch((err) => {
      console.log(err);
      setLoading(false);
      alert("Unable to delete post. Try again!");
    });
  }

  // useEffect(() => {
  //   if (edit) {
  //     textareaRef.current.focus();
  //   }
  // }, [edit]);

  function updatePostById(id) {
    setTextArea(true);
    console.log(id);
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    const promise = axios.post(
      "http://localhost:4000/editpost",
      { id, description: textareaRef.current.value },
      auth
    );
    promise.then((res) => {
      setEdit(false);
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
        <TopPost>
          <h1>{props.username}</h1>
          <div>
            <TiPencil
              onClick={() => updatePostById(props.id)}
              color={"#ffffff"}
              title={TiPencil}
              height="16px"
              width="16px"
            />
            <CgTrashEmpty
              onClick={() => deletePostById(props.id)}
              color={"#ffffff"}
              title={CgTrashEmpty}
              height="16px"
              width="16px"
            />
          </div>
        </TopPost>
        <h2>
          {edit && post.id === publicationId ? (
            <TextArea
              edit={edit}
              type="text"
              ref={textareaRef}
              onKeyPress={handleEnterPress}
              onKeyDown={handleEscPress}
              defaultValue={props.description}
              readOnly={textArea}
            ></TextArea>
          ) : (
            <h2>{props.description}</h2>
          )}
        </h2>
        <LinkMetadata href={props.link} target="_blank">
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

const TextArea = styled.textarea`
  width: 505px;
  height: 45px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.edit ? "#FFFFFF" : "#171717")};
`;

const TopPost = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DeleteSection = styled.div``;

const Loading = styled.div``;

const ModalStyle = styled.div``;

const Text = styled.h2``;

const Button = styled.div``;

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

const LinkMetadata = styled.a`
  width: 503px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  display: flex;
  justify-content: space-between;
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
