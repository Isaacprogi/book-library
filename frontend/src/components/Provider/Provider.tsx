import React from 'react'
import { AuthContextProvider } from '../../context/AuthContext'
import BookContextProvider from '../../context/BookContext'
import StatusContextProvider from '../../context/StatusContext'
import CollectionContextProvider from '../../context/CollectionContext.tsx'
import HeaderContextProvider from '../../context/HeaderContext'
import TaskContextProvider from '../../context/TaskContext'

const Provider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <AuthContextProvider>
    <BookContextProvider>
    <CollectionContextProvider>
      <HeaderContextProvider>
        <TaskContextProvider>
          <StatusContextProvider>
            {children}
          </StatusContextProvider>
        </TaskContextProvider>
      </HeaderContextProvider>
    </CollectionContextProvider>
    </BookContextProvider>
    </AuthContextProvider>
  )
}

export default Provider