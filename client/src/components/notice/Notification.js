import React, { useContext } from "react";
import { toast } from "react-toastify";
import { NoticeContext } from "../../context/NoticeContext";
import { connect } from "../../utils/fetchdata";

const Notification=()=>{
    const {Notice,setNotice} = useContext(NoticeContext);
}

export default Notification;