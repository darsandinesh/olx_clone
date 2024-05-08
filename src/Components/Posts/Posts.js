import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from "react-router-dom"
import Heart from '../../assets/Heart';
import './Posts.css';
import Spinner from '../Spinner/Spinner';

function Posts() {

    const [products, setProducts] = useState([])
    const [expensiveProducts, SetexpensiveProducts] = useState([]);
    const [spinner, Setspinner] = useState(false);
    const { firebase } = useContext(FirebaseContext)
    const { setPostDetails } = useContext(PostContext)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                Setspinner(true)
                const db = getFirestore(firebase);
                const prodtCol = collection(db, 'products');
                const querySnapshot = await getDocs(prodtCol);
                console.log(querySnapshot, '.......////')

                const allPost = [];
                querySnapshot.forEach((product) => {
                    allPost.push({
                        ...product.data(),
                        id: product.id
                    });
                });

                setProducts(allPost)
                const expensive = allPost.filter((data) => data.price > 5000000);
                SetexpensiveProducts(expensive)
                console.log(products)
                Setspinner(false)

            } catch (error) {
                console.error("Error getting documents: ", error);
            }
        };

        fetchData();

    }, [])

    return (
        <div>
            {
                spinner
                    ?
                    <Spinner />
                    :
                    <div>

                        <div className="postParentDiv">
                            <div className="moreView">
                                <div className="heading">
                                    <span>All Vehicles</span>
                                    <span>View more</span>
                                </div>
                                <div className="cards">

                                    {/* ============================ */}
                                    {
                                        products.map((data) => {
                                            return (
                                                <div
                                                    className="card"
                                                    onClick={() => {
                                                        setPostDetails(data);
                                                        navigate('/viewPost')
                                                    }}
                                                >
                                                    <div className="favorite">
                                                        <Heart></Heart>
                                                    </div>
                                                    <div className="image">
                                                        <img src={data.url} alt="" />
                                                    </div>
                                                    <div className="content">
                                                        <p className="rate">&#x20B9; {data.price}</p>
                                                        <span className="kilometer">Name : {data.product}</span>
                                                        <p className="name">Category : {data.category}</p>
                                                    </div>
                                                    <div className="date">
                                                        <span>{data.createdAt}</span>
                                                    </div>
                                                </div>
                                            )

                                        })
                                    }


                                    {/* --------------------------- */}
                                </div>

                            </div>
                            <div className="recommendations">
                                <div className="heading">
                                    <span>Expensive Vehicles</span>
                                </div>
                                <div className="cards">
                                    {
                                        expensiveProducts.map((data) => {
                                            return (
                                                <div className="card"
                                                    onClick={() => {
                                                        setPostDetails(data);
                                                        navigate('/viewPost')
                                                    }}>
                                                    <div className="favorite">
                                                        <Heart></Heart>
                                                    </div>
                                                    <div className="image">
                                                        <img src={data.url} alt="" />
                                                    </div>
                                                    <div className="content">
                                                        <p className="rate">&#x20B9; {data.price}</p>
                                                        <span className="kilometer">{data.product}</span>
                                                        <p className="name">{data.category}</p>
                                                    </div>
                                                    <div className="date">
                                                        <span>{data.createdAt}</span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

            }

        </div>


    );
}

export default Posts;
