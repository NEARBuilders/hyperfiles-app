const profile = props.profile;
const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
).body;

const css = fetch(
  "https://raw.githubusercontent.com/cryptosynk/near-social-profile/main/css/mainLight.css"
).body;

const theme = "light";

const Theme = styled.div`
  font-family: "Open Sans", sans-serif;
  ${cssFont}
  ${css}
`;

const Container = styled.div`
  max-width: 100%;
  overflow: auto;
  border: 1px solid #dee2e6;
  padding: 1rem;
  margin-bottom: 1rem;
`;


return (
  <div className="container mt-3 p-3 border bg-light">
    <div className="row">
      <h1>Manage {context.accountId}'s Profile</h1>
      <p><ul>
      <li>Edit basic profile info in the left sidebar.</li>
      <li>View widgets you've created and a heatmap of your on-chain activity.</li>
      <li>Explore social profiles, data trees, and delete "keys" for entries in your data tree.</li>
      </ul></p>
      <hr />
    </div>
  <Theme>
    <div className="container">
      <div className="content">
        <Widget
          src="${config_account}/widget/profile.sidebar"
          props={{ accountId, profile, theme }}
        />
        <Widget
          src="${config_account}/widget/profile.main"
          props={{ accountId, profile, theme }}
        />
      </div>
    </div>
    <hr/>
  </Theme>
    <div>
        <Widget src="${config_account}/widget/profile.social" props={{}} />
        <hr/>
        <Container>
        <h2>Profile Cleanup</h2>
        <hr/>
          <Widget src="${config_account}/widget/profile.cleanup" props={{}} />
        </Container>
    </div>
  </div>
);