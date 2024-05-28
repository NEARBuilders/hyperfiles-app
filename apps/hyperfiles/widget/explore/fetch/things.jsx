// fork_Of: "hack.near/widget/fetch.things"

const { fetchThings } = VM.require(
    "buildhub.near/widget/lib.everything-sdk"
  ) || {
    fetchThings: () => {},
  };
  
  const app = props.app ?? "graph";
  const thing = props.thing ?? "commons";
  const things = fetchThings(app, thing);
  
  return (
    <>
      <p>{JSON.stringify(things)}</p>
    </>
  );