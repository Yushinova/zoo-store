import { API_CONFIG } from '@/config/api';
import { OrderResponse } from '@/models/order';
import { OrderUpdateRequest } from '@/models/order';
import { UserOrderResponse } from '@/models/order';

export class OrderService {
  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  //получить все заказы с пагинацией
  async getOrdersSorted(page = 1, pageSize = 2) {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/order/admin?page=${page}&pageSize=${pageSize}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Message || `HTTP error! status: ${response.status}`);
      }

      const ordersData = await response.json();
      //преобразуем данные в OrderResponse
      return ordersData.map(orderData => {
        const order = new OrderResponse();
        Object.assign(order, orderData);
        
        //обрабатываем вложенные объекты
        if (orderData.user) {
          order.user = Object.assign(new UserOrderResponse(), orderData.user);
        }
        
        if (orderData.orderItems && Array.isArray(orderData.orderItems)) {
          order.orderItems = orderData.orderItems.map(item => ({
            ...item,
          }));
        }
        
        return order;
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  //обновить заказ по id
  async updateOrderById(orderId, updateData) {
    try {

      const response = await fetch(
        `${this.baseUrl}/api/order/admin/${orderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(updateData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Message || `HTTP error! status: ${response.status}`);
      }

      const updatedOrder = await response.json();
      console.log('✅ Order updated successfully:', updatedOrder);
      return updatedOrder;

    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }
}

export const orderService = new OrderService();