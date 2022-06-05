import styled from "styled-components"

const Container = styled.div`
  min-height: 100vh;
  max-width: 1280px;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
`

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Between = styled(Center)`
  justify-content: space-between;
`

const CocktailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  gap: 50px;
  @media (max-width: 1050px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

export { Container, Center, Column, Between, CocktailsWrapper }
