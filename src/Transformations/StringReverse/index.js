export default input => {
  if (input.length === 1) {
    return false;
  }

  return {
    output: input
      .split("")
      .reverse()
      .join(""),
    func: "stringReverse"
  };
};
