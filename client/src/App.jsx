import AppRoutes from './routes/AppRoutes'
import { ApolloProvider } from '@apollo/client'
import  {client}  from './apollo/client'
import { Provider } from 'react-redux'
import store from './store/store'

function App() {

  return (
    <>
    <Provider store={store}>
    <ApolloProvider client={client}>
    <AppRoutes/>
    </ApolloProvider>
    </Provider>
    </>
  )
}

export default App
