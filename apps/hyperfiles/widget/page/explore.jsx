const [path, setPath] = useState("");
const [accounts, setAccounts] = useState([]);

// Function to handle updates based on predefined queries
const handleQueryChange = (query) => {
  const value = Social.get(query, "final");
  const accountsFromQuery = Object.keys(value);
  setAccounts(accountsFromQuery);
  setPath(query);
};

const handlePathUpdate = (newPath) => {
  setPath(newPath);
};

return (
  <div className="p-3 border bg-light">
    <div
      style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
    >
      <Widget
        src="hyperfiles.near/widget/query.search"
        onPathChange={handlePathUpdate}
      />
      <Widget
        src="flowscience.near/widget/view"
        path="flowscience.near/thing/*"
      />
      <Widget src="hyperfiles.near/widget/view" path={path} />
    </div>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 1 }}>
        <Widget src="hack.near/widget/graph.view" props={{}} />
      </div>
      <div style={{ flex: 1 }}>
        <Widget src="efiz.near/widget/every.thing" />
      </div>
    </div>
  </div>
);
