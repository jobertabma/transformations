export default input => {
  return {
    output: encodeURI(input),
    func: "urlEncode"
  };
};
