import { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

const schema = yup.object().shape({
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, "Phone must be in format +380XXXXXXXXX")
    .required("Phone is required"),
  childAge: yup
    .number()
    .typeError("Child's age must be a number")
    .required("Child's age is required"),
  time: yup.string().required("Meeting time is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  parentName: yup.string().required("Parent's name is required"),
  comment: yup.string().required("Comment is required"),
});

const Appoints = ({ nanny, isOpen, onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Appointment Data:", data);
    onClose();
  };

  const handleTimeSelect = (time) => {
    setValue("time", time);
    setIsDropdownOpen(false);
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <p className={styles.error}>{errors.address?.message}</p>
              <input {...register("address")} placeholder="Address" />
            </div>
            <div className={styles.inputWrapper}>
              <p className={styles.error}>{errors.phone?.message}</p>
              <input {...register("phone")} placeholder="Phone" />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <p className={styles.error}>{errors.childAge?.message}</p>
              <input
                {...register("childAge")}
                placeholder="Child's age"
                type="number"
              />
            </div>

            <div className={styles.inputWrapper}>
              <p className={styles.error}>{errors.time?.message}</p>
              <div
                className={`${styles.timePicker} ${
                  errors.time ? styles.inputError : ""
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <input {...register("time")} placeholder="00:00" readOnly />
                <svg className={styles.clockIcon}>
                  <use href={`${sprite}#clock`} />
                </svg>

                {isDropdownOpen && (
                  <div className={styles.dropdown}>
                    <p className={styles.dropdownTitle}>Meeting time</p>
                    {availableTimes.map((time) => {
                      const [hours, minutes] = time.split(":");
                      return (
                        <div
                          key={time}
                          className={`${styles.timeRow} ${
                            time === errors.time?.message ? styles.selected : ""
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
          </div>

          <div className={styles.inputWrapper}>
            <p className={styles.error}>{errors.email?.message}</p>
            <input {...register("email")} placeholder="Email" type="email" />
          </div>

          <div className={styles.inputWrapper}>
            <p className={styles.error}>{errors.parentName?.message}</p>
            <input
              {...register("parentName")}
              placeholder="Father's or mother's name"
            />
          </div>

          <div className={styles.inputWrapper}>
            <p className={styles.error}>{errors.comment?.message}</p>
            <textarea {...register("comment")} placeholder="Comment"></textarea>
          </div>

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
