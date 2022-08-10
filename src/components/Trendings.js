import styled from "styled-components";

export default function Trendings() {
  return (
    <Container>
      <h1>trending</h1>
      <Margin />
      <p>#Javascript</p>
      <p>#html</p>
      <p>#css</p>
      <p>#mobile</p>
      <p>#sql</p>
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

  h1 {
    font-weight: 700;
    font-size: 27px;
    color: #ffffff;
    font-family: "Oswald", sans-serif;
  }

  p {
    font-weight: 700;
    font-size: 19px;
    color: #ffffff;
    font-family: "Oswald", sans-serif;
    margin-bottom: 5px;
  }
`;

const Margin = styled.div`
  margin: 12px 0 12px 0;
  border: 1px solid #484848;
`;
