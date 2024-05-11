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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

function CreateMetadata({ name, setName, description, setDescription }) {
    return (
      <Form>
        <h3>Metadata</h3>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <textarea
            className="form-control mb-3"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Tags</Label>
          <Widget src="mob.near/widget/TagsEditor" />
        </FormGroup>
      </Form>
    );
};
  
return { CreateMetadata };