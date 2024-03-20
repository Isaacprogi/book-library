import {useContext} from 'react'
import { CollectionContext } from "../context/CollectionContext";

export const useCollectionContext = () => {
    const context = useContext(CollectionContext);
    if (!context) {
      throw new Error('collectionAuth must be used within an CollectionProvider');
    }
    return context;
  };
  