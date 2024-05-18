// const { NewThings } = VM.require('${config_account}/widget/create.newthing');
// <NewThings item={{ type: 'specificType', value: {} }} onChange={handleThingUpdate} />

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

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

const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;

const Button = styled.button``;

// Define adapter array before initializing constants below
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

// Schema constants
const initialSchemaSrc = props.schemaSrc || "hyperfiles.near";
const [newSchemaSrc, setNewSchemaSrc] = useState(initialSchemaSrc);
const [schemaSrc, setSchemaSrc] = useState(initialSchemaSrc);
const [availableSchemas, setAvailableSchemas] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [selectedSchema, setSelectedSchema] = useState(
  props.selectedSchema || ""
);

// Creator constants
const defaultAdapter = adapters[0];
const { creatorId } = props;
const [source, setSource] = useState(props.source ?? "");
const [adapter, setAdapter] = useState(defaultAdapter.value ?? "");
const [reference, setReference] = useState(undefined);
const [filename, setFilename] = useState(props.filename ?? "");
const [activeTab, setActiveTab] = useState("data");
const [name, setName] = useState(props.name ?? "");
const [description, setDescription] = useState(props.description ?? "");
const [json, setJson] = useState(props.data ?? "");

const [state, setState] = useState({
  data,
});

const handleOnChange = (value) => {
  setState((prevState) => {
    const newData = { value };
    console.log('Current Data:', newData);
    return {
      data: newData,
    };
  });
};

const handleSchemaSrcChange = (newSchemaSrc) => {
  setSchemaSrc(newSchemaSrc);
  setSelectedSchema(""); // Reset the selected schema when the source changes
};

const handleSelectedSchemaChange = (newValue) => {
  const fullSchemaPath = `${schemaSrc}/schema/${newValue}`;
  setSelectedSchema(fullSchemaPath);
  console.log('Selected Schema Changed:', fullSchemaPath);
};


const handleThingUpdate = (newData) => {
  console.log('Thing Data Updated:', newData);
  // Handle the new data, such as saving to a state or sending to a server
};


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

// TODO: Import keccak from ethers to hash Hyperfile contents
function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

const handleCreate = () => {
  const isCreator = context.accountId === creatorId;

  // load in the state.adapter (modules for IPFS, Arweave, Ceramic, Verida, On Machina... )
  const { create } = VM.require(adapter) || (() => {});
  if (create) {
    // store the data somewhere, based on the adapter
    create(json).then((reference) => {
      // now we have a reference to the data
      // we need to name it... are we the original creator or are we forking? We don't want to overwrite any of the users custom (or maybe we do!)
      const thingId = filename ?? generateUID();

      const hyperfile = {
        [props.type]: {
          // which we store in the social contract
          [thingId]: {
            "": JSON.stringify({
              schema: schema,
              source: source,
              adapter: adapter,
              reference: reference,
              metadata: {
                name: name,
                description: description,
                type: props.type,
              },
            }),
          },
        },
      };

      if (creatorId !== context.accountId) {
        // handle request merge
        hyperfile.index = {
          notify: JSON.stringify({
            key: creatorId,
            value: {
              type: "request",
              data: {
                type: "merge",
                upstream: `${creatorId}/${props.type}/${props.filename}`,
                origin: `${context.accountId}/${props.type}/${thingId}`,
              },
            },
          }),
        };
        hyperfile[props.type][thingId].metadata = {
          ...hyperfile[props.type][thingId].metadata,
          upstream: `${creatorId}/${props.type}/${props.filename}`,
        };
        // I want to make a request to merge
        // set upstream and downstream
      }

      // sometimes we're not logged in, so it doesn't do anything!
      Social.set(hyperfile, { force: true });
    });
  }
};

return (
  <div className="row">
    <div className="col">
      <div className="p-3 border bg-light">
        {/* Save data source names to user profile */}
        <Form>
          <h3>Data</h3>
          <FormGroup>
            <Label>Source</Label>
            <Widget
              src="${config_account}/widget/profile.metadataEditor"
              props={{
                initialMetadata: profile,
                onChange: (newValue) => {
                  console.log("New Source:", newValue);
                  setSource(newValue); // Update local state
                  State.update({
                    profile: { ...profile, source: newValue }, // Update external state
                  });
                },
                value: source,
                options: {
                  source: {
                    sourcePattern: "*/profile/source/*",
                    placeholder: "Select a source",
                  },
                },
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Schema</Label>
            <p>JSON.stringify({selectedSchema})</p>
            <Widget
              src="${config_account}/widget/explore.select.schema"
              props={{
                onSchemaSrcChange: handleSchemaSrcChange,
                onSelectedSchemaChange: handleSelectedSchemaChange,
                selectedSchema: selectedSchema,
                schemaSrc: schemaSrc,
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Input Your Data</Label>
            <FormContainer>
              {/*<near-social-viewer></near-social-viewer>*/}
              <Widget
                src="${config_account}/widget/create.thing"
                props={{
                  item: {
                    type: selectedSchema,
                    value: state.data,
                  },
                  onChange: handleOnChange,
                }}
              />
            </FormContainer>
          </FormGroup>
        </Form>
      </div>
    </div>
    <div className="col">
      <div className="p-3 border bg-light">
        <Form>
          <h3>Storage</h3>
          <FormGroup>
            <Label>Adapter</Label>
            <Select value={adapter} onChange={(e) => setAdapter(e.target.value)}>
              {adapters.map((o) => (
                <option value={o.value}>{o.title}</option>
              ))}
            </Select>
          </FormGroup>
          {rawAdapter && <>{parseAdapter(rawAdapter)}</>}
          {adapter === "hyperfiles.near/widget/adapter.github" && (
            <Widget
              src="flowscience.near/widget/GitHubSearchSelect"
              onSelectRepository={handleSelectRepository}
            ></Widget>
          )}
        </Form>
      </div>
    </div>
    <div className="col">
      <div className="p-3 border bg-light">
        <Form>
          <Button onClick={handleCreate} disabled={!adapter || !selectedSchema || !source || !state.data}>
            Publish Data to `{adapter}`
          </Button>
          {hyperfile !== "" && (
            <>
              <FormGroup>
                <textarea
                  className="form-control"
                  value={hyperfile}
                  disabled
                  style={{ width: "100%", height: "400px" }}
                />
              </FormGroup>
              <Button onClick={() => Social.set(JSON.parse(hyperfile), { force: true })}>
                Save Reference
              </Button>
            </>
          )}
        </Form>
      </div>
    </div>
  </div>
);