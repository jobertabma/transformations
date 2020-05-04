export default input => {
  return {
    output: input.replace(/(['"\\])/g, "\\$1"),
    func: "escape"
  };
};
