const queries = props.predefinedQueries || [
    //{ name: "Widget Builders", query: "*/widget/*" },
    //{ name: "Feature Builders", query: "*/widget/*/metadata/tags/app" },
    { name: "Hyperfiles", query: "*/hyperfile/*" },
    { name: "Attestations", query: "*/attestation/*" },
    { name: "Schemas", query: "*/schema/*" },
    { name: "Types", query: "*/type/*" },
    { name: "Jobs", query: "*/job/*" },
    //{ name: "Feature Builders", query: "*/widget/*/metadata/tags/app" },
  ];
  
  const [inputPath, setInputPath] = useState("");
  const defaultPath = props.defaultPath;
  const onUpdateSearchResult = props.onUpdateSearchResult || "/hyperfile";
  const debug = props.debug || false;
  if (!onUpdateSearchResult)
    return "Must provide a callback function over props.onUpdateSearchResult";
  
  State.init({
    path: defaultPath,
    accounts: [],
  });
  
  const onChangePath = (path) => {
    const value = Social.get(path, "final");
    const accounts = Object.keys(value);
    onUpdateSearchResult(accounts);
    State.update({ path: path, accounts: accounts });
    setInputPath(path);
    console.log("Failed to fetch data:", error);
  };
  
  const handleSubmit = () => {
    onPathChange(inputPath); // This callback updates the parent component's state
  };
  
  // Integrate mob.near/widget/ComponentSearch to show results for queried objects
  // Format results with starred components = mob.near/widget/Applications
  // const allComponents = [];
  
  const allPeople = [];
  
  for (let i = 0; i < state.accounts.length; ++i) {
    const accountId = state.accounts[i];
  
    allPeople.push(
      <a
        href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
        className="text-decoration-none"
        key={`people_${i}`}
      >
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId,
            tooltip: true,
            className: "d-inline-block overflow-hidden",
          }}
        />
      </a>
    );
  }
  
  return (
    <div>
      <div class="mb-2">
        <input
          type="text"
          value={state.path}
          onChange={(e) => onChangePath(e.target.value)}
          placeholder={"*/widget/*/metadata/tags/app"}
        />
        <button onClick={handleSubmit}>Update Path</button>
      </div>
      <div class="d-flex flex-wrap flex-row mb-2">
        <div class="btn-toolbar" role="toolbar" aria-label="Generated queries">
          {queries &&
            queries.length &&
            queries.map((q, i) => {
              return (
                <button
                  type="button"
                  key={`query_${i}`}
                  class="btn btn-primary btn-sm mr-2"
                  onClick={() => {
                    onChangePath(q.query);
                  }}
                >
                  {q.name}
                </button>
              );
            })}
        </div>
        <div>{debug && allPeople}</div>
      </div>
    </div>
  );