import md5 from "md5";

export default input => {
  return {
    output: md5(input),
    func: "md5"
  };
};
