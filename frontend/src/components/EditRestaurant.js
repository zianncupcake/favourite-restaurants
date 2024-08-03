import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from 'react-redux';
import { updateRestaurant } from "../redux/restaurantSlice";
import { toast } from 'react-toastify';
import "./EditRestaurant.css";

const EditRestaurant = ({restaurant, onClose}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(restaurant.name);
  const [location, setLocation] = useState(restaurant.location);
  const [currTag, setCurrTag] = useState("");
  const [tags, setTags] = useState(restaurant.tags);
  const [website, setWebsite] = useState(restaurant.website);
  const [description, setDescription] = useState(restaurant.description);

  const [tagsError, setTagsError] = useState("");
  const [dispatching, setDispatching] = useState(false);

  //adding tag logic for tags input
  const handleNewTag = (e) => {
    if (e.key === "Enter" && currTag.trim() !== "") {
      e.preventDefault();

      if (tags.length === 5) {
        setTagsError("You can only add up to 5 tags");
        return;
      }

      if (tags.includes(currTag.trim())) {
        setTagsError("Each tag must be unique");
        return;
      }
      setTagsError("");
      const newTags = [...tags, currTag.trim()];
      setTags(newTags);
      setCurrTag("");
    }
  };

  //remove tag logic for tags input
  const removeTag = (indexToRemove) => {
    const oldLength = tags.length;
    setTags(tags.filter((_, index) => index !== indexToRemove));

    if (oldLength - 1 <= 5) {
      setTagsError("");
    }
  }

  //submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    setDispatching(true)
    const updatedRestaurant = {...restaurant, name, location, tags: tags, website, description}
    try {
      dispatch(updateRestaurant(updatedRestaurant));
      setDispatching(false)
      setName("")
      setLocation("")
      setCurrTag("")
      setTags([])
      setWebsite("")
      setDescription("")
      onClose()
      toast.success(`Restaurant '${name}' has been updated!`);
    } catch (error) {
      setDispatching(false)
      toast.error(`Failed to add restaurant: ${error.message}`);
    } 
  };

  return (
    <div className="container card-container">
      {/* form section */}
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group card-form">
          <label>Name (required)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span className="normal-text">Enter name of restaurant </span>
        </div>
        <div className="form-group card-form">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <span className="normal-text">Enter location of restaurant</span>
        </div>
        <div className="form-group card-form">
          <label>Website</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <span className="normal-text">Enter URL of restaurant website</span>
        </div>
        <div className="form-group card-form">
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <span className="normal-text">
            Enter notes or additional details about restaurant
          </span>
        </div>
        <div className="form-group card-form">
          <label>Tags</label>
          <input
            type="text"
            value={currTag}
            onChange={(e) => setCurrTag(e.target.value)}
            onKeyDown={(e) => handleNewTag(e)}
            className={`${tagsError ? "error-state" : ""}`}
          />
          {tagsError ? (
            <span className="error-text">{tagsError}</span>
          ) : (
            <span className="normal-text">
              Press enter to create new tag e.g. desserts / coffee (MAX
              5)
            </span>
          )}
        </div>
        <div className="tag-container">
          {tags &&
            tags.map((tag, index) => (
              <div key={index} className="tag">
                {tag} <CloseIcon onClick={() => removeTag(index)} />
              </div>
            ))}
        </div>
        <button
          className={`modal-confirm-button 
              ${!name ? "disabled" : ""} 
              ${dispatching ? "retrieving" : ""}`}
          type="submit"
        >
          Edit details
        </button>
        <button
          className="modal-cancel-button"
          onClick={() => onClose()}
        >
          Cancel
        </button>

      </form>

    </div>
  );
};

export default EditRestaurant;
