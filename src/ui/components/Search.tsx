import { useState } from 'react';
import styled from 'styled-components';
import { Input } from './Input';
import { Button } from './Button';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const Search = ({ onSearch, placeholder }: SearchProps) => {
  const [text, setText] = useState('');

  const handleSearch = () => {
    onSearch(text);
    setText('');
  };

  return (
    <SearchContainer>
      <Input type="text" placeholder={placeholder} value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={handleSearch}>Search</Button>
    </SearchContainer>
  );
};
