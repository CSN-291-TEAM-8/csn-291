import React, {useEffect,useState} from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
//import { NoticeContext } from "../../context/NoticeContext";
import { connect } from "../../utils/fetchdata";
import Loader from "../utility/Loader";
//import Modal from "../posts/Modal";
import NoticeComponents from './NoticeComponents';
import {logout} from "../home/Home";
import Follow from "../utility/Follow";
import Avatar from "../../styles/Avatar";

const NoticeModal = styled.div`
width:60%;
margin:auto;
margin-top:3.5rem !important;
display:flex;
flex-wrap:wrap;
flex-direction:column;
padding:10px 8px;

.notice,.suggestions{
    width:100%;    
    background:#222;
    margin:15px 2px;
    padding-left:5px;
}
.suggestion-component,.suggestion-body,.suggestions-usercard{
    width:100%;
    padding:2px;
}
.suggestions-usercard{
    display:flex;
    flex-wrap:nowrap;
}
.userdetail{
    display:flex;
    width:80%;
    cursor:pointer;
    flex-wrap:nowrap;
    
}
.followrapper *{
    margin:auto;
    margin-right:16px;
}
@media screen and (max-width: 690px) {
    width: 100%;
    padding:10px 0px;
  }


`;
const Notification=()=>{
    const [Notice,setNotice] = useState([]);
    const [Suggestions,setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    useEffect(()=>{
    connect('/user/notice',{method:"POST"}).then((res)=>{
        setNotice(res.notices);
        console.log(res.notices);
        if(localStorage.getItem('lastnoticekey')==res.notices[0]?._id?.toString()){
           // toast.success("You dont have any new notification")
        }
        else{
            localStorage.setItem('lastnoticekey',res.notices[0]?._id?.toString());
            toast.success('You have new notices');
        }
        setLoading(false);
    }).catch(err=>{
        err.logout&&logout();
        toast.error(err.message);
    })
    connect("/user").then((response) => {
        setSuggestions(response.data.filter((user) => !user.isFollowing));
      });
},[setNotice,setLoading,setSuggestions]);
if (loading) {
    return <Loader />;
}

    return (
        <NoticeModal>
            
            {Notice.length > 0 ? (
        <>
          <div className="notice">
          <h3 style={{borderBottom:"1px solid white",padding:"20px 10px"}}>Notifications</h3>
            {Notice.map((notice) => (
              <NoticeComponents key={notice._id} notice={notice} />
            ))}
          </div>
          <div className="suggestions"> {
            Suggestions.length>0?(                     
                <div className="suggestion-component">
                    <h3 style={{borderBottom:"1px solid white",paddingBottom:"4px"}}>Suggestions for You</h3>
                    {
                        Suggestions.map((user)=>(
                            <div key={user._id} className="suggestion-body">                                             
                                <div key={user.username} className="suggestions-usercard">
                                <div className="userdetail" onClick={() => history.push(`/${user.username}`)} >  
                                <Avatar
                                    style={{alignSelf:"center"}}                                                                
                                    src={user.avatar}
                                    alt="avatar"
                                    />
                                    <div className="user-info" style={{display:"flex",flexWrap:"wrap",flexDirection:"column",justifyContent:"start"}}>
                                    <h3 style={{width:"100%"}}>{user.username}</h3>
                                    <span style={{width:"100%",color:"gray"}}>{user.fullname}</span>
                                    </div>
                                    </div>
                                    <div style={{width:"calc(100% - 100px)",display:"flex"}} className="followrapper">
                                        <Follow isFollowing={user.isFollowing} userId={user._id} />
                                    </div>
                                    </div>                                  
                             </div>
                        ))
                    }
                </div>):
            <h3 style={{padding:"20px 10px"}}>Right now ,there is no suggestions for you.</h3>
           }
        </div>            
        </>
      ) : (       
        <div class="suggestions"> {
            Suggestions.length>0?(                     
                <div className="suggestion-component">
                    <h3 style={{borderBottom:"1px solid white",paddingBottom:"4px"}}>Suggestions for You</h3>
                    {
                        Suggestions.map((user)=>(
                            <div key={user._id} className="suggestion-body">                                             
                                <div key={user.username} className="suggestions-usercard">
                                <div className="userdetail" onClick={() => history.push(`/${user.username}`)} >  
                                <Avatar
                                    style={{alignSelf:"center"}}                                                                
                                    src={user.avatar}
                                    alt="avatar"
                                    />
                                    <div className="user-info" style={{display:"flex",flexWrap:"wrap",flexDirection:"column",justifyContent:"start"}}>
                                    <h3 style={{width:"100%"}}>{user.username}</h3>
                                    <span style={{width:"100%",color:"gray"}}>{user.fullname}</span>
                                    </div>
                                    </div>
                                    <div style={{width:"calc(100% - 100px)",display:"flex"}} className="followrapper">
                                        <Follow isFollowing={user.isFollowing} userId={user._id} />
                                    </div>
                                    </div>                                  
                             </div>
                        ))
                    }
                </div>):
            <h3 style={{padding:"20px 10px"}}>Right now ,there is no suggestions for you.</h3>
           }
        </div>         
      )}
       </NoticeModal>
    );
  }


export default Notification;