// src/firebase/ordersCRUD.js

import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, getDoc } from "firebase/firestore";

// create
export const createOrder = async (userId, cartItems) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const orderData = {
    userId,
    products: cartItems,
    totalItems,
    totalPrice,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "orders"), orderData);
  return docRef.id;
};

// fetch all
export const getUserOrders = async (userId) => {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// fetch single
export const getOrderById = async (orderId) => {
  const docRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error("Order not found");
  return { id: docSnap.id, ...docSnap.data() };
};
