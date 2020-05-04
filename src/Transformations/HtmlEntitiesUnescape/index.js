import he from "he";

export default input => {
  return {
    output: he.unescape(input),
    func: "htmlEntitiesUnescape"
  };
};
