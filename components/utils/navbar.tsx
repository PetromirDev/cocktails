import Link from "next/link";
import React, { FC } from "react";
import styled from "styled-components";
// Styles
import { Center } from "../../styles/utils";

const Navbar: FC<{
  render?: React.ReactElement | React.ReactElement[];
}> = ({ render }) => {
  return (
    <Wrapper>
      <Logo>Cocktails</Logo>
      {render}
      <Navigation>
        <Link href="/">
          <NavItem>Home</NavItem>
        </Link>
        <Link href="/favourites">
          <NavItem>Favourites</NavItem>
        </Link>
      </Navigation>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.header`
  padding: 10px 0;
  display: flex;
  align-items: center;
`;

const Logo = styled.h2`
  font-size: 2rem;
`;

const NavItem = styled.a`
  margin-left: 20px;
  font-size: 1.5rem;
  border-bottom: 2px solid transparent;
  transition: 0.3s ease-in-out;
  &:hover {
    border-bottom: 2px solid black;
  }
`;

const Navigation = styled(Center)`
  margin-left: auto;
`;
