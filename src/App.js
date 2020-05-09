import React, { useReducer, Fragment } from "react";
import Combinatorics from "js-combinatorics";
import reactStringReplace from "react-string-replace";

import Base64Encode from "./Transformations/Base64Encode";
import Base64Decode from "./Transformations/Base64Decode";
import HexDecode from "./Transformations/HexDecode";
import HexEncode from "./Transformations/HexEncode";
import StringReverse from "./Transformations/StringReverse";
import MD5 from "./Transformations/MD5";
import SHA1 from "./Transformations/SHA1";
import LowerCase from "./Transformations/LowerCase";
import UpperCase from "./Transformations/UpperCase";
import UrlEncode from "./Transformations/UrlEncode";
import UrlDecode from "./Transformations/UrlDecode";
import Escape from "./Transformations/Escape";
import HtmlEntitiesEscape from "./Transformations/HtmlEntitiesEscape";
import HtmlEntitiesUnescape from "./Transformations/HtmlEntitiesUnescape";

import "./App.css";

import reducer, {
  ACTION_UPDATE_INPUT,
  ACTION_UPDATE_OUTPUT,
  ACTION_RESET_MATCHES,
  ACTION_TOGGLE_TRANSFORMATION,
  ACTION_ADD_MATCH,
  ACTION_RUN_START,
  ACTION_RUN_STOP,
  ACTION_SET_INCLUSION
} from "./Reducer";

