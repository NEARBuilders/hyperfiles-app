// Example attestation UID: 0xff5dc0cdc3de27dfe6a4352c596c0f97b1f99c51a67bbae142ce315e34969dcd
// Example schema UID: 0x6ab5d34260fca0cfcf0e76e96d439cace6aa7c3c019d7c4580ed52c6845e9c89

const TabContent = styled.div`
  margin-top: 1rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const [activeTab, setActiveTab] = useState("query");
const [defaultView, setDefaultView] = useState("QUERY") || props.defaultView;

// Need to finish getAttestation refactor to imported component
//const { GetAttestation } = VM.require("flowscience.near/widget/getAttestation");
//const { attest } = VM.require("flowscience.near/widget/easAttest");
//const { getSchema } = VM.require("flowscience.near/widget/getSchema");
//const { register } = VM.require("flowscience.near/widget/easRegister");
//const { revoke } = VM.require("flowscience.near/widget/easRevoke");
//const { timestamp } = VM.require("flowscience.near/widget/easTimestamp");

const user = Ethers.send("eth_requestAccounts", [])[0];

// if (!user) return <Web3Connect connectLabel="Connect" />;

{
  /*
const chain = Ethers.provider()
  .getNetwork()
  .{then}((chainIdData) => {
    console.log(chainIdData.chainId);
  });
*/
}

const provider = new ethers.providers.JsonRpcProvider(
  "https://optimism.drpc.org"
);
const signer = provider.getSigner(user);
// console.log("chain:", chain);
// console.log("signer:", signer);

return (
  <div className="p-3 border bg-light">
    <div className="m-2">
      <h1>EAS on BOS</h1>
      <p>
        Querying currently only works on
        <a href="https://optimism.easscan.org/">Optimism</a>.
      </p>
      <hr />
    </div>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === "query" ? "active" : ""}`}
          onClick={() => setActiveTab("query")}
        >
          Query
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === "Create" ? "active" : ""}`}
          onClick={() => setActiveTab("Create")}
        >
          Create
        </a>
      </li>
    </ul>
    <TabContent>
      {activeTab === "query" && (
        <div>
          <div className="m-2">
            <Widget src="flowscience.near/widget/getAttestation" />
            <hr />
          </div>

          <div className="m-2">
            <Widget src="flowscience.near/widget/getSchema" />
          </div>
        </div>
      )}
    </TabContent>
    <TabContent>
      {activeTab === "Create" && (
        <div>
          <div className="m-2">
            <h5>Create Attestations (Hyperfiles reference objects) Near</h5>
            <Widget src="flowscience.near/widget/attest" />
            <hr />
            <h5>Coming soon: create Attestations & Schemas on Optimism!</h5>
            <Widget src="flowscience.near/widget/attestEAS" />
            <hr />
          </div>
        </div>
      )}
    </TabContent>
  </div>
);