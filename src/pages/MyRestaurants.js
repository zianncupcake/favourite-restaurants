import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import "./MyRestaurants.css";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DoneIcon from "@mui/icons-material/Done";
import StarIcon from "@mui/icons-material/Star";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { getColumn1, getColumn2, searchRestaurants, sortRestaurants } from "../components/utils";

const MyRestaurants = ({ restaurants }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Most recent");
  const [searchBy, setSearchBy] = useState("");
  const [column1, setColumn1] = useState([]);
  const [column2, setColumn2] = useState([]);

  const options = [
    "Most recent",
    "Least recent",
    "A-Z",
    "Favourited",
    "Visited",
  ];

  const iconMap = {
    Favourited: <StarIcon className="favourited" fontSize="small" />,
    Visited: <DoneIcon className="visited" fontSize="small" />,
  };

  //handle open and close the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //reload when prop updated
  useEffect(() => {
    const searchedRestaurants = searchRestaurants(restaurants, searchBy); 
    const sortedRestaurants = sortRestaurants(searchedRestaurants, sortBy);
    setColumn1(getColumn1(sortedRestaurants));
    setColumn2(getColumn2(sortedRestaurants));
  }, [restaurants, searchBy, sortBy]);

  //select sort by
  const handleOptionClick = (option) => {
    setSortBy(option);
    setIsOpen(false);
  };

  return (
    <>
      <div className="main-container">
        {/* dropdown section */}
        <div className="dropdown-container">
          <span className="dropdown-container-label">Sort by</span>
          <div className="dropdown">
            <div
              className={`dropdown-header ${isOpen ? "open" : ""}`}
              onClick={toggleDropdown}
            >
              <span>{sortBy ?? ""}</span>
              <span>
                {isOpen ? (
                  <KeyboardArrowUpOutlinedIcon />
                ) : (
                  <KeyboardArrowDownOutlinedIcon />
                )}
              </span>
            </div>
            {/* open dropdown list  */}
            {isOpen && (
              <ul className="dropdown-list">
                {options.map((option, index) => (
                  <li
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleOptionClick(option)}
                  >
                    <div className="option-container">
                      {iconMap[option] && (
                        <span className="dropdown-icon">{iconMap[option]}</span>
                      )}
                      {option}
                    </div>
                    {sortBy === option && (
                      <DoneOutlinedIcon fontSize="small" className="tick" />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Name, Location, Description, Tag" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}/>
        </div>
      </div>
      {column1.length === 0 && column2.length === 0 && <span className="no-restaurants-text">No matching restaurants found!</span>}
      {/* restaurant cards section, split into 2 columns */}
      <div className="column-container">
        <div className="column">
          {column1 &&
            column1.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>
        <div className="column">
          {column2 &&
            column2.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>
      </div>
    </>
  );
};

export default MyRestaurants;
