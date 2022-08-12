import styled from "styled-components";
import { CgHeart } from "react-icons/cg";
import { IconContext } from "react-icons";
import { TiPencil } from "react-icons/ti";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useUserData } from "../contexts/UserDataContext";
import NewPost from "./NewPost";
import { CgTrashEmpty } from "react-icons/cg";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";

export default function Posts() {
  const [post, setPost] = useState([]);
  const [edit, setEdit] = useState(false);
  const [textArea, setTextArea] = useState(false);
  const [publicationId, setPublicationId] = useState("");
  const textareaRef = useRef("");
  const [{ token }] = useUserData();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = { headers: { Authorization: `Bearer ${token}` }}
  const postId = 1;

  function getPosts () {
    console.log('oi');
  }

  function handleEnterPress (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      updatePost();
    }
  }

  function handleEscPress (e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      setEdit(false);
    }
  }

  useEffect(() => {
    if (edit) {
      textareaRef.current.focus();
    }
  }, [edit]);

  function updatePost () {
    setTextArea(true);
    const promise = axios.post('http://localhost:4000/editpost', { publicationId, description: textareaRef.current.value }, auth);
    promise.then((res) => {
      setEdit(false);
      getPosts();
    })
    promise.catch((err) => {
      alert('Unable to save changes. Try again!');
      setTextArea(false);
    })

  }

  function deletePost () {
    setLoading(true);
    const promise = axios.delete(`http://localhost:4000/deletepost/${postId}`, auth);
    promise.then((res) => {
      setLoading(false);
      getPosts();
    })
    promise.catch((err) => {
      setLoading(false);
      alert('Unable to delete post. Try again!')
    })
  }

  return (
    <Container>
      <EditSection>
        <TiPencil  onClick={setEdit(edit => !edit)}/>
      </EditSection>
      <DeleteSection>
        <CgTrashEmpty onClick={setOpen(open => !open)} />
      </DeleteSection>
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
        <NewPost getPosts={getPosts} />
        <h1>Juvenal Juvêncio</h1>
        { edit && post.postId === publicationId ?
          <TextArea 
            edit={edit}
            type="text"
            ref={textareaRef}
            onKeyPress={handleEnterPress}
            onKeyDown={handleEscPress}
            defaultValue={post.description}
            readOnly={textArea}>
          </TextArea>
        :
          <h2>
            Muito maneiro esse tutorial de Material UI com React, deem uma olhada!
            #React #material
          </h2>
        }

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

const TextArea=styled.textarea`
  width: 505px;
  height: 45px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.edit ? '#FFFFFF' : '#171717')}
`

const EditSection=styled.div`
`

const DeleteSection=styled.div`
`