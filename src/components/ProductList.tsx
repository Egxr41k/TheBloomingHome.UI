import React, { useState, useEffect } from 'react';
import ProductItem from "./ProductItem";
import {emptyProduct, IProduct} from "../types/IProduct";
import {RequestHandler} from "../services/RequestHandler";
import ProductForm from "./ProductForm";
import {ProductDetails} from "./ProductDetails";


export const ProductList = () => {
    const [data, setData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(emptyProduct);
    useEffect(() => {
        const getProducts = async () =>{
            let products = await RequestHandler().fetchAll()
            setData(products)
        }
        getProducts()
    }, []);
    return <div className="flex flex-wrap justify-center">
        { selectedProduct ? <ProductDetails item={selectedProduct}/> :
            data.map((item: IProduct) => <ProductItem item={item}/>) }
        <ProductForm/>
    </div>;
}