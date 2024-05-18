// Style components
const Input = styled.input`
  height: 30px;
`;

const Select = styled.select`
  height: 30px;
`;

const Button = styled.button`
  text-transform: lowercase !important;
  padding: 8px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.label`
`;

// Define dynamic input based on type
const DynamicInput = ({ type, onChange, value, placeholder }) => {
  if (type === "boolean") {
    return (
      <Select onChange={(e) => onChange(e.target.value)} value={value}>
        <option value="true">true</option>
        <option value="false">false</option>
      </Select>
    );
  } else {
    return (
      <Input
        type={type}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    );
  }
};

// Main component
const NewThings = ({ item, onChange }) => {
  const [state, setState] = useState(item.value);

  const handleInputChange = (name, value) => {
    const newState = { ...state, [name]: value };
    setState(newState);
    onChange(newState);
  };

  // Import type data and widgets if needed using VM.require()
  const typeData = JSON.parse(Social.get(item.type, "final") || "{}");
  const { properties, widgets } = typeData;

  return (
    <Container>
      {properties.map(property => (
        <Row key={property.name}>
          <Label>{property.name}</Label>
          <DynamicInput
            type={property.type}
            value={state[property.name]}
            onChange={(value) => handleInputChange(property.name, value)}
            placeholder={property.name}
          />
        </Row>
      ))}
      {widgets?.create && (
        <Widget src={widgets.create} props={{ onChange: handleInputChange }} />
      )}
    </Container>
  );
};

export { NewThings };