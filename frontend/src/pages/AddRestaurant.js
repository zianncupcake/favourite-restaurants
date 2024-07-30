import { useState } from "react";
import igLogo from "../assets/igLogo.png";
import "./AddRestaurant.css";

const AddRestaurant = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  return (
    <div className="container">
      <button className="autofill-button" onClick={() => setIsModalOpen(true)}>
        Autofill with <img src={igLogo} alt="Instagram" className="icon" />
      </button>

      {/* autofill modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-header">Enter Restaurant's Instagram Profile Link URL</span>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="modal-input"
              placeholder="Enter URL"
            />
            <button className="modal-confirm-button" onClick={() => setIsModalOpen(true)}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRestaurant;
