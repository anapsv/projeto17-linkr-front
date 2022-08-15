import styled from "styled-components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData, deleteUserDataInLocalStorage } from "../contexts/UserDataContext";
import axios from "axios";
import { IoIosArrowUp, IoIosArrowDown, IoIosSad } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IconContext } from "react-icons";
import { DebounceInput } from "react-debounce-input";
import { APIHost } from '../config/config';

export default function Top() {
  const [{ name, profilePic, token }, setUserData] = useUserData();
  const [menuDisplay, setMenuDisplay] = React.useState(false);
  const [searchDisplay, setSearchDisplay] = React.useState(false);
  const [users, setUsers] = React.useState([])
  const [nameSearch, setNameSearch] = React.useState("");
  const navigate = useNavigate();

  function onSearch(){
    setSearchDisplay(true);
  }

  function RenderSearchs(){
    if(users.length > 0){
      return users.map((user)=>{
        return(
          <li key={user.id} >
            <img src={user.profilePic} alt="" onClick={()=>{goToUser(user.id)}}/>
            <p onClick={()=>{goToUser(user.id)}}>{user.username} </p>
          </li>
        )
      })
    }
    return (<li><IoIosSad style={{marginRight: "40px", color: "#707070"}}/>No users found!</li>)
  }

  function searchUser(e){
    const auth = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = { nameSearch };
    const requisition = axios.post(APIHost + `search`, body,  auth)
    requisition.then((res)=>{
      setUsers(res.data);
    })
    requisition.catch((error)=>{
      alert("Ocorreu um erro");
      console.log(error)
    })
  }
  
  useEffect((nameSearch) =>{
    searchUser();
  }, [nameSearch])

  function offSearch(){
      setSearchDisplay(false);
  }
  
  function goToUser(id){
      navigate(`/user/${id}`);
  }

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
    const requisition = axios.delete(APIHost + `session`, auth);
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

  function goToTimeline () {
    navigate('/timeline')
  }

  return (
    <IconContext.Provider value={{ color: "white", size: "2em" }}>
      <Container>
        <Header onClick={checkMenu}>
          <h1 onClick={goToTimeline}>linkr</h1>
          <Search>
            <SearchBar onClick={onSearch}>
              <DebounceInput type="text" placeholder="Search for people" minLength={3} value={nameSearch} debounceTimeout={300} onChange={(e) => { setNameSearch(e.target.value); if (nameSearch.length >= 3) { searchUser(e); } else{ setUsers([]); }}}/>
              <IoSearch type="submit" color="#ffffff" size={30} />
            </SearchBar>            
            {searchDisplay ? 
              <SearchMenu onMouseLeave={offSearch}>
                {users? <RenderSearchs/> : <></>}
              </SearchMenu>
            : <></>}
          </Search>
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
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  left: 0;
  top: 0;

`
const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 564px;
  position: relative;
  padding-top: 40px;

`

const SearchMenu = styled.ul`
  width: 564px;
  border-radius: 8px;
  margin-top: 30px;
  background-color: #E7E7E7;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;

  li{
    margin: 20px 20px;
    display: flex;
    align-items: center;
    

    p{
      margin-left: 10px;
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 23px;
      color: #515151;
    }
  }
`

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
