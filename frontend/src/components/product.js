import { Link } from "react-router-dom"
import Rating from "./Rating"

function Product(props){
    const {product} = props

    return(
        <div key={product._id} className="card min-50">
            <Link to={"product/" + product._id}>
                <div className="home-product">
                    <img className="medium" src={product.images_list[0]} alt="product" />
                </div>
            </Link>
            <div className="card-body">
                <Link to={"product/" + product._id}>
                    <h2 className="product_title">{product.title}</h2>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <div className="price">$ {product.price ? product.price.split("-")[0] : "unable"}</div>
            </div>
        </div>
    )
}

export default Product