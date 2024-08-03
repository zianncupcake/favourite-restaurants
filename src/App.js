import React, { useState } from "react";
import "./styles.css";
import AddRestaurant from "./pages/AddRestaurant";
import MyRestaurants from "./pages/MyRestaurants";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { resetState } from './redux/restaurantSlice'; 
import { sortRestaurants } from "./components/utils";

function App() {
  const [activeTab, setActiveTab] = useState('myRestaurants');
  const restaurants = useSelector((state) => state.restaurants.restaurants);

  // const dispatch = useDispatch();
  // dispatch(resetState())

  return (
    <div className="tabs-container">
      {/* tabs header  */}
      <div className="tabs">
        <button
          className={activeTab === "myRestaurants" ? "active" : ""}
          onClick={() => setActiveTab("myRestaurants")}
        >
          My Restaurants
        </button>
        <button
          className={activeTab === "addRestaurant" ? "active" : ""}
          onClick={() => setActiveTab("addRestaurant")}
        >
          Add Restaurant
        </button>
      </div>
      {/* different components rendered based on tabs */}
      <div className="content">
        {activeTab === "myRestaurants" && <MyRestaurants restaurants={sortRestaurants(restaurants, "Most recent")}/>}
        {activeTab === "addRestaurant" && <AddRestaurant />}
      </div>
      {/* toasts */}
      <ToastContainer position="bottom-center" autoClose={3000} theme="dark" 
        toastClassName="toast-custom"
        bodyClassName="toast-custom-body" />
    </div>
  );
}

export default App;
