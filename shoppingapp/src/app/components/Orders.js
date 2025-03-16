import React from "react";
import { useQuery } from "@apollo/client";
import { orderClient } from "../apolloClients";  // Import orderClient
import { GET_ORDERS } from "../graphql/queries"; // Import query

const Orders = () => {
  const { loading, error, data } = useQuery(GET_ORDERS, { client: orderClient });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {data.orders.map((order) => (
          <li key={order.id}>
            <strong>Order #{order.id}</strong> - {order.status} - ${order.totalAmount}
            <ul>
              {order.orderItems.map((item, index) => (
                <li key={index}>
                  {item.product.name} x {item.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;