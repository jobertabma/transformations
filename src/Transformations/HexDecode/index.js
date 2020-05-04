export default input => {
  return {
    output: new Buffer(input, "hex").toString(),
    func: "hexDecode"
  };
};
