import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useUserData,
  saveUserDataInLocalStorage,
} from "../contexts/UserDataContext";
import { APIHost } from "../config/config";

export default function SignIn() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [, setUserData] = useUserData();

  function signIn(e) {
    e.preventDefault();

    setDisable(true);
    const promise = axios.post(`${APIHost}signin`, {
      email: credentials.email,
      password: credentials.password,
    });

    promise.then((res) => {
      //fazer algo com o token
      console.log(res.data);
      setUserData(res.data);
      saveUserDataInLocalStorage(res.data);
      navigate("/timeline");
    });
    promise.catch((err) => {
      setDisable(false);
      //alert(err.response.data.error);
    });
  }

  return (
    <Container>
      <Info>
        <h1>linkr</h1>
        <h2>
          save, share and discover <br />
          the best links on the web
        </h2>
      </Info>
      <Form onSubmit={signIn}>
        <input
          id="e-mail"
          placeholder="e-mail"
          type="email"
          required
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <input
          placeholder="password"
          type="password"
          maxLength={8}
          required
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        {disable ? (
          <ButtonDisabled>Log in</ButtonDisabled>
        ) : (
          <button type="submit">Log in</button>
        )}
        <Link to="/signup">
          <p>First time? Create an account!</p>
        </Link>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #151515;
  align-items: center;

  button {
    width: 80%;
    height: 8%;
    font-size: 28px;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    line-height: 40px;
    color: #ffffff;
    background-color: #1877f2;
    border-radius: 5px;
    border: none;
  }

  @media (max-width: 700px) {
    justify-content: center;

    button {
      height: 10%;
    }

    p {
      font-size: 18px;
    }
  }
`;

const Info = styled.div`
  width: 35%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  color: #ffffff;

  h1 {
    font-size: 105px;
    font-weight: 700;
    line-height: 115px;
    font-family: "Passion One", cursive;
  }

  h2 {
    font-size: 45px;
    font-weight: 700;
    line-height: 65px;
    font-family: "Oswald", sans-serif;
  }

  @media (max-width: 700px) {
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 70%;
    height: 30%;
    margin: 0;

    h1 {
      font-size: 75px;
    }

    h2 {
      font-size: 25px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  width: 40%;
  height: 100vh;
  padding-top: 40px;
  background-color: #333333;

  input {
    width: 80%;
    height: 8%;
    font-size: 28px;
    font-weight: 700;
    line-height: 40px;
    color: #9f9f9f;
    border-radius: 5px;
    color: #333333;
    background: #ffffff;
    padding: 20px;
    margin-bottom: 10px;
    font-family: "Oswald", sans-serif;

    ::placeholder {
      color: #9f9f9f;
    }
  }

  p {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
    text-decoration: underline;
    margin-top: 20px;
  }

  @media (max-width: 700px) {
    width: 100vw;
    height: 70%;
    bottom: 0;

    input {
      height: 10%;
    }
  }

  input#email {
    background-color: ${(props) => props.emailBackground};
  }
`;

const ButtonDisabled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;
