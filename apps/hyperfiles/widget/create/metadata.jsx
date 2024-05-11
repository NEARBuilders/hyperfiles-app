function CreateMetadata(props) {
    const [name, setName] = useState(props.name ?? "");
    const [description, setDescription] = useState(props.description ?? "");
  
    return (
      <div>
        <h3>Metadata</h3>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    );
  }
  
  return { CreateMetadata };