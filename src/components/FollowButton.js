import axios from 'axios';
import { useState } from 'react';
import { useUserData } from "../contexts/UserDataContext";
import styled from 'styled-components';
import { APIHost } from "../config/config";


export default function FollowButton ({ id, followed, setFollowed }) {
    const [active, setActive] = useState(false);
    const [{ userId, token }] = useUserData();
    console.log(userId);
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`
       } 
    }
    
    function followUser () {        
        const promise = axios.post(APIHost + `follow`, { userPageId: id }, config);
        promise.then((res) => {
            if (res.data === 'followed') {
                setActive(true);
                setFollowed(!followed)
            } if (res.data === 'unfollowed') {
                setActive(true);
                setFollowed(!followed)
            }         
        });
        promise.catch((err) => {
            console.log(err)
        })
    }
    
    return (
        <>
            {parseInt(id) !== userId ? 
                <Button disabled={active}
                        background={followed ? "#FFFFFF" : "#1877F2"}
                        font={followed ?  "#1877F2" : "#FFFFFF"}  
                        onClick={followUser}>{followed ? "Unfollow" : "Follow"}</Button>
            : ""}
        </>
    )
}

const Button = styled.button`
    width: 110px;
    height: 30px;
    background-color: ${(props) => props.background};
    color: ${(props) => props.font};
    border: none;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    cursor: pointer;
`;