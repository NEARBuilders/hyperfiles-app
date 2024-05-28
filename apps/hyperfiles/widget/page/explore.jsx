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
  <div className="container mt-3 p-3 border bg-light">
    <div className="row">
      <h1>Hyperfiles Explorer</h1>
      <p><i>*View the
        <a href="https://opencann.notion.site/Hyperfiles-52cdfb892aff4d0ebe2178436c5edf6d">
          docs
        </a>
        to learn more about how Hyperfiles data structures work.</i>
      </p>
      <p><ul>
      <li>Search for fields, schemas, types, profiles, and other content metadata.</li>
      <li>Explore the network of related entities (data + creators) and actions (references + jobs).</li>
      </ul></p>
      <hr />
    </div>
    <h2>Explore Social Graphs</h2>
      <div style={{ flex: 1 }}>
        <Widget src="${config_account}/widget/explore.view.graph" props={{}} />
      </div>
    <h2>Explore Data</h2>
    <div>
      <div>
      <Widget src="${config_account}/widget/explore.view.path" props={{
        path: "hyperfiles.near/type/**"}} />
      </div>
    </div>
    <h2>Explore Types</h2>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 1 }}>
        <Widget src="${config_account}/widget/explore.types" />
      </div>
    </div>
  </div>
);
