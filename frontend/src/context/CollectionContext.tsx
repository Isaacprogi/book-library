import React, { createContext, ReactElement, useReducer } from "react";
import {CollectionAction, CollectionContextProps, collectionState,Book, collectionError, collectionLoading } from "../types/types";
import {fetchCollectionApiCall, removeFromCollectionApiCall, addToCollectionApiCall } from "../api/collection";
import { useState } from "react";

export const CollectionContext = createContext<any>(null);

const collectionReducer = (state: collectionState, action: CollectionAction): collectionState => {
  switch (action.type) {
    case "SET":
      return { ...state, collection: action.payload };
    case "ADD":
      return { ...state, collection: [...state.collection, action.payload] };
    case "REMOVE":
      return { ...state, collection: state.collection.filter((book) => book._id !== action.payload) };
    default:
      return state;
  }
};


const CollectionContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {

  const [state, dispatch] = useReducer(collectionReducer, { collection: []});
  const [loading, setLoading] = useState<collectionLoading>({
    getCollection:false,
    addToCollection: false,
    removeFromCollection: false,
  })
  
  const [error, setError] = useState<collectionError>({
    getCollection:"",
    addToCollection: "",
    removeFromCollection: "",
  })

  const getCollection = async () => {
    setLoading(prev => ({ ...prev, getCollection: true }))
    setError(prev => ({ ...prev, getCollection: '' }))
    try {
      const { data } = await fetchCollectionApiCall();
      dispatch({ type: "SET", payload: data });
      setLoading(prev => ({ ...prev, getCollection: false }))
    } catch (error: any) {
      console.error("Error fetching collection:", error);
      setError(prev => ({ ...prev, getCollection: error?.response?.data }))
      setLoading(prev => ({ ...prev, getCollection: false }))
    }
};



  const addToCollection = async (book: Book) => {
      setLoading(prev => ({ ...prev, addToCollection: true }))
      setError(prev => ({ ...prev, addToCollection: '' }))
      try {
        const { data } = await addToCollectionApiCall(book);
        dispatch({ type: "ADD", payload: data });
        setLoading(prev => ({ ...prev, addToCollection: false }))
      } catch (error: any) {
        console.error("Error adding to collection:", error);
        setError(prev => ({ ...prev, addToCollection: error?.response?.data }))
        setLoading(prev => ({ ...prev, addToCollection: false }))
      }
  };


  const removeFromCollection = async (id: string) => {
      setLoading(prev => ({ ...prev, removeFromCollection: true }))
      setError(prev => ({ ...prev, removeFromCollection: '' }))
      try {
        await removeFromCollectionApiCall(id);
        dispatch({ type: "REMOVE", payload: id });
        setLoading(prev => ({ ...prev, removeFromCollection: false }))
      } catch (error: any) {
        console.error("Error deleting from collection:", error);
        setError(prev => ({ ...prev, removeFromCollection: error?.response?.data }))
        setLoading(prev => ({ ...prev, removeFromCollections: false }))
      }
  };

  const contextValue: CollectionContextProps = {
    state,
    loading,
    error,
    dispatch,
    getCollection,
    addToCollection,
    removeFromCollection,
  };


  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  )
};

export default CollectionContextProvider;
