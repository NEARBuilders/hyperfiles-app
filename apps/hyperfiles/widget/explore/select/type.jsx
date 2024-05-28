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

const initialTypeSrc = props.typeSrc || "hyperfiles.near";
const [newTypeSrc, setNewTypeSrc] = useState(initialTypeSrc);
const [typeSrc, setTypeSrc] = useState(initialTypeSrc);
const [selectedType, setSelectedType] = useState(props.selectedType || "");
const [availableTypes, setAvailableTypes] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [fetchedData, setFetchedData] = useState({}); // State for debugging

useEffect(() => {
  setIsLoading(true);
  const fetchTypesList = () => {
    const query = typeSrc === '*' ? '*/type/**' : `${typeSrc}/type/**`;
    const types = Social.get(query, "final");
    setFetchedData(types); // Store raw data for debugging
    if (types) {
      let typesSet = new Set();
      if (typeSrc === '*') {
        // Collect types from all fetched data
        Object.values(types).forEach(accountTypes => {
          Object.values(accountTypes).forEach(typeObj => {
            Object.keys(typeObj).forEach(typeName => {
              typesSet.add(typeName);
            });
          });
        });
      } else {
        // Types from a specific account
        Object.keys(types).forEach(key => typesSet.add(key));
      }
      setAvailableTypes(Array.from(typesSet));
    } else {
      setAvailableTypes([]);
    }
    setIsLoading(false);
  };
  fetchTypesList();
}, [typeSrc]);

useEffect(() => {
  setSelectedType(props.selectedType);
}, [props.selectedType]);

const handleTypeChange = (event) => {
  setSelectedType(event.target.value);
  if (props.onSelectedTypeChange) {
    props.onSelectedTypeChange(event.target.value);
  }
};

const handleTypeSrcChange = (event) => {
  setNewTypeSrc(event.target.value);
};

const applyTypeSrc = () => {
  setTypeSrc(newTypeSrc);
};

const showAllTypes = () => {
  setTypeSrc("*");
};

return (
  <FormContainer>
    <Label>Import Type for Editing:</Label>
    <Row>  
      <Input
        type="text"
        value={state.newType}
        onChange={(e) => State.update({ newType: e.target.value })}
        placeholder={"accountId/type/Type"}
      />
      <Button onClick={loadType}>load</Button>
    </Row>
    <Label>Import Property Types:</Label>
    <Row>
      <Input
        type="text"
        onChange={handleTypeSrcChange}
        value={newTypeSrc}
        placeholder="accountId"
      />
      <Button onClick={applyTypeSrc}>Apply</Button>
    </Row>
    <Label>Select Type to Edit:</Label>
    <Row>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Select value={selectedType} onChange={handleTypeChange}>
          <option value="">Choose a type</option>
          {availableTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      )}
      <p/>
      <Button onClick={showAllTypes}>Show All</Button>
    </Row>
  </FormContainer>
);
// <pre>{JSON.stringify(fetchedData, null, 2)}</pre> {/* Debug output */}