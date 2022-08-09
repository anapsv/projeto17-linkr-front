import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp () {
    const [data, setData] = useState({email: "", password: "", username: "", profilePic: ""});
    const navigate = useNavigate();
    const [disable, setDisable] = useState(false);

    function signUp(e) {
        e.preventDefault();
        setDisable(true);
        //https://projeto-linkr17.herokuapp.com/        
        const promise = axios.post('http://localhost:4000/sign-up', {
            email: data.email,
            password: data.password,
            username: data.username,
            profilePic: data.profilePic
        })
        if (data.email.length === 0) {
            alert('Please fill email.')
        }
        promise.then((res) => {
            setData('')
            navigate('/')
        })
        promise.catch((err) => {
            setDisable(false);
            alert(err.response.data.error);
        })
    }

    return (
        <Container>
            <Info>
                <h1>linkr</h1>
                <h2>save, share and discover <br />the best links on the web</h2>
            </Info>
            <Form onSubmit={signUp}>
                <input id='e-mail' placeholder='e-mail' type='email' required value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
                <input placeholder='password' type='password' required value={data.password} onChange={e => setData({ ...data, password: e.target.value })} />
                <input placeholder='username' type='text' required value={data.username} onChange={e => setData({ ...data, username: e.target.value })} />
                <input placeholder='picture url' type='url' required value={data.profilePic} onChange={e => setData({ ...data, profilePic: e.target.value })} />
                {
                    disable ? <ButtonDisabled>Sign Up</ButtonDisabled>
                    : <button type='submit'>Sign Up</button>
                }
                <Link to='/'>
                    <p>Swith back to log in</p>
                </Link>
            </Form>
        </Container>
    )
}

const Container=styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #151515;
    align-items: center;
    
    button {
        width: 80%;
        height: 8%;
        font-size: 28px;
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        line-height: 40px;
        color: #ffffff;
        background-color: #1877F2;
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
`

const Info=styled.div`
    width: 35%;
    margin-left: 10%;
    display: flex;
    flex-direction: column;
    color: #FFFFFF;

    h1 {
        font-size: 105px;
        font-weight: 700;
        line-height: 115px;
        font-family: 'Passion One', cursive;
    }

    h2 {
        font-size: 45px;
        font-weight: 700;
        line-height: 65px;
        font-family: 'Oswald', sans-serif;
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
`

const Form=styled.form`
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
        color: #9F9F9F;
        border-radius: 5px;
        color: #333333;
        background: #ffffff;
        padding: 20px;
        margin-bottom: 10px;
        font-family: 'Oswald', sans-serif;

        ::placeholder {
            color: #9F9F9F;
        }
    }

    p {
        font-family: 'Lato', sans-serif;
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
        background-color: ${props => props.emailBackground};
    }

`

const ButtonDisabled=styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
`