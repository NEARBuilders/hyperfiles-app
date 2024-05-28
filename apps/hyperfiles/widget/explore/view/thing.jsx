const path = props.path; // every piece of data on social contract has a path
const blockHeight = props.blockHeight || "final"; // and a blockHeight (~version)
const templateOverride = props.templateOverride;

// split the path
const parts = path.split("/");
const creatorId = parts[0];

let type;
if (parts.length === 1) {
  if (parts[0].charAt(0) === "#") {
    // hashtag
    type = "hashtag";
  } else {
    // every root of a path is an account
    type = "account";
  }
} else {
  // otherwise the "standard" is the type (widget, post, type, thing...)
  // for thing, we'll extract the actual "Type" later
  type = parts[1];
}

State.init({
  view: "THING",
});

const Container = styled.div`
  //border: 1px solid #ccc;
  height: fit-content;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  //border-bottom: 1px solid #ccc;
`;

const Content = styled.div`
  padding: 1px;
  min-height: 300px;
`;

function Thing() {
  // Renders the path according to type
  switch (type) {
    case "thing":
      {
        // get the thing data
        const thing = JSON.parse(Social.get(path, blockHeight) || "null");
        type = thing.type || null;
        // get the type data
        const typeObj = JSON.parse(Social.get(type, blockHeight) || "null");
        if (typeObj === null) {
          console.log(
            `edge case: thing ${path} had an invalid type: ${thingType}`
          );
        }
        // determine the widget to render this thing (is there a default view?)
        console.log("TemplateOverride", templateOverride);
        const widgetSrc =
          templateOverride || thing.template?.src || typeObj?.widgets?.view;
        //Template
        //hard code until finding template override prop
        //const widgetSrc = "harmonic1.near/widget/artist2";
        return (
          <Widget
            src={widgetSrc}
            props={{ data: thing.data, path, blockHeight }}
          />
        );
      }
      // DEFAULT:
      return <p>The type: {type} is not yet supported.</p>;
  }
}

// <ButtonRow>
// <Modifier />
// </ButtonRow>

return (
  <Container id={path}>
    <Content>
      <Thing />
    </Content>
  </Container>
);