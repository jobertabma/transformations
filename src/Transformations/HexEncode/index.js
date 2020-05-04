export default input => {
  return {
    output: new Buffer(input).toString("hex"),
    func: "hexEncode"
  };
};
