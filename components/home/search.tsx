import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import styled from "styled-components";
import { Center } from "../../styles/utils";

const Search: FC<{ handleSearch: (search: string) => void }> = ({ handleSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(search);
    }
  };

  const handleSearchSubmit = () => handleSearch(search);

  return (
    <SearchWrapper>
      <Input onChange={handleChange} placeholder="Search..." onKeyDown={handleOnKeyDown} />
      <Button onClick={handleSearchSubmit}>Search</Button>
    </SearchWrapper>
  );
};

export default Search;

const SearchWrapper = styled(Center)`
  margin-bottom: 60px;
`;

const Input = styled.input`
  display: block;
  font-size: 1.2rem;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 0;
  text-align: center;
  font-size: 1.2rem;
`;
