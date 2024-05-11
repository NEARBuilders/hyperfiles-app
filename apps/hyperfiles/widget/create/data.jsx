const DataCreator = ({ initialData, onCreation, adapters, schema }) => {
    const [data, setData] = useState(initialData);
    const [selectedAdapter, setAdapter] = useState(adapters[0].value);
  
    const handleInputChange = (name, value) => {
      setData(prev => ({ ...prev, [name]: value }));
    };
  
    const createData = async () => {
      const adapterScript = VM.require(selectedAdapter);
      const reference = await adapterScript.create(data);
      onCreation(reference);
    };
  
    return (
      <Form>
        {Object.entries(schema.properties).map(([name, spec]) => (
          <FormGroup key={name}>
            <Label>{spec.label}</Label>
            <Input
              type={spec.type}
              value={data[name]}
              onChange={(e) => handleInputChange(name, e.target.value)}
            />
          </FormGroup>
        ))}
        <Button onClick={createData}>Create</Button>
      </Form>
    );
  };
  