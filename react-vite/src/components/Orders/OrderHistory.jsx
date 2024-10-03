import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserHistoryThunk } from "../../redux/history";
import './OrderHistory.css'

const OrderHistory = () => {
    const dispatch = useDispatch();
    const histories = useSelector(state => state.histories?.UserOrderHistory);
    const products = useSelector(state => state.histories?.HistoryProd)

    const allHistory = histories?.map(order =>
        order = {
            ...order, "product": products?.filter(product => product.id == order.product_id)[0]
        }
    )

    const sortHistory = allHistory?.reduce((acc, order) => {
        const createdAt = order.createdAt?.slice(0, 16)
        if (!acc[createdAt]) {
            acc[createdAt] = []
        }
        acc[createdAt].push(order)
        return acc
    }, {})

    let historySorted = []
    if (sortHistory) {
        historySorted = Object.values(sortHistory)
    }

    useEffect(() => {
        dispatch(getUserHistoryThunk())
    }, [dispatch])

    return (
        <div className='order-history-contain'>
            <h1 id='curr-title'>Order History</h1>
            <div id='order-history'>
                {historySorted?.length > 0 ? (
                    historySorted?.reverse().map((historyArr) => (
                        <div className="history-sect" key={historyArr[0].createdAt}>
                            <div className="history-head">
                                <div>
                                    <h2>{historyArr[0]?.createdAt?.slice(0, 16).split(' ')[0]}</h2>
                                    <h3>{historyArr[0]?.createdAt?.slice(0, 16).split(' ')[1]}</h3>
                                </div>
                            </div>
                            <div className="history-body">
                                {historyArr?.map((order) => (
                                    <div key={order.id} className='order-history-item'>
                                        <img src={order.product.image} alt={order.product.name} />
                                        <div>
                                            <h3>{order.product.name}</h3>
                                            <h4>Quantity: {order.quantity}</h4>
                                            <h4>Price: ${order.product.price}</h4>
                                            <h4>Total: ${order.product.price * order.quantity}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-orders">
                        <h2>No orders found</h2>
                        <p>You haven&apos;t placed any orders yet. Start shopping to see your order history!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderHistory;
