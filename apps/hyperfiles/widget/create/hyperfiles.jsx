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

function CreateHyperfile(props) {
    // Initialize state
    let newSchemaSrc = props.schemaSrc || "hyperfiles.near";
    let schemaSrc = newSchemaSrc;
    let availableSchemas = [];
    let isLoading = true;
    let selectedSchema = props.selectedSchema || "hyperfiles.near/schema/test";
    let source = props.source || "";
    let adapter = props.adapters ? props.adapters[0].value : "";
    let reference = undefined;
    let filename = props.filename || "";
    let activeTab = "data";
    let name = props.name || "";
    let description = props.description || "";
    let json = props.data || "";
    let data = props.data || {};
    let hyperfile = "";

    // Functions to handle state changes
    function setState(newState) {
      Object.assign(state, newState);
      render();
    }

    function handleOnChange(value) {
      setState({ data: { ...state.data, ...value } });
    }

    function handleSchemaSrcChange(newSchemaSrc) {
      setState({ schemaSrc: newSchemaSrc, selectedSchema: "" });
    }

    function handleSelectedSchemaChange(newValue) {
      setState({ selectedSchema: newValue });
    }

    function handleThingUpdate(newData) {
      console.log("Thing Data Updated:", newData);
    }

    function generateUID() {
      return (
        Math.random().toString(16).slice(2) +
        Date.now().toString(36) +
        Math.random().toString(16).slice(2)
      );
    }

    function handleCreate() {
      const isCreator = context.accountId === props.creatorId;
      const { create } = VM.require(adapter) || (() => {});
      if (create) {
        create(json).then((reference) => {
          const thingId = filename || generateUID();
          const hyperfileData = {
            [props.type]: {
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
            hyperfileData.index = {
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
            hyperfileData[props.type][thingId].metadata = {
              ...hyperfileData[props.type][thingId].metadata,
              upstream: `${creatorId}/${props.type}/${props.filename}`,
            };
          }

          hyperfile = JSON.stringify(hyperfileData);
          Social.set(hyperfileData, { force: true });
        });
      }
    }

    // Rendering function
    function render() {
      return (
        <div className="row">
          <div className="col">
            <div className="p-3 border bg-light">
              <Form>
                <h3>Data</h3>
                <FormGroup>
                  <Label>Source</Label>
                  <Widget
                    src={`${config_account}/widget/profile.metadataEditor`}
                    props={{
                      initialMetadata: profile,
                      onChange: (newValue) => {
                        setSource(newValue);
                        State.update({ profile: { ...profile, source: newValue } });
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
                  <p>{JSON.stringify(selectedSchema)}</p>
                  <Widget
                    src={`${config_account}/widget/explore.select.schema`}
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
                    <Widget
                      src={`${config_account}/widget/create.thing`}
                      props={{
                        item: {
                          type: selectedSchema,
                          value: data,
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
                  <Select
                    value={adapter}
                    onChange={(e) => setAdapter(e.target.value)}
                  >
                    {props.adapters && props.adapters.map((o) => (
                      <option key={o.value} value={o.value}>{o.title}</option>
                    ))}
                  </Select>
                </FormGroup>
                {rawAdapter && <>{parseAdapter(rawAdapter)}</>}
              </Form>
            </div>
          </div>
          <div className="col">
            <div className="p-3 border bg-light">
              <Form>
                <Button
                  onClick={handleCreate}
                  disabled={!adapter || !schema || !source || !json}
                >
                  create reference
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
                    <Button
                      onClick={() =>
                        Social.set(JSON.parse(hyperfile), {
                          force: true,
                        })
                      }
                    >
                      save
                    </Button>
                  </>
                )}
              </Form>
            </div>
          </div>
        </div>
      );
    }

    // Initial render call
    return render();
}

return { CreateHyperfile };
