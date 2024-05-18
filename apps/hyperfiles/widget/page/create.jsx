const { DataCreator } = VM.require("${config_account}/widget/create.data");
const { CreateHyperfile } = VM.require('${config_account}/widget/create.hyperfiles');
//const { GitHubAPIExample } = VM.require(  "create.near/widget/GitHub.API.Example");
const { CreateMetadata } = VM.require(
  "${config_account}/widget/create.metadata"
);

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

console.log("source: ", source);
console.log("schema: ", schema);
console.log("data: ", rawData);
console.log("adapter: ", adapter);

return (
  <div className="container mt-3 p-3 border bg-light">
    <div className="row">
      <h1>Hyperfiles Creator</h1>
      <p><i>*View the
        <a href="https://opencann.notion.site/Hyperfiles-52cdfb892aff4d0ebe2178436c5edf6d">
          docs
        </a>
        to learn more about how Hyperfiles data structures work.</i>
      </p>
      <p><b>TLDR:</b> <ul>
      <li>Publish structured data objects, attest (add references) to data and reference objects, and run jobs (coming soon).</li>
      <li>Each schema contains an ordered list of types that describes the structure of corresponding data objects.</li>
      <li>Common types & schemas compose into a graph of related entities (data + creators) and actions (references + jobs).</li>
      </ul></p>
      <hr />
    </div>
    <Row style={{ gap: "10px", marginBottom: "16px" }}>
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
                        src="${config_account}/widget/create.hyperfile"
                        props={{}}
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabContent>
            <TabContent>
              {activeTab === "metadata" && (
                  <CreateMetadata
                    name={name}
                    setName={setName}
                    description={description}
                    setDescription={setDescription} />
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
                      <Widget src="${config_account}/widget/create.reference" props={{}} />
                    </div>
                  </div>
                </div>
              )}
            </TabContent>
            <TabContent>
              {activeTab === "metadata" && (
                <CreateMetadata
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
                        src="${config_account}/widget/create.edit.schema"
                        props={{}}
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabContent>
            <TabContent>
              {activeTab === "metadata" && (
                <CreateMetadata
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
                        src="${config_account}/widget/create.edit.type"
                        props={{}}
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabContent>
            <TabContent>
              {activeTab === "metadata" && (
                <CreateMetadata
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
                        src="${config_account}/widget/create.job"
                        props={{}}
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabContent>
            <TabContent>
              {activeTab === "metadata" && (
                <CreateMetadata
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
    </div>
  </div>
);