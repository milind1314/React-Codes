import { useEffect, useState } from "react";

export function FlipkartMobile() {
    
    const [product, setProduct] = useState({title:"",price:0,rating:{rate:0, ratings:0, reviews:0},offers:[],image:""});


    function LoadProduct(){
        var http = new XMLHttpRequest();
        http.open("get","product.json",true);
        http.send();
        http.onreadystatechange = function(){
            if (http.readyState === 4) {
                setProduct(JSON.parse(http.responseText));
            }
        }
    }

    useEffect(() => {
        LoadProduct();
    },[])

    // if (error) {
    //     return <div className="text-danger">Error: {error}</div>;
    // }

    if (!product) {
        return <div className="text-center">Loading...</div>;
    }

    return(
        <div className="container-fluid">
            <div className="row mt-4">
                <div className="col-3">
                    <img src={product.image} width="100%" alt="iphone-img" />
                </div>
                <div className="col-9">
                    <div className="h4 my-2">{product.title}</div>
                    <div>
                        <span className="badge bg-success text-white">{product.rating.rate}<span className="bi bi-star-fill"></span></span>
                        <span className="text-secondary fw-bold">{product.rating.ratings.toLocaleString()} ratings & {product.rating.reviews} reviews</span>
                    </div>
                    <div className="my-3">
                        <div className="fs-2 fw-bold"> &#8377;{product.price.toLocaleString('en-in')}</div>
                    </div>
                </div>
                <h5>Available Offers</h5>
                <ul className="list-unstyled">
                    {
                        product.offers.map(offer =><li className="bi bi-tag-fill my-3 text-success" key={offer}>
                            <span className="text-secondary">{offer}</span></li>)
                    }
                </ul>
            </div>
        </div>
    )
}