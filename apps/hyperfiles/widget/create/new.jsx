const { NewThings } = VM.require('${config_account}/widget/create.newthings');

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Select = styled.select`
  height: 30px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  height: 30px;
`;

const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

// Initializing state and utility functions
const CreateNew = ({ initialData = {}, types, schemas }) => {
  const [data, setData] = useState(initialData);
  const [selectedTypeOrSchema, setSelectedTypeOrSchema] = useState('');

  // Load available types or schemas
  const options = { ...types, ...schemas }; // Merging types and schemas into a single object

  const handleTypeOrSchemaChange = (e) => {
    setSelectedTypeOrSchema(e.target.value);
    setData({}); // Reset data when type or schema changes
  };

  const handleChange = (newData) => {
    setData(newData);
  };

  const handleSave = () => {
    console.log('Saving data:', data);
    // Implement save functionality here
  };

  return (
    <Container>
      <FormGroup>
        <Label>Select Type or Schema:</Label>
        <Select value={selectedTypeOrSchema} onChange={handleTypeOrSchemaChange}>
          <option value="">Select an option</option>
          {Object.keys(options).map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </Select>
      </FormGroup>
      {selectedTypeOrSchema && (
        <FormContainer>
          <NewThings 
            item={{ type: options[selectedTypeOrSchema], value: data }} 
            onChange={handleChange}
          />
          <Row>
            <Button onClick={handleSave}>Save</Button>
          </Row>
        </FormContainer>
      )}
    </Container>
  );
};

export { CreateNew };
