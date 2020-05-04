import he from "he";

export default input => {
  return {
    output: he.escape(input),
    func: "htmlEntitiesEscape"
  };
};
