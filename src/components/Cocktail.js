import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Cocktail = ({ image, name, id, info, glass }) => {
  return (
    <article className="cocktail">
      <Link to={`/cocktail/${id}`}>
        <div className="img-container">
          <img src={image} alt={name} />
        </div>
        <div className="cocktail-footer">
          <h4>{name}</h4>
          <h4>
            {glass} <FaStar />{" "}
          </h4>
        </div>
      </Link>
    </article>
  );
};

export default Cocktail;
