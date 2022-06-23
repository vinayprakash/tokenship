import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider} from '@chakra-ui/react'
import Overview from './Overview';
import Asset from './Asset';
import ActivityData from './Activity'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

<ChakraProvider>
<BrowserRouter>
    <Routes>
      <Route path="/" element={<Overview/>}/>
      <Route  path="/overview"  element={<Overview />} />
      <Route  path="/asset"  element={<Asset />} />
      <Route  path="/activity"  element={<ActivityData />} />
    </Routes>
  </BrowserRouter>
</ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