const determineTransformation = (state, dispatch) => {
  dispatch({
    type: ACTION_RESET_MATCHES
  });

  const { input, output, transformations, testForInclusion } = state;

  const transformationFunctions = [];

  Object.values(transformations).forEach(transformation => {
    for (let index = 0; index < transformation[1]; index++) {
      transformationFunctions.push(transformation[0]);
    }
  });

  const combinations = Combinatorics.permutationCombination(
    transformationFunctions
  ).toArray();

  for (const combination of combinations) {
    const transformedOutput = [input];
    const transformedFunctions = [""];

    for (const func of combination) {
      try {
        const funcOutput = func(
          transformedOutput[transformedOutput.length - 1]
        );

        transformedOutput.push(funcOutput.output);
        transformedFunctions.push(funcOutput.func);
      } catch {
        break;
      }
    }

    transformedOutput.splice(0, 1);
    transformedFunctions.splice(0, 1);

    if (transformedOutput.length === combination.length) {
      const result = testForInclusion
        ? output.includes(transformedOutput[transformedOutput.length - 1])
        : transformedOutput[transformedOutput.length - 1] === output;

      if (result) {
        dispatch({
          type: ACTION_ADD_MATCH,
          value: [transformedOutput, transformedFunctions]
        });
        break;
      }
    }
  }

  dispatch({
    type: ACTION_RUN_STOP
  });
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    input: "",
    output: "",
    transformations: {
      urlEncode: [UrlEncode, 1],
      urlDecode: [UrlDecode, 1],
      lowerCase: [LowerCase, 1],
      upperCase: [UpperCase, 1],
      hexEncode: [HexEncode, 0],
      hexDecode: [HexDecode, 0],
      escape: [Escape, 1],
      base64Encode: [Base64Encode, 0],
      base64Decode: [Base64Decode, 0],
      stringReverse: [StringReverse, 0],
      htmlEntitiesEscape: [HtmlEntitiesEscape, 0],
      htmlEntitiesUnescape: [HtmlEntitiesUnescape, 0],
      md5: [MD5, 0],
      sha1: [SHA1, 0]
    },
    matches: [],
    isRunning: false,
    testForInclusion: true
  });

  const {
    input,
    output,
    transformations,
    matches,
    isRunning,
    testForInclusion
  } = state;

  const canStart =
    !isRunning && input.length > 0 && output.length > 0 && input !== output;

  return (
    <Fragment>
      <div className="card">
        <main>
          <form
            onSubmit={event => {
              event.preventDefault();

              if (isRunning) {
                return false;
              }

              dispatch({
                type: ACTION_RUN_START
              });

              setTimeout(() => determineTransformation(state, dispatch), 500);
            }}
          >
            <section>
              <div>
                <strong>Input</strong>
              </div>

              <div>
                <small>
                  Enter the payload as it is submitted in the request.
                </small>
              </div>

              <div>
                <input
                  type="text"
                  disabled={isRunning}
                  autoFocus
                  onChange={event =>
                    dispatch({
                      type: ACTION_UPDATE_INPUT,
                      value: event.target.value
                    })
                  }
                  value={input}
                />
              </div>
            </section>

            <section>
              <div>
                <strong>Output</strong>
              </div>

              <div>
                <small>
                  {testForInclusion
                    ? "Enter the response that may include the encoded input."
                    : "Enter the encoded output as included in the response."}
                </small>
              </div>

              <div>
                <textarea
                  value={output}
                  disabled={isRunning}
                  onChange={event =>
                    dispatch({
                      type: ACTION_UPDATE_OUTPUT,
                      value: event.target.value
                    })
                  }
                />
              </div>
            </section>

            <section>
              <div>
                <strong>Transformations</strong>
              </div>

              <div>
                <small>
                  Select what possible transformations to test for.{" "}
                </small>
              </div>

              <div>
                <small>
                  <strong>Warning:</strong> more than 7 can severely strain CPU
                  and RAM.
                </small>
              </div>

              {Object.entries(transformations).map(([key, transformation]) => {
                return (
                  <div key={key}>
                    <select
                      onChange={event => {
                        dispatch({
                          type: ACTION_TOGGLE_TRANSFORMATION,
                          value: [
                            key,
                            [
                              transformation[0],
                              parseInt(event.target.value, 10)
                            ]
                          ]
                        });
                      }}
                      value={transformation[1]}
                    >
                      {[0, 1, 2, 3].map(number => {
                        return <option key={number}>{number}</option>;
                      })}
                    </select>{" "}
                    <code>{key}</code>
                  </div>
                );
              })}
            </section>

            <section>
              <div>
                <strong>Experimental</strong>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    onChange={event => {
                      dispatch({
                        type: ACTION_SET_INCLUSION,
                        value: !testForInclusion
                      });
                    }}
                    checked={testForInclusion}
                  />
                  Test for inclusion instead of equality (slower)
                </label>
              </div>
            </section>

            <section>
              <div>
                <button disabled={!canStart} type="submit">
                  Determine smallest transformation
                </button>
              </div>
            </section>
          </form>
        </main>

        <aside>
          <div>
            <strong>Transformations</strong>
          </div>

          <div>
            {isRunning ? (
              <em>Loading...</em>
            ) : matches.length > 0 ? (
              matches.map((match, index) => {
                return (
                  <div key={index} style={{ maxWidth: 600 - 24 * 2 }}>
                    <pre>
                      <code>
                        {reactStringReplace(
                          output,
                          match[0][match[0].length - 1],
                          (stringMatch, stringIndex) => (
                            <span key={stringIndex}>
                              <span className="highlight">
                                {match[0][match[0].length - 1]}
                              </span>
                              <span className="highlight matchHighlight">
                                {" "}
                                = {match[1].reverse().join("(")}("
                                {input}"{")".repeat(match[1].length)}
                              </span>
                            </span>
                          )
                        )}
                      </code>
                    </pre>
                  </div>
                );
              })
            ) : (
              <em>No transformations found.</em>
            )}
          </div>
        </aside>
      </div>

      <footer>
        <div className="section">
          Made with{" "}
          <span role="img" aria-label="Love">
            ❤️
          </span>{" "}
          for the hacker community by{" "}
          <a
            href="https://twitter.com/jobertabma"
            rel="noopener noreferrer"
            target="_blank"
          >
            @jobertabma
          </a>{" "}
          of{" "}
          <a
            href="https://hackerone.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            HackerOne
          </a>
        </div>
      </footer>
    </Fragment>
  );
};

export default App;
