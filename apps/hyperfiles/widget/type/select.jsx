const initialTypeSrc = props.typeSrc || "hyperfiles.near";
const [newTypeSrc, setNewTypeSrc] = useState(initialTypeSrc);
const [typeSrc, setTypeSrc] = useState(initialTypeSrc);
const [availableTypes, setAvailableTypes] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [selectedType, setSelectedType] = useState(
  props.selectedType || "attestations.near/type/isTrue"
);

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  `;
const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;
const Select = styled.select`
  `;
const Label = styled.label`
`;
const Input = styled.input`
  `;

useEffect(() => {
  const fetchTypesList = async () => {
    setIsLoading(true);
    // Ensure dynamic accountId is correctly included in the query
    const types = Social.get(`${typeSrc}/type/**`, "final");
    if (types) {
      const typesList = Object.keys(types).map(
        (key) => `${typeSrc}/type/${key}`
      );
      setAvailableTypes(typesList);
    } else {
      setAvailableTypes([]);
    }
    setIsLoading(false);
  };

  fetchTypesList();
}, [typeSrc]); // Depend on typeSrc to refetch when it changes

if (!types) {
  console.error(`Failed to fetch types for ${typeSrc}`);
  // Handle the error appropriately in the UI
}

useEffect(() => {
  // Sync state with prop when it changes
  setSelectedType(props.selectedType);
}, [props.selectedType]); // Re-run effect if props.selectedType changes

const handleTypeChange = (e) => {
  setSelectedType(e.target.value);
  console.log(`New type selected: ${newType}`); // Log the new type selection

  if (props.onSelectedTypeChange) {
    props.onSelectedTypeChange(e.target.value);
  }
};

const handleTypeOwnerChange = (e) => {
  setNewTypeSrc(e.target.value);
};

const handleApplyTypeSrc = () => {
  setTypeSrc(newTypeSrc); // Apply the new type source
  console.log(`Applying new Type Owner: ${newTypeSrc}`); // Log the action
};

return (
  <FormContainer>
    <Label>Type Owner:</Label>
    <Row>
      <Input
        type="text"
        onChange={handleTypeOwnerChange} // Corrected to use the handleTypeOwnerChange function
        value={newTypeSrc}
        placeholder="accountId"
      />
      <Button onClick={handleApplyTypeSrc}>apply</Button>
    </Row>
    <Label>Type:</Label>
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
    </Row>
  </FormContainer>
);