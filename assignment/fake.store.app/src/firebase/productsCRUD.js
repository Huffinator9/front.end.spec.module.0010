// src/firebase/productsCRUD.js

import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

// Fetch all products
export const getAllProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Fetch single product
export const getProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error("Product not found");
  return { id: docSnap.id, ...docSnap.data() };
};

// Add new product
export const addProduct = async (product) => {
  const docRef = await addDoc(collection(db, "products"), { ...product, createdAt: serverTimestamp() });
  return docRef.id;
};

// Update existing product
export const updateProduct = async (id, updatedProduct) => {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, updatedProduct);
};

// Delete product
export const deleteProduct = async (id) => {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
};
