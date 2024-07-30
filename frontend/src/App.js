import React, { useState } from "react";
import "./styles.css";
import AddRestaurant from "./pages/AddRestaurant";
import MyRestaurants from "./pages/MyRestaurants";

function App() {
  const [activeTab, setActiveTab] = useState('myRestaurants');

  return (
    <div className="tabs-container">
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
      <div className="content">
        {activeTab === "myRestaurants" && <MyRestaurants />}
        {activeTab === "addRestaurant" && <AddRestaurant />}
      </div>
    </div>
  );
}

export default App;
