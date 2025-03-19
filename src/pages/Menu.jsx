import styled from "styled-components";

const MenuContainer = styled.div`
  background-color: #660000; /* Bordo Arka Plan */
  color: #d4af37; /* Altın Yazılar */
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin: 20px 0;
`;

const Menu = () => {
  return (
    <MenuContainer>
      <Title>Menü</Title>
      <Subtitle>Lezzetli yemeklerimiz için aşağıdan seçim yapın.</Subtitle>
    </MenuContainer>
  );
};

export default Menu;
