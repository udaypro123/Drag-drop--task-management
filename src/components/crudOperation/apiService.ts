import axios from "axios";

const BASE_URL = "http://localhost:3001/items";

export const getItems = () => axios.get(BASE_URL);
export const getItem = (id: number) => axios.get(`${BASE_URL}/${id}`);
export const createItem = (item: any) => axios.post(BASE_URL, item);
export const updateItem = (id: number, item: any) => axios.put(`${BASE_URL}/${id}`, item);
export const deleteItem = (id: number) => axios.delete(`${BASE_URL}/${id}`);
export const patchItemOrder = (id: any, data: {order: any}) => axios.patch(`${BASE_URL}/${id}`, data);
