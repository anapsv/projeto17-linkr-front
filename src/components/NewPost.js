import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useUserData } from "../contexts/UserDataContext";

export default function NewPost( {setRefresh }) {
  const [loading, setLoading] = useState(false);
  const [{ profilePic, token }] = useUserData();
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  function publishNewPost(e) {
    e.preventDefault();
    setLoading(true);
    const promise = axios.post(
      "http://localhost:4000/publish",
      { link: link, description: description },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    promise.then((res) => {
      setLoading(false);
      setLink("");
      setDescription("");
      setRefresh(true);
      
    });
    promise.catch((err) => {
      setLoading(false);
      alert("Houve um erro ao publicar seu link.");
    });
  }

  return (
    <Container>
      <ProfilePic>
        <img src={profilePic} />
      </ProfilePic>
      <Form onSubmit={publishNewPost}>
        <h3>What are you going to share today?</h3>
        <input
          placeholder="http://..."
          type="url"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <textarea
          placeholder="Awesome article about #javascript"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish"}
        </button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 610px;
  height: 210px;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  box-shadow: 0px 4px 4px 0px #00000040;
  margin-top: 40px;
  margin-bottom: 30px;
  padding: 20px;
`;

const ProfilePic = styled.div`
  margin-right: 20px;

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  @media (max-width: 700px) {
    img {
      display: none;
    }
  }
`;
const Form = styled.form`
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  font-family: "Lato", sans-serif;

  h3 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    color: #707070;
    margin-bottom: 15px;
  }

  input {
    background: #efefef;
    border-radius: 5px;
    width: 503px;
    height: 30px;
    padding: 7px;
    margin-bottom: 5px;
    border: 1px solid #efefef;
  }

  ::placeholder {
    width: 503px;
    height: 30px;
    background-color: #efefef;
    color: #949494;
    font-size: 15px;
    line-height: 18px;
    border-radius: 5px;
    margin: 5px;
  }

  textarea {
    width: 503px;
    height: 65px;
    background-color: #efefef;
    color: #949494;
    border-radius: 5px;
    padding: 7px;
    border: 1px solid #efefef;
    margin-bottom: 5px;
  }

  button {
    width: 110px;
    height: 30px;
    border-radius: 5px;
    background-color: #1877f2;
    color: #ffffff;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #1877f2;
  }
`;
