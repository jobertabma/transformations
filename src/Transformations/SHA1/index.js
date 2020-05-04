import sha1 from "sha1";

export default input => {
  return {
    output: sha1(input),
    func: "sha1"
  };
};
