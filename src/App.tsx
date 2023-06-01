import { useRoutes } from 'react-router-dom';
import routes from './router';
import WithLoading from './components/WithLoading';
function App() {
  const outlet = useRoutes(routes);
  return <WithLoading>{outlet}</WithLoading>;
}
export default App;
