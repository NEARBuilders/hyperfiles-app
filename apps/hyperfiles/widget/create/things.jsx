const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  height: 30px;
`;

const Select = styled.select`
  height: 30px;
`;

const Checkbox = styled.input`
  type: checkbox;
`;

// Utility to parse JSON properties safely
const safelyParseJSON = (json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return []; // return an empty array if JSON is invalid
  }
};

const CreateThings = ({ item, onChange }) => {
  // Destructure and parse properties, handling both direct object access and stringified JSON
  const properties = typeof item.type === 'string' ? safelyParseJSON(Social.get(item.type, "final") || "{}").properties : item.type.properties;

  // Handle input changes and propagate them upwards
  const handleInputChange = (propertyName, newValue) => {
    onChange({
      ...item.value,
      [propertyName]: newValue
    });
  };

  const renderInput = (property) => {
    const value = item.value[property.name] || '';
    switch (property.type) {
      case 'boolean':
        return (
          <Checkbox
            checked={value}
            onChange={(e) => handleInputChange(property.name, e.target.checked)}
          />
        );
      case 'string':
      case 'number':
      case 'date':
        return (
          <Input
            type={property.type === 'date' ? 'date' : 'text'}
            value={value}
            onChange={(e) => handleInputChange(property.name, e.target.value)}
          />
        );
      default:
        return <Input value={value} onChange={(e) => handleInputChange(property.name, e.target.value)} />;
    }
  };

  return (
    <Container>
      {properties.map((property) => (
        <FormGroup key={property.name}>
          <Label>{`${property.name}${property.isRequired ? ' *' : ''}`}</Label>
          {renderInput(property)}
        </FormGroup>
      ))}
    </Container>
  );
};

export { CreateThings };
