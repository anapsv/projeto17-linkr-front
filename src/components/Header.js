import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserData, deleteUserDataInLocalStorage } from "../contexts/UserDataContext";
import axios from "axios";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons";
import { DebounceInput } from "react-debounce-input";

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
    const requisition = axios.delete("http://localhost:4000/session", auth);
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
    <IconContext.Provider value={{ color: "white", size: "2em" }}>
      <Container>
        <Header onClick={checkMenu}>
          <h1>linkr</h1>
          <DebounceInput type={"search"} placeholder={"Search for people"} minLength={3} debounceTimeout={300}/>
          <Avatar onClick={menu}>
            {menuDisplay ? <IoIosArrowUp /> : <IoIosArrowDown />}
            <img src={profilePic} alt="user" />
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
    </IconContext.Provider>
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

  input {
    width: 564px;
    height: 45px;
    border-radius: 8px;
    font-size: 19px;
    font-family: "Lato";
    font-weight: 400;
    border-style: none;
    outline: none;
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
