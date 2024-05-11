const defaultOptions = [
    { name: "Markdown" },
    { name: "JSON" },
    { name: "Other" },
  ];
  
  const schemaPattern = props.schemaPattern ?? "*/schema/*";
  const placeholder = props.placeholder ?? "Schema";
  const initialSchemaObject = props.initialSchemaObject || {};
  
  const schemaObject = Social.keys(schemaPattern, "final");
  
  if (schemaObject === null) {
    return "Loading";
  }
  
  const normalizeProf = (prof) =>
    prof
      .replaceAll(/[- \.]/g, "_")
      .replaceAll(/[^\w]+/g, "")
      .replaceAll(/_+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
      .toLowerCase()
      .trim("-");
  
  const schemaCount = {};
  
  const processSchemaObject = (obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === "object") {
        processSchemaObject(value);
      } else {
        const prof = normalizeProf(key);
        schemaCount[prof] = (schemaCount[prof] || 0) + 1;
      }
    });
  };
  
  const getSchema = () => {
    processSchemaObject(schemaObject);
    const schema = Object.entries(schemaCount);
    schema.sort((a, b) => b[1] - a[1]);
    return schema.map((t) => ({ name: t[0], count: t[1] }));
  };
  
  if (!state.allSchema) {
    initState({
      allSchema: getSchema().length > 0 ? getSchema() : schemaArray || [], // Fallback to empty array if schemaArray is undefined
      schema: Object.keys(initialSchemaObject).map((prof) => ({
        name: normalizeProf(prof),
      })),
      originalSchema: Object.fromEntries(
        Object.keys(initialSchemaObject).map((prof) => [prof, null])
      ),
      id: `schema-selector-${Date.now()}`,
    });
  }
  
  const setSchema = (schema) => {
    schema = schema.map((o) => ({ name: normalizeProf(o.name) }));
    State.update({ schema });
    if (props.setSchemaObject) {
      props.setSchemaObject(
        Object.assign(
          {},
          state.originalSchema,
          Object.fromEntries(schema.map((prof) => [prof.name, ""]))
        )
      );
    }
  };
  
  return (
    <>
      <Typeahead
        id={state.id}
        labelKey="name"
        onChange={setSchema}
        options={state.allSchema}
        placeholder={placeholder}
        selected={state.schema}
        positionFixed
        allowNew
      />
      {props.debug && (
        <div>
          Debugging schema:
          <pre>{JSON.stringify(state.schema)}</pre>
        </div>
      )}
    </>
  );