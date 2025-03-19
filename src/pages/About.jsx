import styled from "styled-components";

const Container = styled.div`
  background-color: #660000;
  color: #d4af37;
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const About = () => {
  return (
    <Container>
      <h1>Hakkımızda</h1>
      <p>Pera Palace, tarihi dokusu ve eşsiz lezzetleriyle hizmetinizde.</p>
    </Container>
  );
};

export default About;
