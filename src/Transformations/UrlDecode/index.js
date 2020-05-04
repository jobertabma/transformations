export default input => {
  return {
    output: decodeURI(input),
    func: "urlDecode"
  };
};
