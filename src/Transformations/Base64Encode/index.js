export default input => {
  return {
    output: btoa(input),
    func: "base64Encode"
  };
};
