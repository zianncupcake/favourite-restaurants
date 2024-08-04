import { createSlice } from "@reduxjs/toolkit";

const initalRestaurants = []

// note: filled the initial state with some restaurants for your reference

// const initalRestaurants = [
//   {
//     createdAt: 1722539825503,
//     description:
//       "Stay in the Pocket•Open 8am - 5pm, closed on WednesdaysLast order at 430pm",
//     id: 1722539825503,
//     location: "619H Bukit Timah Road, Singapore 269728",
//     name: "Flip Coffee Roasters",
//     tags: ["coffee"],
//     website: "linktr.ee/flipcoffeeroasters",
//     favourited: false,
//     visited: false,
//   },
//   {
//     createdAt: 1722540748878,
//     description: "",
//     id: 1722540748878,
//     location: "",
//     name: "Rookie’s Coffee Shop",
//     tags: [
//       "coffee",
//       "queenstown",
//       "chill",
//       "quiet",
//       "good to study",
//     ],
//     website: "rookiescoffee.com",
//     favourited: false,
//     visited: false,
//   },
//   {
//     createdAt: 1722540927784,
//     description: "by singapore barista champion 2022",
//     id: 1722540927784,
//     location: "",
//     name: "OLLA Specialty Coffee",
//     tags: ["coffee"],
//     website: "",
//     favourited: false,
//     visited: false,
//   },
//   {
//     createdAt: 1722541299181,
//     description: "A home away from home. 8am - 4.30pm, everyday",
//     id: 1722541299181,
//     location: "311 Jalan Besar, Singapore 208970",
//     name: "Asylum Coffeehouse",
//     tags: ["coffee"],
//     website: "www.asylumcoffeehouse.com",
//     favourited: false,
//     visited: false,
//   },
// ];

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    restaurants: initalRestaurants,
  },
  reducers: {
    addRestaurant: (state, action) => {
      state.restaurants.push(action.payload);
    },
    updateRestaurant: (state, action) => {
      const index = state.restaurants.findIndex(
        (restaurant) => restaurant.id === action.payload.id
      );
      if (index !== -1) {
        state.restaurants[index] = action.payload;
      }
    },
    deleteRestaurant: (state, action) => {
      state.restaurants = state.restaurants.filter(
        (restaurant) => restaurant.id !== action.payload
      );
    },
    resetState: (state) => {
      state.restaurants = initalRestaurants; 
    },
  },
});

export const { addRestaurant, updateRestaurant, deleteRestaurant, resetState } =
  restaurantSlice.actions;
export default restaurantSlice.reducer;
