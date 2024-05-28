const DataViewer = ({ path, adapter }) => {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const adapterScript = VM.require(adapter);
        const content = await adapterScript.get(path);
        setData(content);
      };
      fetchData();
    }, [path, adapter]);
  
    return data ? (
      <div className="container">{/* Render content based on data type here */}</div>
    ) : (
      <p>Loading...</p>
    );
  };
  