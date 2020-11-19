import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import {connect} from "../../utils/fetchdata"; ///LEFT PART
import Modify from "../../hooks/Modify";

const InputWrapper = styled.input`
  padding: 0.4rem 0.6rem;
  background: ${(props) => props.theme.bg};
  border: 1px solid ${(props) => props.theme.borderColor};
  font-family: "Fira Sans", sans-serif;
  font-size: 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
`;

const Search = () => {
  const searchterm = Modify("");//not fully implemented

  const handleSearch = (e) => {
    //   const [Search,setSearch] = useState([]);
    //   window.search&&clearTimeout(window.search);
    // window.search = setTimeout(function(){
    //     connect(`/search/?query=${searchterm.value}`).then((response) => {
    //         setSearch(response.data);
    //         console.log(Search);
    //       });
    //   searchterm.setValue("");
    //   return toast.success("success");
    // },500)
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