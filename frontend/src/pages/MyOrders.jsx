import { useEffect, useState } from "react";
import { getMyOrders } from "../api/orderApi";

export default function MyOrders({ token }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(token);
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [token]);

  if (!orders.length) return <p className="p-6">No orders found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="section-title mb-6 text-center">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="card shadow-xl p-4">
            <p className="font-semibold">Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Payment: {order.paymentMethod}</p>
            <p>Total: ₹{order.totalAmount}</p>

            <div className="mt-3">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div className="flex items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded img-shadow"
                    />
                    <p className="ml-3">{item.product.name}</p>
                  </div>
                  <p>
                    ₹{item.product.price} × {item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
