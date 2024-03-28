import React from 'react'
import { AuthContextProvider } from '../../context/AuthContext'
import BookContextProvider from '../../context/BookContext'
import StatusContextProvider from '../../context/StatusContext'
import CollectionContextProvider from '../../context/CollectionContext.tsx'
import HeaderContextProvider from '../../context/HeaderContext'
import TaskContextProvider from '../../context/TaskContext'
import { UserContextProvider } from '../../context/UserContext.tsx'

const Provider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
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
      </UserContextProvider>
    </AuthContextProvider>
  )
}

export default Provider