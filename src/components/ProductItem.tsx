import React from "react";
import IProduct from "../types/IProduct";
import HttpClient from "../services/HttpClient";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import FilledBtn from "./btns/FilledBtn";
import BorderedBtn from "./btns/BorderedBtn";

const ProductItem = ({item}:{item: IProduct}) => {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useCart()
    const quantity = getItemQuantity(item.id)
    const { isAdmin} = useAdmin()
    console.log(isAdmin)
    return <div key={item.id} className="w-80 h-160 bg-fuchsia-50 mx-10 my-5">
        <img src={item.imageSrc != "" ? item.imageSrc :
            "/NO_PHOTO_YET.png"}
             alt={item.name}
             className="w-full h-96 object-cover"/>
        <div className="p-5 h-64">
            <h2 className="text-xl font-semibold h-14">{item.name}</h2>
            <p className="font-extralight h-20 my-2">{item.description} </p>
            <p className="text-fuchsia-600 my-1">
                {item.newPrice} грн.
                <span className="line-through text-gray-500 mr-14 ml-2">
                    {item.oldPrice} грн.
                </span>
                {item.isAvailable ?
                    <span className="text-fuchsia-600">в наявності</span> :
                    <span className="text-gray-500">немає в наявності </span>
                }
            </p>
            <div className="flex justify-between align-bottom">
                <FilledBtn handleClick={isAdmin ?
                    async () => await HttpClient().deleteProduct(item.id) :
                    () => increaseCartQuantity(item.id)}>
                    {isAdmin ? "Видалити" : "В кошик"}
                </FilledBtn>
                <BorderedBtn handleClick={() => window.location.pathname = `/ProductDetails/${item.id}`}>
                    {isAdmin ? "Редагувати" : "Детальніше"}
                </BorderedBtn>
            </div>
        </div>
    </div>;
}
export default ProductItem