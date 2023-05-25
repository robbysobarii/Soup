import styles from "./style.module.css";

export const Section = ({ children, className }) => {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      {children}
    </section>
  );
};
