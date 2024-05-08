import React, { useState, useContext, useEffect } from 'react';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context'
function View() {

  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(PostContext)
  const { firebase } = useContext(FirebaseContext)
  const userId = postDetails.userId


  useEffect(() => {
    const FetchData = async () => {
      const db = getFirestore(firebase);
      const q = query(collection(db, 'users'), where('id', '==', userId));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(doc => (doc.data()))
      setUserDetails(...data)

    }
    FetchData();
  }, [])


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>Name : {postDetails.product}</span>
          <p>Category : {postDetails.category}</p>
          <span>Posted On : {postDetails.createdAt}</span>
        </div>
        {
          userDetails && <div className="contactDetails">
            <p>Seller details</p>
            <p>Seller Name : {userDetails.userName}</p>
            <p>Seller Mobile : {userDetails.phoneNo}</p>
          </div>
        }

      </div>
    </div>
  );
}
export default View;
