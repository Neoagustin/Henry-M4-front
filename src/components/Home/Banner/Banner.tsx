// Vendors
import React from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphonesAlt, faLaptop, faCamera } from "@fortawesome/free-solid-svg-icons";

// Img
import Image from "next/image";
import bannerIcon from "@/assets/img/bannerIcon.png";

// Styles
import styles from "./Banner.module.css";

const Banner: React.FC = () => {
  return (
    <>
      <div className={styles.bannerContainer}>
        <div className={styles.titleContainer}>
          <div>
            <h1>
              <span>TECNOLOGÍA</span> A UN CLICK
              <Image src={bannerIcon} alt="Banner Icon" />
            </h1>
          </div>
          <p>Lo Último, a tu Alcance</p>
        </div>

        <div className={styles.buttonContainer}>
          <button>Ver más</button>
        </div>
      </div>

      <div className={styles.barBanner}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faHeadphonesAlt} className={styles.icon} />
        </div>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faLaptop} className={styles.icon} />
        </div>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faCamera} className={styles.icon} />
        </div>
      </div>
    </>
  );
};

export default Banner;
