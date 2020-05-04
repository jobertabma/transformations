export default input => {
  return {
    output: atob(input),
    func: "base64Decode"
  };
};
