const path = props.path || "hack.near/widget/explore.things";

return (
  <>
    <Widget
      src={`hack.near/widget/explore.thing`}
      props={{
        path,
      }}
    />
  </>
);