import { Routes, Route } from 'react-router';
import { useTypedSelector } from './hooks/useTypedSelector';
import { Navigate } from "react-router";
import LoginPage from './components/auth/Login/index';
import RegisterPage from './components/auth/Register/index';
import Layout from './components/containers/Layout/index';
import HomePage from './components/HomePage';
import CarPage from './components/HomePage/car-page';
import BrandWorker from './components/HomePage/CreateOrUpdate/brand';
import YearWorker from './components/HomePage/CreateOrUpdate/year';
import PropertyWorker from './components/HomePage/CreateOrUpdate/property';
import CharacteristicWorker from './components/HomePage/CreateOrUpdate/characteristic';
import CreatePhoto from './components/HomePage/CreateOrUpdate/photo';
import CarWorker from './components/HomePage/CreateOrUpdate/car';
import BrandsPage from './components/HomePage/GetDelete/brand';
import YearsPage from './components/HomePage/GetDelete/year';
import PropertiesPage from './components/HomePage/GetDelete/property';

function App() {
  const { isAuth } = useTypedSelector(state => state.auth);
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/car-page' element={<CarPage />} />
        {
          isAuth ?
            <>
              <Route path='/brand' element={<BrandWorker />} />
              <Route path='/year' element={<YearWorker />} />
              <Route path='/property' element={<PropertyWorker />} />
              <Route path='/photo' element={<CreatePhoto />} />
              <Route path='/photo' element={<CreatePhoto />} />
              <Route path='/car' element={<CarWorker />} />
              <Route path='/characteristic' element={<CharacteristicWorker />} />
              <Route path='/brands' element={<BrandsPage />} />
              <Route path='/years' element={<YearsPage />} />
              <Route path='/properties' element={<PropertiesPage />} />
            </>
            :
            <>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
            </>
        }
      </Route>
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;