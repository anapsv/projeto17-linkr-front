import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useUserData } from "../contexts/UserDataContext";
import ReactTooltip from 'react-tooltip';
import { useEffect } from "react";

export default function Posts({ publication }) {

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [{ token }] = useUserData();
  const [names, setNames] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const promise = axios.get(`http://localhost:4000/like/${publication.id}`, config);
    const promise2 = axios.get(`http://localhost:4000/like/count/${publication.id}`);
    const promise3 = axios.get(`http://localhost:4000/likes/names/${publication.id}`, config);
    promise.then((response) => {
      if (response.data) {
        setIsLiked(true);
      }
    });
    promise2.then((response) => {
      setLikes(Number(response.data.count));
    });

    promise3.then((response) => {
      const nameResponse = response.data;
      setNames(nameResponse);
    });

    promise.catch((error) => {
      console.error("error");
    });

    promise2.catch((error) => {
      console.error("error");
    });

    promise3.catch((error) => {
      console.error("error");
    });
  }, [publication]);

  function like() {
    const promise = axios.post(
      `http://localhost:4000/like`,
      {
        publicationId: publication.id,
      },
      config
    );
    promise.then((response) => {
      if (response.status === 201) {
        setIsLiked(true);
        setLikes(likes + 1);
      }
    });

    promise.catch((error) => {
      console.error("error");
    });

    const promise2 = axios.get(
      `http://localhost:4000/likes/names/${publication.id}`,
      config
    );
    promise2.then((response) => {
      const nameResponse = response.data;
      setNames(nameResponse);
    });
    promise2.catch((error) => {
      console.error("error");
    });
  }

  function dislike() {
    const promise = axios.delete(
      `http://localhost:4000/likes/${publication.id}`,
      config
    );
    promise.then((response) => {
      if (response.status === 200) {
        setIsLiked(false);
        setLikes(likes - 1);
        const promise2 = axios.get(
          `http://localhost:4000/likes/names/${publication.id}`,
          config
        );
        promise2.then((response) => {
          const nameResponse = response.data;

          setNames(nameResponse);
        });
        promise2.catch((error) => {
          console.error("error");
        });
      }
    });

    promise.catch((error) => {
      console.error("error");
    });
  }

  return (
    <Container>
      <LikeSection>
        <img
          src="https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg"
          alt="profilePic"
        />
        { isLiked ? <IconContext.Provider value={ { color: "red", size: "1.5em" } }><FaHeart onClick={ dislike } /></IconContext.Provider> :
          <IconContext.Provider value={ { color: "white", size: "1.5em" } }><FaRegHeart onClick={ like } /></IconContext.Provider> }
        <a data-tip data-for={ `${publication.id}` }>
          <span>{ likes } likes</span>
        </a>
        { isLiked ? (
          <ReactTooltip id={ `${publication.id}` } place="bottom" type="light">
            Você
            { names.length > 0
              ? `, ${names[0].name} and others ${likes - 2} people`
              : ` and others 0 people` }
          </ReactTooltip>
        ) : (
          <ReactTooltip id={ `${publication.id}` } place="bottom" type="light">
            { names.length > 1
              ? `${names[0].name}, ${names[1].name} and others ${likes - 2
              } people`
              : names.length === 1
                ? `${names[0].name} and others 0 people`
                : "0 likes" }
          </ReactTooltip>
        ) }
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
