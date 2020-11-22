import React,{useState} from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import {connect} from "../../utils/fetchdata"; ///LEFT PART
import Modify from "../../hooks/Modify";

const InputWrapper = styled.input`
  padding: 0.4rem 0.6rem;
  background: ${(props) => props.theme.inputBg};
  color: ${(props) => props.theme.primaryColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  font-family: "Fira Sans", sans-serif;
  font-size: 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
`;

const Search = () => {
  const searchterm = Modify("");//not fully implemented
  const [Search,setSearch] = useState([]);
  const handleSearch = (e) => {   
     if(e.keyCode==13){
        connect(`/user/search/${searchterm.value}`).then((response) => {
            setSearch(response.data);
            console.log(Search);
          });
        }
      //searchterm.setValue("");
      //return toast.success("success");
    
  };

  return (
    <InputWrapper
      type="text"
      value={searchterm.value}
      onKeyDown={handleSearch}
      onChange={searchterm.onChange}
      placeholder="Search"
    />
  );
};

export default Search;