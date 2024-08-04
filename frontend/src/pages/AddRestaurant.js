import { useState } from "react";
import TickIcon from "../assets/tick.svg";
import InstagramIcon from "@mui/icons-material/Instagram";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import "./AddRestaurant.css";
import { useDispatch } from 'react-redux';
import { addRestaurant } from "../redux/restaurantSlice";
import { toast } from 'react-toastify';

const AddRestaurant = () => {
  const dispatch = useDispatch();

  //retrieve info from username states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [retrieving, setRetrieving] = useState(false);
  const [retrieveSuccessful, setRetrieveSuccessful] = useState(false);

  //form states
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [currTag, setCurrTag] = useState("");
  const [tags, setTags] = useState([]);
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const [tagsError, setTagsError] = useState("");
  const [dispatching, setDispatching] = useState(false);

  //sample dummy data for autofill demo
  // const data = {
  //   nameText: "Flip Coffee Roasters",
  //   locationText: "619H Bukit Timah Road, Singapore",
  //   websiteText: "https://linktr.ee/flipcoffeeroasters",
  //   descriptionText: "Open 8am - 5pm, closed on Wednesdays"
  // }

  // retrieve details from backend
  const handleFetchAccount = async () => {
    setRetrieving(true);
    try {
      // actual fetching of data from backend server

      const { data } = await axios.get(
        `http://localhost:3001/scrape?username=${username}`
      );
      setRetrieving(false);
      setIsModalOpen(false);
      setRetrieveSuccessful(true);
      setName(data.nameText);
      setLocation(data.locationText);
      setWebsite(data.websiteText);
      setDescription(data.descriptionText);
    } catch (err) {
      console.log(err);
    }
  };

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
    const restaurant = { id: Date.now(), name, location, tags: tags, website, description, createdAt: Date.now(), favourited: false, visited: false}; 
    try {
      dispatch(addRestaurant(restaurant));
      setDispatching(false)
      setUsername("")
      setName("")
      setLocation("")
      setCurrTag("")
      setTags([])
      setWebsite("")
      setDescription("")
      setRetrieveSuccessful(false)
      toast.success(`Restaurant '${name}' has been added!`);
    } catch (error) {
      setDispatching(false)
      toast.error(`Failed to add restaurant: ${error.message}`);
    } 
  };

  return (
    <div className="container">
      {/* autofill section */}
      <button className="autofill-button" onClick={() => setIsModalOpen(true)}>
        Autofill with Instagram <InstagramIcon className="autofill-icon" />
      </button>
      {retrieveSuccessful && (
        <div className="autofill-success">
          <img src={TickIcon} alt="tick" />
          <span>Successfully retrieved details!</span>
        </div>
      )}
      {/* form section */}
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label>Name (required)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span className="normal-text">Enter name of restaurant </span>
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <span className="normal-text">Enter location of restaurant</span>
        </div>
        <div className="form-group">
          <label>Website</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <span className="normal-text">Enter URL of restaurant website, including 'http://'' or https://'</span>
        </div>
        <div className="form-group">
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
        <div className="form-group">
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
              Press enter to create new tag e.g. bar / coffee (MAX
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
          Add restaurant
        </button>
      </form>

      {/* autofill modal to input username */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-header">
              Enter Restaurant's Instagram Account Username
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="modal-input"
            />
            <span className="normal-text">Do not include '@'</span>
            <button
              className={`modal-confirm-button 
              ${!username ? "disabled" : ""} 
              ${retrieving ? "retrieving" : ""}`}
              onClick={() => handleFetchAccount()}
              disabled={username === ""}
            >
              {retrieving ? (
                <div className="modal-confirm-button-loader"></div>
              ) : (
                "Retrieve details"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRestaurant;
