import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersHistory } from "../store/history"

const OrdersHistory = () => {

    const dispatch = useDispatch();

    const allPurchases = useSelector((state) => {
        return state.ordersReducer;
    });

    useEffect(() => {
        dispatch(getOrdersHistory())
    }, [])

    console.log(allPurchases)

    const purchasesList = allPurchases.map((singlePurchase) => {
        return (
            <table key={singlePurchase.id} style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th className="items-cells">Purchase ID</th>
                        <th className="items-cells">Purchase Status</th>
                        <th >Products</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td className="items-cells">{singlePurchase.id}</td>
                        <td className="items-cells">{singlePurchase.status}</td>
                        <td >{singlePurchase.inventoryItems.map((item) => {
                            return (
                                <table key={item.id}>
                                    <tbody>
                                <tr  className="products-div">
                                    <td>{item.itemName}</td>
                                    <td>Price = $ {item.itemPrice}</td>
                                    <td>Quantity = {item.shoppingItem.quantity}</td>
                                </tr>
                                </tbody>
                                </table>
                            )
                        })}</td>
                    </tr>
                </tbody>
            </table>

        )
    })
    return (
        <>
            <p className="allorders">All Orders</p>
            {purchasesList}
        </>
    )
}

export default OrdersHistory;