const TabContent = styled.div`
  margin-top: 1rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
`;

const Select = styled.select`
  padding: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const adapters = [
  // these can come from the user (or app) settings
  // {
  //   title: "Local Storage",
  //   value: "everycanvas.near/widget/adapter.local_storage",
  //   saveRef: false
  // },
  // {
  //   title: "SocialDB",
  //   value: "everycanvas.near/widget/adapter.social",
  // },
  {
    title: "",
    value: "",
  },
  {
    title: "IPFS",
    value: "everycanvas.near/widget/adapter.ipfs",
    refType: { cid: "string" },
  },
  // {
  //   title: "Custom",
  //   value: "custom",
  // },
  {
    title: "GitHub",
    value: "hyperfiles.near/widget/adapter.github",
  },
  // {
  //   title: "Obsidian",
  //   value: "hack.near/widget/adapter.obsidian",
  // },
  // {
  //   title: "Tldraw",
  //   value: "hack.near/widget/adapter.tldraw",
  // },
];

//const { GitHubAPIExample } = VM.require(  "create.near/widget/GitHub.API.Example");
const { MetadataComponent } = VM.require(
  "hyperfiles.near/widget/CreateMetadata"
);
const [rawData, setRawData] = useState("");
const [source, setSource] = useState("");
const [schema, setSchema] = useState("");
const [adapter, setAdapter] = useState("");
const [reference, setReference] = useState(undefined);
const [activeTab, setActiveTab] = useState("content");
const [name, setName] = useState(props.name ?? "");
const [description, setDescription] = useState(props.description ?? "");
const [hyperfile, setHyperfile] = useState("");
const [type, setType] = useState("");
const [filePath, setFilePath] = useState(null);
const [defaultView, setDefaultView] =
  useState("HYPERFILE") || props.defaultView;

const handleSelectRepository = (selectedFilePath) => {
  console.log("Selected repository:", selectedFilePath);
  // Assuming you need the repository's file path or some specific identifier
  setFilePath(selectedFilePath); // or any specific attribute you need
};

const rawAdapter =
  (adapter !== "" || adapter !== "custom") && Social.get(adapter, "final");
const { create } =
  ((adapter !== "" || adapter !== "custom") && VM.require(adapter)) ||
  (() => {});

const functionRegex = /function\s+(\w+)\s*\(([^)]*)\)\s*{([\s\S]*?)\n}/g;

function parseAdapter(code) {
  let match;
  const functions = [];

  while ((match = functionRegex.exec(code)) !== null) {
    const [_, functionName, params, content] = match;
    functions.push({ functionName, params, content });
  }

  return functions.map((func, index) => (
    <FormGroup key={index}>
      <Label>{func.functionName}</Label>
      <textarea
        className="form-control"
        style={{ width: "100%", height: "100%" }}
        value={func.content.trim()}
        disabled
      />
    </FormGroup>
  ));
}

function generateUID() {
  const maxHex = 0xffffffff;
  const randomNumber = Math.floor(Math.random() * maxHex);
  return randomNumber.toString(16).padStart(8, "0");
}

const handleCreate = () => {
  if (create) {
    console.log("it's something", rawData);
    // store the data somewhere, based on the adapter
    create(rawData).then((reference) => {
      // now we have a reference to the data
      const thingId = generateUID();

      const hyperfile = {
        thing: {
          // which we store in the social contract
          [thingId]: {
            "": JSON.stringify({
              source: source,
              adapter: adapter,
              reference: reference,
            }),
            metadata: {
              name: name,
              description: description,
              schema: schema,
            },
          },
        },
      };

      setHyperfile(JSON.stringify(hyperfile, null, 2));
    });
  } else {
    console.log("invalid adapter");
  }
};

const MetadataForm = ({ name, setName, description, setDescription }) => {
  return (
    <Form>
      <h3>Metadata</h3>
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <textarea
          className="form-control mb-3"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Tags</Label>
        <Widget src="mob.near/widget/TagsEditor" />
      </FormGroup>
    </Form>
  );
};

console.log("source: ", source);
console.log("schema: ", schema);
//console.log("data: ", rawData);
//console.log("adapter: ", adapter);

return (
  <div className="container mt-3 p-3 border bg-light">
    <div className="row">
      <h1>Hyperfile Creator</h1>
      <p>
        View the
        <a href="https://opencann.notion.site/Hyperfiles-52cdfb892aff4d0ebe2178436c5edf6d">
          docs
        </a>
        to learn how the different data structures work together.
      </p>
      <hr />
    </div>
    <Row style={{ gap: "8px", marginBottom: "16px" }}>
      <h2>Create</h2>{" "}
      <Select
        value={state.defaultView}
        onChange={(e) => setDefaultView(e.target.value)}
      >
        <option value="HYPERFILE">Data Object</option>
        <option value="ATTESTATION">Attestation</option>
        <option value="SCHEMA">Schema</option>
        <option value="TYPE">Type</option>
        <option value="JOB">Job</option>
      </Select>
    </Row>
    <div>
      <Widget src="hyperfiles.near/widget/query.search" props={{}} />
    </div>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === "content" ? "active" : ""}`}
          onClick={() => setActiveTab("content")}
        >
          Content
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === "metadata" ? "active" : ""}`}
          onClick={() => setActiveTab("metadata")}
        >
          Metadata
        </a>
      </li>
    </ul>
    <div className="row">
      <TabContent>
        {defaultView === "HYPERFILE" && (
          <div className="row">
            <TabContent>
              {activeTab === "content" && (
                <div className="row">
                  <div className="col">
                    <div className="p-3 border bg-light">
                      <Widget
                        src="hyperfiles.near/widget/hyperfile.create"
                        props={{}}
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabContent>
            <TabContent>
              {activeTab === "metadata" && (
                <MetadataForm
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                />
              )}
            </TabContent>
          </div>
        )}
      </TabContent>
      <TabContent>
        {defaultView === "ATTESTATION" && (
          <div className="row">
            <TabContent>
              {activeTab === "content" && (
                <div className="row">
                  <div className="col">
                    <div className="p-3 border bg-light">
                      <Widget src="flowscience.near/widget/eas" props={{}} />
                    </div>
                  </div>
                </div>
              )}
            </TabContent>
            <TabContent>
              {activeTab === "metadata" && (
                <MetadataForm
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                />
              )}
            </TabContent>
          </div>
        )}
      </TabContent>
      <TabContent>
        {defaultView === "SCHEMA" && (
          <div className="row">
            <TabContent>
              {activeTab === "content" && (
                <div className="row">
                  <div className="col">
                    <div className="p-3 border bg-light">
                      <Widget
                        src="hyperfiles.near/widget/schema.edit"
                        props={{}}
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabContent>
            <TabContent>
              {activeTab === "metadata" && (
                <MetadataForm
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                />
              )}
            </TabContent>
          </div>
        )}
      </TabContent>
      <TabContent>
        {defaultView === "TYPE" && (
          <div className="row">
            <TabContent>
              {activeTab === "content" && (
                <div className="row">
                  <div className="col">
                    <div className="p-3 border bg-light">
                      <Widget
                        src="efiz.near/widget/every.type.create"
                        props={{}}
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabContent>
            <TabContent>
              {activeTab === "metadata" && (
                <MetadataForm
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                />
              )}
            </TabContent>
          </div>
        )}
      </TabContent>
      <TabContent>
        {defaultView === "JOB" && (
          <div className="row">
            <TabContent>
              {activeTab === "content" && (
                <div className="row">
                  <div className="col">
                    <div className="p-3 border bg-light">
                      <Widget
                        src="jgodwill.near/widget/JSONFormatter"
                        props={{}}
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabContent>
            <TabContent>
              {activeTab === "metadata" && (
                <MetadataForm
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                />
              )}
            </TabContent>
          </div>
        )}
        <div>
          <Widget
            src="efiz.near/widget/Every.Thing.History"
            props={{
              path: state.path,
              count: (count) => console.log("Number of changes:", count),
            }}
          />
        </div>
      </TabContent>
    </div>
  </div>
);