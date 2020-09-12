const notif = (title, msg, type) => {
  if (type === "success") {
    return {
      title: title,
      message: msg,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    };
  } else {
    return {
      title: title,
      message: msg,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 8888,
        onScreen: true,
      },
    };
  }
};

export default notif;
