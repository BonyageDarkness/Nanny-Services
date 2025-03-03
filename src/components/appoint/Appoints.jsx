import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../ui/Modal";
import styles from "./Appoints.module.css";
import sprite from "../../images/sprites.svg";

const generateTimeSlots = () => {
  let times = [];
  for (let hour = 9; hour <= 16; hour++) {
    times.push(`${hour}:00`, `${hour}:30`);
  }
  return times;
};

const availableTimes = generateTimeSlots();

const Appoints = ({ nanny, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    address: "",
    phone: "+380",
    childAge: "",
    time: "",
    email: "",
    parentName: "",
    comment: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (time) => {
    setFormData((prev) => ({ ...prev, time }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Data:", formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.largeModal}>
      <div className={styles.appContainer}>
        <div className={styles.appText}>
          <h2>Make an appointment with a babysitter</h2>
          <p>
            Arranging a meeting with a caregiver for your child is the first
            step to creating a safe and comfortable environment. Fill out the
            form below so we can match you with the perfect care partner.
          </p>
        </div>
        <div className={styles.nannyInfo}>
          <img
            src={nanny.avatar_url || "default-avatar.png"}
            alt={nanny.name}
            className={styles.nannyImage}
          />
          <div>
            <p className={styles.label}>Your nanny</p>
            <p className={styles.nannyName}>{nanny.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="number"
              name="childAge"
              value={formData.childAge}
              onChange={handleChange}
              placeholder="Child's age"
              required
            />

            <div
              className={styles.timePicker}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <input
                type="text"
                name="time"
                value={formData.time}
                placeholder="00:00"
                readOnly
              />
              <svg className={styles.clockIcon}>
                <use href={`${sprite}#clock`} />
              </svg>

              {isDropdownOpen && (
                <div className={styles.dropdown}>
                  <p className={styles.dropdownTitle}>Meeting time</p>

                  {availableTimes.map((time) => {
                    const [hours, minutes] = time.split(":"); // Разделяем часы и минуты
                    return (
                      <div
                        key={time}
                        className={`${styles.timeRow} ${
                          formData.time === time ? styles.selected : ""
                        }`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        <span className={styles.timeHour}>{hours}</span>
                        <span className={styles.timeSeparator}>:</span>
                        <span className={styles.timeMinute}>{minutes}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            placeholder="Father's or mother's name"
            required
          />
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Comment"
          ></textarea>

          <button type="submit" className={styles.submitButton}>
            Send
          </button>
        </form>
      </div>
    </Modal>
  );
};

Appoints.propTypes = {
  nanny: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Appoints;
