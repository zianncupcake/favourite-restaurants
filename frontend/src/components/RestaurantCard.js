import React, { useState } from "react";
import "./RestaurantCard.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { deleteRestaurant, updateRestaurant } from "../redux/restaurantSlice";
import { toast } from "react-toastify";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DoneIcon from "@mui/icons-material/Done";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getTimeAgo } from "./utils";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRestaurant from "./EditRestaurant";

const RestaurantCard = ({ restaurant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  //adding or removing restaurant from favourited
  const handleToggleFavourite = () => {
    dispatch(
      updateRestaurant({ ...restaurant, favourited: !restaurant.favourited })
    );

    if (!restaurant.favourited) {
      toast.success(
        `Restaurant '${restaurant.name}' has been marked as Favourited!`
      );
    } else {
      toast.success(
        `Restaurant '${restaurant.name}' has been removed from Favourited!`
      );
    }
  };

  //adding or removing restaurant from visited
  const handleToggleVisited = () => {
    dispatch(updateRestaurant({ ...restaurant, visited: !restaurant.visited }));

    if (!restaurant.visited) {
      toast.success(
        `Restaurant '${restaurant.name}' has been marked as Visited!`
      );
    } else {
      toast.success(
        `Restaurant '${restaurant.name}' has been removed from Visited!`
      );
    }
  };

  //delete restaurant
  const handleDelete = () => {
    setIsModalOpen(false);
    dispatch(deleteRestaurant(restaurant.id));
    toast.success(`Restaurant '${restaurant.name}' has been deleted!`);
  };

  return (
    <div className="card">
      {/* header */}
      <div className="card-header">
        <div className="card-header-text">
          <span className="name">{restaurant.name}</span>
          <a
            href={restaurant.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{restaurant.website}</span>
          </a>
        </div>
        {/* favourited and visited icon */}
        <div className="card-header-icons">
          {restaurant.favourited ? (
            <StarIcon
              className="favourited"
              onClick={() => handleToggleFavourite()}
            />
          ) : (
            <StarBorderIcon
              className="unfavourited"
              onClick={() => handleToggleFavourite()}
            />
          )}
          {restaurant.visited ? (
            <DoneIcon
              className="visited"
              onClick={() => handleToggleVisited()}
            />
          ) : (
            <DoneOutlineIcon
              className="unvisited"
              onClick={() => handleToggleVisited()}
            />
          )}
        </div>
      </div>
      {/* body */}
      <div className="card-body-text">
        <span>{restaurant.location}</span>
        <span className="description">{restaurant.description}</span>
      </div>
      <div className="tag-container">
        {restaurant.tags.map((tag, index) => (
          <span key={index} className="tag-outline">
            {tag}
          </span>
        ))}
      </div>
      {/* footer which contains time elapsed + edit and delete icon */}
      <div className="footer-container">
        <div className="time">
          <AccessTimeIcon fontSize={"inherit"} className="time-icon" />
          <span>{getTimeAgo(restaurant.createdAt)}</span>
        </div>
        <div className="actions">
          <CreateOutlinedIcon
            className={`actions-icon ${isEditing ? "editing" : ""}`}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          />
          <DeleteIcon
            className="actions-icon"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      {/* editing form appears below card when user click on edit icon */}
      {isEditing && (
        <EditRestaurant
          restaurant={restaurant}
          onClose={() => setIsEditing(false)}
        />
      )}
      {/* //modal to confirm deletion */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-header">Delete restaurant?</span>
            <span className="modal-message">
              This restaurant will be permanently removed. You can't undo this
              action.
            </span>
            <button
              className="modal-confirm-button delete"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
            <button
              className="modal-cancel-button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantCard;
