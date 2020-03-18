import React from "react";

export default function Button({
  children,
  fullWidth = false,
  primary = false,
  className = "",
  loading = false,
  outlined = false,
  inverted = false,
  ...props
}) {
  const styles = {
    width: fullWidth ? "100%" : "fit-content"
  };

  // Classname last
  const classes = ["button"];

  if (primary) {
    classes.push("is-primary");
  }

  if (loading) {
    classes.push("is-loading");
  }

  if (outlined) {
    classes.push("is-outlined");
  }

  if (inverted) {
    classes.push("is-inverted");
  }


  classes.push(className);

  return (
    <button {...props} style={styles} className={classes.join(" ")}>
      {children}
    </button>
  );
}
