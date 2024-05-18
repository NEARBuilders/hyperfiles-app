const AccordionHeader = styled.div`
  cursor: pointer;
  background-color: #f8f9fa;
  padding: 1rem;
  margin: 0;
  border: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isExpanded ? "rotate(180deg)" : "rotate(0deg)")};
`;

const AccordionContent = styled.div`
  max-height: ${(props) => (props.isExpanded ? "1000px" : "0")};
  overflow: auto;
  transition: max-height 0.5s ease;
  border: 1px solid #dee2e6; /* Ensure border is continuous */
  padding: ${(props) => (props.isExpanded ? "1rem" : "0")};
`;

const accountId = props.accountId || context.accountId;

if (!accountId) return "Login or send accountId in the props";

const profile = Social.getr(`${accountId}/profile`);

const allWidgetsHistoryChangesBlocks = Social.keys(
  `${accountId}/widget/*`,
  "final",
  {
    return_type: "History",
  }
);

if (allWidgetsHistoryChangesBlocks === null) return "Loading...";

const widget = allWidgetsHistoryChangesBlocks[accountId].widget;

const totalCommits = Object.keys(widget)
  .map((key) => widget[key])
  .flat();

const widgets = Social.getr(`${accountId}/widget`) ?? {};

const [isExpanded, setIsExpanded] = useState(false);

const toggleAccordion = () => {
  setIsExpanded(!isExpanded);
};

// --------------- nodes -------------------
const Nodes = (
    <div
      className="col-lg-12 pb-4"
      style={{
        boxShadow: "2px 10px 20px rgba(128, 117, 226, 0.2)",
      }}
    >
      <div
        style={{ backgroundColor: themeColor?.sbt_info?.card_bg }}
        className="shadow-sm rounded-4"
      >
        <Widget
          key={state.data}
          src="${config_account}/widget/explore.view.tree"
          props={{
            rootPath: state.data,
            themeColor: themeColor.tree,
          }}
        />
      </div>
    </div>
  );

return (
    <div>
        <div><h2>Data Tree</h2></div>
        <div className="row">{Nodes}</div>
    <div className="rightSection">
    <div>
      <AccordionHeader onClick={toggleAccordion} aria-expanded={isExpanded}>
        <div><h2>
          <Icon isExpanded={isExpanded} className="bi bi-chevron-down" />
          Widgets</h2>
        </div>
        <span>{isExpanded ? "(click to collapse)" : "(click to expand)"}</span>
      </AccordionHeader>
      <AccordionContent isExpanded={isExpanded}>
        <div className="widgetsContainer">
          {Object.keys(widgets)?.length > 0 ? (
            Object.keys(widgets)?.map((item, index) => (
              <Widget
                key={index}
                src="zahidulislam.near/widget/Profile.WidgetItem"
                props={{
                  name: item,
                  accountId,
                  commits: allWidgetsHistoryChangesBlocks[accountId].widget[item],
                }}
              />
            ))
          ) : (
            <p style={{ padding: 20, textAlign: "center", color: "rgba(0,0,0,.75)" }}>
              {profile?.name} does not have any widget.
            </p>
          )}
        </div>
      </AccordionContent>
    </div>
    <div>
      <h2>{totalCommits.length} contributions</h2>
      <div style={{ marginTop: 20 }} />
      <Widget
        src="zahidulislam.near/widget/Profile.Contributions"
        props={{ theme: props.theme }}
      />
    </div>
  </div>
  </div>
);