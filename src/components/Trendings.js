import styled from "styled-components";
import { useState, useEffect } from "react";
import { useUserData } from "../contexts/UserDataContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Trendings() {
  const navigate = useNavigate();
  const [{ token }] = useUserData();
  const [hashtags, setHashtags] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  function trending(){
    const url = `http://localhost:4000/trendings`;
    const auth = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(url, auth)
      .then((res) => {
        setIsLoading(false);
        setHashtags(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        alert(
          "An error occured while trying to fetch the trendings, please refresh the page"
        );
        console.log(error.data);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    trending();
  }, []);

  function RenderHashtags(){
    return hashtags.map((hashtag, i = 0) => {
      return <p key={i++} onClick={() => navigate(`/hashtag/${hashtag.hashtag}`)}>{"#  " + hashtag.hashtag}</p>
    })
  }

  function Loading() {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (hashtags.length === 0) {
      return <p>There are no hashtags yet</p>;
    } else {
      return (
        <RenderHashtags />
      );
    }
  }

  return (
    <Container>
      <h1>trending</h1>
      <Margin />
      <Loading/>
    </Container>
  );
}

const Container = styled.div`
  width: 301px;
  height: 406px;
  background: #171717;
  border-radius: 16px;
  margin-top: 211px;
  margin-left: 25px;
  padding: 15px;
  @media (max-width: 821px) {
    display: none;
  }

  h1 {
    font-weight: 700;
    font-size: 27px;
    color: #ffffff;
    font-family: "Oswald", sans-serif;
    margin: 15px;
  }

  p {
    font-weight: 700;
    font-size: 19px;
    color: #ffffff;
    font-family: "Lato", sans-serif;
    margin-left: 15px;
    margin-bottom: 10px;
    cursor: pointer;
  }
`;

const Margin = styled.div`
  margin: 12px 0 12px 0;
  border: 1px solid #484848;
`;
