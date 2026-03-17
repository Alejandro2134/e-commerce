class OrderItemDTO {
  productId: number;
  quantity: number;
}

export class CreateOrderDTO {
  items: OrderItemDTO[];
}
