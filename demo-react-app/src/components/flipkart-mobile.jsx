import { useEffect, useState } from "react";
import $ from "jquery";


export function FlipkartMobile()
{

    const [product, setProduct] = useState({title:'', price:0, rating:{rate:0, ratings:0, reviews:0}, offers:[], image:''});


    function LoadProduct(){

         $.ajax({
             method: "get",
             url: "product.json",
             success: (product) => {
                 setProduct(product);
             }
         })

    }

    useEffect(()=>{

        LoadProduct();

    },[])


    return(
        <div className="container-fluid">
            <div className="row mt-4">
                <div className="col-3">
                    <img src={product.image} width="100%" />
                </div>
                <div className="col-9">
                    <div className="h4 my-2">{product.title}</div>
                    <div>
                        <span className="badge bg-success text-white">{product.rating.rate} <span className="bi bi-star-fill"></span> </span>
                        <span className="text-secondary fw-bold"> {product.rating.ratings.toLocaleString()} ratings & {product.rating.reviews} reviews </span>
                    </div>
                    <div className="my-3">
                        <div className="fs-2 fw-bold"> &#8377; {product.price.toLocaleString('en-in')}</div>
                    </div>
                    <div>
                        <h5>Available Offers</h5>
                        <ul className="list-unstyled">
                            {
                                product.offers.map(offer=><li className="bi bi-tag-fill my-3 text-success" key={offer}> <span className="text-secondary">{offer}</span> </li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}