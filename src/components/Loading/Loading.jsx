import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "./Loading.module.css";

const Loading = ({ duration = 2000, onFinish }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Inicia a animação após 0.2s para quicar antes
    const startTimer = setTimeout(() => setAnimate(true), 200);

    // Termina o splash
    const finishTimer = setTimeout(() => onFinish(), duration);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(finishTimer);
    };
  }, [duration, onFinish]);

  return (
    <div className={styles.overlay}>
      <FontAwesomeIcon
        icon={faShoppingCart}
        className={`${styles.icon} ${animate ? styles.cinematic : ""}`}
      />
    </div>
  );
};

export default Loading;
