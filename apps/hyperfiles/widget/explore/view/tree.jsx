/**
 * Takes in a rootPath and rootType
 */
const rootPath = props.rootPath || context.accountId || "hyperfiles.near";
const rootType = props.rootType || "account";
const rootNode = props.rootNode || {};
const [inputValue, setInputValue] = useState("");

State.init({
  path: rootPath,
  type: rootType,
  history: [rootPath],
});

function setPath(path) {
  State.update({ path });
}

function setHistory(history) {
  State.update({ history });
}

function setType(type) {
  State.update({ type });
}

function setRoot(newPath, newType) {
  State.update({
    path: newPath,
    type: newType,
  });
}

const handleInputChange = (event) => {
  setInputValue(event.target.value);
};

const handleExploreClick = () => {
  setPath(inputValue); // Assuming setPath updates the state as needed
};

// WHEN A NEW ROOT IS SET //
// GET DATA AT THIS PATH //
function getNode(path, type) {
  const parts = path.split("/");
  let value = {};

  // ACCOUNT //
  if (type === "account") {
    if (parts.length > 1) {
      // GRAPH // FOLLOW // BACK TO ACCOUNT : WORKING
      setRoot(parts[3], "account");
    } else {
      if (parts[0] !== "*") {
        parts.push("**");
      }
      value = Social.get(parts.join("/"), "final");
      return value;
    }
    // THING //
  } else if (type === "thing") {
    // path: "everything"
    // type: "thing"
    return rootNode; // Or should "everything" be "*"?
    // PROFILE //
  } else if (type === "profile") {
    value = Social.get(parts.join("/"), "final");
    // POST : WIP //
  } else if (type === "post") {
    value = path;
    // NAMETAG : WIP //
  } else if (type === "nametag") {
    if (parts.length > 2) {
      if (parts.length === 3) {
        // BACK TO ACCOUNT
        setRoot(parts[3], "account");
      } else if (parts.length === 4) {
        // ALL TAGS BY ACCOUNT
        value = Social.keys(`${parts[0]}/profile/tags/*`, "final");
      } else {
        // THIS TAG
        value = parts[5];
      }
    }
  } else {
    parts.push("**");
    value = Social.get(parts.join("/"), "final");
    return value;
  }
}

const node = getNode(state.path, state.type);

return (
  <div className="p-3 border bg-light">
    <label htmlFor="pathInput" style={{ marginRight: "10px" }}>
      Enter account name:
    </label>

    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        id="pathInput"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="e.g. hyperfiles.near"
      />
      <button onClick={handleExploreClick}>Explore</button>
    </div>
    <hr />
    <Widget
      src="efiz.near/widget/Node"
      props={{
        label: state.path,
        node,
        type: state.type,
        path: state.path,
        setPath: setPath,
        history: state.history,
        setHistory: setHistory,
        setType: setType,
        isRoot: true,
        styles: {
          subject: {
            fontFamily: "Times New Roman",
            fontSize: "4em",
            lineHeight: "1.25",
            fontWeight: 400,
            cursor: "pointer",
          },
        },
      }}
    />
  </div>
);