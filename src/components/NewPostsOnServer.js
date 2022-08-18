import styled from "styled-components";
import { BiRefresh } from "react-icons/bi";
import { IconContext } from "react-icons";

export default function NewPostsOnServer({
  fetchPosts,
  countNewPublications,
  setCountNewPublications,
}) {
  function refresh() {
    setCountNewPublications(0);
    fetchPosts();
  }
  return (
    <Container>
      <p>{countNewPublications} new posts, load more!</p>
      <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
        <BiRefresh onClick={refresh} />
      </IconContext.Provider>
    </Container>
  );
}

const Container = styled.div`
  width: 611px;
  height: 61px;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: #ffffff;
    font-size: 16px;
    margin-right: 15px;
  }
`;
