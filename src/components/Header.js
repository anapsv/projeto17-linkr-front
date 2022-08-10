import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useUserData,
  deleteUserDataInLocalStorage,
} from "../contexts/UserDataContext";
import axios from "axios";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export default function Top() {
  const [{ name, profilePic, token }, setUserData] = useUserData();
  const [menuDisplay, setMenuDisplay] = React.useState(false);
  const navigate = useNavigate();

  function checkMenu() {
    if (menuDisplay) {
      setMenuDisplay(false);
    }
  }
  function menu() {
    if (menuDisplay) {
      setMenuDisplay(false);
    } else {
      setMenuDisplay(true);
    }
  }

  function logout() {
    const auth = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const requisition = axios.delete("https://localhost:4000/session", auth);
    requisition.then((response) => {
      setUserData(null);
      deleteUserDataInLocalStorage();
      navigate("/");
    });
    requisition.catch((error) => {
      alert("Ocorreu um erro");
      console.log(error.data);
    });
  }

  return (
    <Container>
      <Header onClick={checkMenu}>
        <h1>linkr</h1>
        <Avatar onClick={menu}>
          {menuDisplay ? (
            <IoIosArrowUp color="white" size="26px" />
          ) : (
            <IoIosArrowDown color="white" size="26px" />
          )}
          <img
            src="http://pm1.narvii.com/6422/616d22cc4500a5e6b4386304ccbe26ada6e46b1a_00.jpg"
            alt="user"
          />
        </Avatar>
      </Header>
      {menuDisplay ? (
        <Logout>
          <div onClick={logout}>
            <span>Logout</span>
          </div>
        </Logout>
      ) : (
        <></>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 72px;
  width: 100%;
  background-color: #151515;
  position: fixed;
  top: 0;
  z-index: 1;

  h1 {
    font-family: "Passion One", cursive;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    color: #ffffff;
  }

  img {
    width: 53px;
    height: 53px;
    object-fit: cover;
    border-radius: 26.5px;
  }
`;

const Avatar = styled.div`
  display: flex;
  width: 86px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  height: 100%;
`;

const Logout = styled.div`
  height: 47px;
  width: 135px;
  position: fixed;
  right: 0;
  border-radius: 0px 0px 0px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #171717;

  span {
    color: #ffffff;
    font-size: 17px;
    font-family: "Lato";
    font-weight: 700;
    cursor: pointer;
  }
`;
