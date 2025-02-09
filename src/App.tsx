import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './navigation/Navigation';
import { store } from './store/store';
import { Provider } from 'react-redux';
import LoadingContainer from './components/LoadingContainer';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <LoadingContainer>
          <Navigation />
        </LoadingContainer>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
