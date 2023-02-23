export interface Orders{
    name: string;
    id: number;
    foodId: number;
    userId: number;
    price: number;
    qty: number;
    description: string;
    status: number;
    dateTime: string;
    orderGroup: number;
}