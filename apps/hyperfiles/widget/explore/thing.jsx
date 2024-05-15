if (typeof props.path !== "string") return "send {path} as string in props";

State.init({
  selectedTab: "explore",
  selectedBlockHeight: "final",
});

const historyBlocksRequest = Social.keys(`${props.path}`, "final", {
  return_type: "History",
});

if (historyBlocksRequest === null) return "loading...";

const [widgetAccountId, _, widgetName] = props.path.split("/");

let blocksChanges =
  historyBlocksRequest[widgetAccountId]?.["widget"]?.[widgetName];

if (props.count) props.count(blocksChanges.length);

if (blocksChanges) blocksChanges = blocksChanges?.sort((a, b) => b - a);

if (!state.selectedBlockHeight) state.selectedBlockHeight = blocksChanges[0];

function getDatastringFromBlockHeight(blockHeight) {
  const block = Near.block(blockHeight);
  const date = new Date(block.header.timestamp_nanosec / 1e6);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

const renderBlockChangesLink = (blockHeight) => {
  return (
    <div>
      <button
        className={`list-group-item list-group-item-action ${
          state.selectedBlockHeight != blockHeight ? "" : "list-group-item-info"
        }`}
        onClick={() => {
          State.update({ selectedBlockHeight: blockHeight });
        }}
      >
        #{blockHeight} * {getDatastringFromBlockHeight(blockHeight)}
      </button>
    </div>
  );
};

function blockHeightToWidgetCode(blockHeight) {
  const index = blocksChanges.findIndex((el) => el == blockHeight);
  return (
    <div class="mb-3">
      <Widget
        key={blockHeight}
        src={`bozon.near/widget/WidgetHistory.CodeHistoryCard`}
        props={{
          pathToWidget: props.path,
          currentBlockHeight: blockHeight,
          prevBlockHeight: blocksChanges[index + 1],
        }}
      />
    </div>
  );
}

function blockHeightToWidgetRender(blockHeight) {
  const index = blocksChanges.findIndex((el) => el == blockHeight);
  return (
    <Widget
      style={{ minHeight: "200px" }}
      key={blockHeight}
      src={`bozon.near/widget/WidgetHistory.RenderCode`}
      props={{
        pathToWidget: props.path,
        currentBlockHeight: blockHeight,
        prevBlockHeight: blocksChanges[index + 1],
      }}
    />
  );
}

const Tabs = styled.div`
  display: flex;
  padding: 0 12px;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
`;

const TabsButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;

  &:hover {
    color: #11181C;
  }

  &::after {
    content: '';
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 3px;
    background: #0091FF;
  }
`;

return (
  <div>
    {!blocksChanges ? (
      <div>invalid path</div>
    ) : (
      <div>
        <Tabs>
          <TabsButton
            type="button"
            onClick={() =>
              State.update({
                selectedTab: "connect",
              })
            }
            selected={state.selectedTab == "connect"}
          >
            Connect
          </TabsButton>

          <TabsButton
            type="button"
            onClick={() =>
              State.update({
                selectedTab: "explore",
              })
            }
            selected={state.selectedTab == "explore"}
          >
            Explore
          </TabsButton>
        </Tabs>

        {!state.selectedTab && (
          <div className="m-2">
            <p>Hello</p>
          </div>
        )}

        {state.selectedTab == "connect" && (
          <div className="m-2">
            <Widget src="hack.near/widget/explore.connect" />
          </div>
        )}

        {state.selectedTab == "explore" && (
          <div>{blockHeightToWidgetRender(state.selectedBlockHeight)}</div>
        )}
      </div>
    )}
  </div>
);