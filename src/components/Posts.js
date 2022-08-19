import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useUserData } from "../contexts/UserDataContext";
import { CgTrashEmpty } from "react-icons/cg";
import { TiPencil } from "react-icons/ti";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate, useResolvedPath } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { ReactTagify } from "react-tagify";
import { APIHost } from "../config/config";

export default function Posts(props) {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [textArea, setTextArea] = useState(false);
  const textareaRef = useRef("");
  const [{ token, userId, name }] = useUserData();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enterPress, setEnterPress] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(0);
  const [names, setNames] = useState([]);

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

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
    if (enterPress) {
      const promise = axios.post(
        APIHost + `editpost`,
        {
          publicationId,
          description: textareaRef.current.value,
        },
        auth
      );
      promise.then((res) => {
        props.fetchUpdatedPosts();
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
    const promise = axios.delete(APIHost + `deletepost`, {
      headers: auth.headers,
      data: {
        publicationId,
      },
    });
    promise.then((res) => {
      setLoading(false);
      props.fetchUpdatedPosts();
      setIsOpen(false);
    });
    promise.catch((err) => {
      console.log(err);
      setLoading(false);
      alert("Unable to delete post. Try again!");
    });
  }

  function getLikes(publicationId) {
    const url = APIHost + `likeGet/${publicationId}`;

    axios
      .get(url, auth)
      .then((res) => {
        if (res.data) {
          setIsLike(res.data);
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  }

  useEffect(() => {
    getLikes(props.publicationId);
    getAllLikes(props.publicationId);
  }, [props.id]);

  function handleLike(publicationId) {
    setIsLike(!isLike);

    if (isLike) {
      const url = APIHost + `likeDelete/${publicationId}`;

      axios
        .delete(url, auth)
        .then((res) => {})
        .catch((error) => {
          console.log(error.data);
          setIsLike(true);
        });
    } else {
      const url = APIHost + `likePost/${publicationId}`;
      const body = { publicationId: publicationId};

      axios
        .post(url, body, auth)
        .then((res) => {})
        .catch((error) => {
          console.log(error.data);
          setIsLike(false);
        });
    }
  }

  function goToHashtag(tag) {
    navigate(`/hashtag/${tag.replace("#", "")}`);
  }

  function getAllLikes(publicationId) {
    const url = APIHost + `allLikes/${publicationId}`;
    axios
      .get(url, auth)
      .then((res) => {
        setCount(res.data.numberOfLikes);
        setNames(res.data.peopleLiked.map((item) => item.name));
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  function getLikesDescription () {
    const usersThatLiked = isLike
      ? names.map((likeName) => likeName === name ? 'You': likeName)
      : names
    const returnPhrase = {
      [0]: `O people liked this post`,
      [1]: `${usersThatLiked[0]} liked this post`,
      [2]: `${usersThatLiked[0]}, ${usersThatLiked[1]} liked this post`
    }
    return returnPhrase[usersThatLiked.length] || `${usersThatLiked[0]}, ${usersThatLiked[1]} and ${count - 2} liked this post`
  }

  return (
    <Container>
      <LikeSection>
        <img src={props.profilePic} alt="profilePic" />
        {isLike ? (
          <IconContext.Provider value={{ color: "red", size: "1.5em" }}>
            <FaHeart onClick={() => handleLike(props.publicationId)} />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
            <FaRegHeart onClick={() => handleLike(props.publicationId)} />
          </IconContext.Provider>
        )}
        <p data-tip={getLikesDescription()} data-iscapture="true" currentitem='true'> { count > 0 ? `${count} likes` : `0 likes` } </p>
          <ReactTooltip place="bottom" type="light" />
      </LikeSection>
      <ContentSection>
        <TopPost>
          <h1 onClick={() => navigate("/user/" + props.userId)}>
            {props.username}
          </h1>
          {props.userId === userId ? (
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
          ) : null}
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
            <ReactTagify
              tagStyle={{
                color: "#FFFFFF",
                fontFamily: "Lato",
                fontWeight: 700,
                cursor: "pointer",
              }}
              tagClicked={(tag) => goToHashtag(tag)}
            >
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
  @media (max-width: 821px) {
    width: 100%;
    border-radius: 0px;
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
  @media (max-width: 821px) {
    width: 70%;
  }
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
  @media (max-width: 821px) {
    width: 100%;
    overflow-y: scroll;
  }
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
