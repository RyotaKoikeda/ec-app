import React, { useState } from "react";
import Swiper from "react-id-swiper";
import NoImage from "../../assets/images/no-img.png";
import "swiper/css/swiper.css";

const ImageSwiper = (props) => {
  const [params] = useState({
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  });

  const images = props.images;

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div className="swiper-slide">
          <img src={NoImage} alt="no image" />
        </div>
      ) : (
        images.map((image, id) => (
          <div className="swiper-slide" key={id}>
            <img src={image.path} alt="商品画像" />
          </div>
        ))
      )}
    </Swiper>
  );
};

export default ImageSwiper;
