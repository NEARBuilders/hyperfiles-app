const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button``;
const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;
const Select = styled.select``;
const Label = styled.label``;
const Input = styled.input``;

const initialSchemaSrc = props.schemaSrc || "hyperfiles.near";
const [newSchemaSrc, setNewSchemaSrc] = useState(initialSchemaSrc);
const [schemaSrc, setSchemaSrc] = useState(initialSchemaSrc);
const [selectedSchema, setSelectedSchema] = useState(props.selectedSchema || "");
const [availableSchemas, setAvailableSchemas] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [fetchedData, setFetchedData] = useState({}); // State for debugging

useEffect(() => {
  setIsLoading(true);
  const fetchSchemasList = () => {
    const query = schemaSrc === '*' ? '*/schema/**' : `${schemaSrc}/schema/**`;
    const schemas = Social.get(query, "final");
    setFetchedData(schemas); // Store raw data for debugging
    if (schemas) {
      let schemasSet = new Set();
      if (schemaSrc === '*') {
        // Collect schemas from all fetched data
        Object.values(schemas).forEach(accountSchemas => {
          Object.values(accountSchemas).forEach(schemaObj => {
            Object.keys(schemaObj).forEach(schemaName => {
              schemasSet.add(schemaName);
            });
          });
        });
      } else {
        // Schemas from a specific account
        Object.keys(schemas).forEach(key => schemasSet.add(key));
      }
      setAvailableSchemas(Array.from(schemasSet));
    } else {
      setAvailableSchemas([]);
    }
    setIsLoading(false);
  };
  fetchSchemasList();
}, [schemaSrc]);

useEffect(() => {
  setSelectedSchema(props.selectedSchema);
}, [props.selectedSchema]);

const handleSchemaChange = (event) => {
  setSelectedSchema(event.target.value);
  if (props.onSelectedSchemaChange) {
    props.onSelectedSchemaChange(event.target.value);
  }
};

const handleSchemaSrcChange = (event) => {
  setNewSchemaSrc(event.target.value);
};

const applySchemaSrc = () => {
  setSchemaSrc(newSchemaSrc);
};

const showAllSchemas = () => {
  setSchemaSrc("*");
};

return (
  <FormContainer>
    <Label>Schema Owner:</Label>
    <Row>
      <Input
        schema="text"
        onChange={handleSchemaSrcChange}
        value={newSchemaSrc}
        placeholder="accountId"
      />
      <Button onClick={applySchemaSrc}>Apply</Button>
    </Row>
    <Label>Schema:</Label>
    <Row>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Select value={selectedSchema} onChange={handleSchemaChange}>
          <option value="">Choose a schema</option>
          {availableSchemas.map((schema) => (
            <option key={schema} value={schema}>
              {schema}
            </option>
          ))}
        </Select>
      )}
      <Button onClick={showAllSchemas}>Show All</Button>
    </Row>
  </FormContainer>
);
// <pre>{JSON.stringify(fetchedData, null, 2)}</pre> {/* Debug output */}