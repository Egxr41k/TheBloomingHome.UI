import React from "react";
import {IProduct} from "../types/IProduct";

const ProductItem = ({item}:{item: IProduct}) => {
    const isAdmin = true
    return <div key={item.id} className="w-80 h-160 bg-fuchsia-50 mx-10 my-5">
        <img src={item.imageSrc != "" ? item.imageSrc :
            "https://localhost:7128/GetImage/0"}
             alt={item.name}
             className="w-full h-96"/>
        <div className="p-6 h-64">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="font-extralight h-20 my-2">{item.description} </p>
            <p className="text-fuchsia-600 my-3">
                {item.newPrice} грн.
                <span className="line-through text-gray-500 mr-14">
                    {item.oldPrice} грн.
                </span>
                {item.isAvailable ?
                    <span className="text-fuchsia-600">в наявності</span> :
                    <span className="text-gray-500">немає в наявності </span>
                }
            </p>
            <div className="flex justify-between align-bottom">
                <button className="font-semibold border border-black bg-black text-white rounded-md px-4 py-2 hover:border-fuchsia-600 hover:bg-fuchsia-600">
                    {isAdmin ? <>Видалити</> : <>Замовити</>}
                </button>
                <button className="border border-black text-black rounded-md px-4 py-2 hover:border-fuchsia-600 hover:text-fuchsia-600">
                    {isAdmin ? <>Редагувати</> : <>Детальніше</>}
                </button>
            </div>
        </div>
    </div>;
}
export default ProductItem