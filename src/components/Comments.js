import styled from "styled-components";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useState } from "react";
import { useUserData } from "../contexts/UserDataContext";
import { sendComment } from "../services/comments";
import { useNavigate } from "react-router-dom";

function SingleComment({ comment, userId }) {
    const navigate = useNavigate();

    function redirectUser() {
        navigate(`/user/${comment.userId}`);
    }

    // console.log(comment);

    return (
        <CommentContent>
            <img src={ comment.profilePic } alt='user' />
            <RightSide>
                <Top>
                    <h2 onClick={ redirectUser }>{ comment.username }</h2>
                </Top>
                <Bottom>
                    <p>{ comment.content }</p>
                </Bottom>
            </RightSide>
        </CommentContent>
    );
}

export default function Comments({display, id, postComments, userId, profilePic }) {
    const [comment, setComment] = useState('');
    const [{ token }] = useUserData();
    const auth = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    async function insertComment() {
        const body = { comment };
        console.log(body);

        const response = await sendComment(id, body, auth);

        if (response === 201) {
            setComment('');
        } else {
            alert("Houve um erro ao publicar seu comentário");
            console.log(response);
        }
    }


    return (
        <CommentsContainer display>
            {postComments.map((comment, index) => <SingleComment key={index} comment={comment} userId={userId} />)}
            <InputComment>
                <img src={ profilePic } alt='user' />
                <Input
                    type="text"
                    placeholder='write a comment...'
                    value={ comment }
                    onChange={ (e) => setComment(e.target.value) }
                    required
                />
                <IconContext.Provider value={ { color: "white", size: "1.5em", style: { marginLeft: "1.5em", marginTop: "0.5em" } } } >
                    <IoPaperPlaneOutline onClick={ insertComment } />
                </IconContext.Provider>
            </InputComment>
        </CommentsContainer>
    );
}

const CommentsContainer = styled.div`
    background-color: #1E1E1E;
    border-radius: 0 0 16px 16px;
    width: 100%;
    display: ${(props) => (props.display ? "flex" : "none")};
    flex-direction: column;
    padding: 0 25px 25px 25px;
    margin-bottom: 16px;
    img {
        width: 39px;
        height: 39px;
        object-fit: cover;
        border-radius: 20px;
        margin-right: 14px;
    }
`;

const InputComment = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 19px;
    position: relative;
`;

const Input = styled.input`
    height: 39px;
    width: 90%;
    background-color: #252525;
    text-indent: 10px;
    color: #575757;
    border: none;
    outline: none;
    border-radius: 5px;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 18px;
    @media(max-width: 611px) {
        font-size: 12px;
    }
`;

const CommentContent = styled.div`
    display: flex;
    padding-top: 15px;
    border-bottom: 1px solid #353535;
`;

const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding:0 0 15px 0;
    margin-left: 5px;
    font-family: 'Lato';
    font-size: 14px;
    line-height: 17px;
    word-break: break-word;
`;

const Top = styled.div`
    display: flex;
    h2 {
        font-weight: 700;
        color: #F3F3F3;
        cursor: pointer;
    }
    p {
        font-weight: 400;
        color: #565656;
        margin-left: 5px;
    }
`;

const Bottom = styled.div`
    p {
        font-weight: 400;
        color: #ACACAC;
    }
`;


// background-color: ${(props) => (props.bg ? "#FFFFFF" : "#171717")};