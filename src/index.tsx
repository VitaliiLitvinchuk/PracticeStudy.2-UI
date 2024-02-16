import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { UserFromToken } from './components/auth/actions';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';

const token = localStorage.getItem("token");
if (token) {
  try {
    UserFromToken(token, store.dispatch);
  }
  catch (ex) { localStorage.removeItem("token") };
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
