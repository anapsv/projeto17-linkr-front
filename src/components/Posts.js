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
import { useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";

export default function Posts(props) {
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);
  const [textArea, setTextArea] = useState(false);
  const textareaRef = useRef("");
  const [{ token }] = useUserData();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enterPress, setEnterPress] = useState(false);

  function handleEnterPress(e) {
    setEnterPress(true);
    if (e.key === "Enter") {
      e.preventDefault();
      updatePostById(props.id);
    }
  }

  function handleEscPress(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      setEdit(false);
      setTextArea(false);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscPress, true);
  }, []);

  const toggleEditing = () => {
    setEdit(!edit);
    setTextArea(!textArea);
  };

  useEffect(() => {
    if (edit) {
      textareaRef.current.focus();
    }
  }, [edit]);

  function updatePostById(publicationId) {
    toggleEditing();
    console.log(enterPress);
    if (enterPress) {
      const promise = axios.post(
        "http://localhost:4000/editpost",
        {
          publicationId,
          description: textareaRef.current.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      promise.then((res) => {
        props.fetchPosts();
        setEnterPress(false);
      });
      promise.catch((err) => {
        alert("Unable to save changes. Try again!");
        setTextArea(false);
        setEnterPress(false);
      });
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function deletePostById(publicationId) {
    setLoading(true);
    const promise = axios.delete(`http://localhost:4000/deletepost`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        publicationId,
      },
    });
    promise.then((res) => {
      setLoading(false);
      props.fetchPosts();
      setIsOpen(false);
    });
    promise.catch((err) => {
      console.log(err);
      setLoading(false);
      alert("Unable to delete post. Try again!");
    });
  }

  function goToHashtag(tag){
    navigate(`/hashtag/${tag.replace("#", "")}`);
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
          <h1 onClick={() => navigate("/user/" + props.userId)}>
            {props.username}
          </h1>
          <div>
            <TiPencil
              onClick={() => updatePostById(props.id)}
              color={"#ffffff"}
              title={TiPencil}
              height="16px"
              width="16px"
              onKeyDown={handleEscPress}
              onKeyPress={handleEnterPress}
            />
            <CgTrashEmpty
              onClick={openModal}
              color={"#ffffff"}
              title={CgTrashEmpty}
              height="16px"
              width="16px"
            />
          </div>
        </TopPost>
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          onRequestClose={closeModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          {loading ? (
            <Loading>
              <ThreeDots color="#FFFFFF" width={50} />
            </Loading>
          ) : (
            <>
              <Text>Are you sure you want to delete this post?</Text>
              <ButtonDiv>
                <Cancel onClick={closeModal}>No, go back</Cancel>
                <Send onClick={() => deletePostById(props.id)}>
                  Yes, delete it
                </Send>
              </ButtonDiv>
            </>
          )}
        </Modal>
        {textArea ? (
          <TextArea
            bg={true}
            type="text"
            ref={textareaRef}
            onKeyPress={handleEnterPress}
            defaultValue={props.description}
          ></TextArea>
        ) : (
            <h2>
              <ReactTagify tagStyle={{ color: '#FFFFFF', fontFamily: 'Lato', fontWeight: 700, cursor: 'pointer' }} tagClicked={(tag) => goToHashtag(tag)}>
                {props.description} 
              </ReactTagify>
            </h2>
        )}
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
  position: relative;
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
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.bg ? "#FFFFFF" : "#171717")};
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #9b9595;
`;

const TopPost = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Loading = styled.div`
  border: none;
  border-radius: 5px;
  width: 135px;
  height: 40px;
  background-color: #1877f2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  @media (max-width: 700px) {
    width: 100px;
    height: 40px;
  }
  @media (max-width: 500px) {
    width: 85px;
    height: 30px;
  }
`;

const Text = styled.p`
  font-family: "Lato";
  font-weight: bold;
  font-size: 32px;
  text-align: center;
  color: #ffffff;
  margin-top: 40px;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 20px;
`;

const Cancel = styled.button`
  width: 134px;
  height: 37px;
  background: #ffffff;
  border-radius: 5px;
  font-family: "Lato";
  font-weight: bold;
  font-size: 18px;
  color: #1877f2;
  border: none;
  cursor: pointer;
`;

const Send = styled.button`
  width: 134px;
  height: 37px;
  background: #1877f2;
  border-radius: 5px;
  font-family: "Lato";
  font-weight: bold;
  font-size: 18px;
  color: #ffffff;
  border: none;
  cursor: pointer;
`;

const ContentSection = styled.div`
  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 23px;
    color: #ffffff;
    margin-bottom: 10px;
    cursor: pointer;
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
  width: 100%;
`;

const LinkTitle = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #cecece;
  margin-bottom: 10px;
  word-break: break-all;
`;

const LinkDescription = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  color: #9b9595;
  margin-bottom: 10px;
  word-break: break-all;
`;

const LinkUrl = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  color: #cecece;
  word-break: break-all;
`;

const LinkImage = styled.img`
  width: 153.44px;
  height: 155px;
  border-radius: 0px 12px 13px 0px;
`;
