import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

export const StyledLink = ({ link, children }) => {
  return (
    <Link to={link} className={styles.link}>
      {children}
    </Link>
  );
};
