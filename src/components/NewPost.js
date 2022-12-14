import styled from "styled-components";
import { useUserData } from "../contexts/UserDataContext";
import { useState } from "react";

export default function NewPost({ createNewPost, isCreatingPostLoading }) {
  const [{ profilePic }] = useUserData();
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  function publishNewPost(e) {
    e.preventDefault();
    createNewPost(link, description);
    setDescription("");
    setLink("");
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
        <Button type="submit" disabled={isCreatingPostLoading}>
          {isCreatingPostLoading ? "Publishing..." : "Publish"}
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 611px;
  height: 210px;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  box-shadow: 0px 4px 4px 0px #00000040;
  margin-top: 40px;
  margin-bottom: 30px;
  padding: 20px;
  @media (max-width: 821px) {
    width: 100%;
    border-radius: 0px;
  }
`;

const ProfilePic = styled.div`
  margin-right: 20px;
  @media (max-width: 821px) {
    display: none;
  }

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
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: "Lato", sans-serif;
  position: relative;
  @media (max-width: 821px) {
    align-items: center;
    justify-content: center;
  }

  h3 {
    width: fit-content;
    height: fit-content;
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    color: #707070;
    margin-bottom: 15px;
    @media (max-width: 821px) {
      font-size: 17px;
    }
  }

  input {
    background: #efefef;
    border-radius: 5px;
    width: 503px;
    height: 30px;
    padding: 7px;
    margin-bottom: 5px;
    border: 1px solid #efefef;
    @media (max-width: 821px) {
      width: 100%;
    }
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
    @media (max-width: 821px) {
      width: 100%;
    }
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
    @media (max-width: 821px) {
      width: 100%;
      height: 55px;
    }
  }
`;

const Button = styled.button`
  width: 112px;
  height: 31px;
  border-radius: 5px;
  background-color: #1877f2;
  color: #ffffff;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1877f2;
  margin-top: 5px;
  position: absolute;
  bottom: 0;
  right: 0;
  @media (max-width: 821px) {
    height: 22px;
  }
`;
