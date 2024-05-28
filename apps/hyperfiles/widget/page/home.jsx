const { currentPath, page, ...passProps } = props;

const NavbarHeight = 70; // Assumed height of the Navbar

const Card3D = styled.div`
  perspective: 2000px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ScaleUp = {
  transform: 'scale(1.5)', // Scale up by 25%
  paddingTop: `${NavbarHeight}px`, // Ensure content starts below the navbar
  marginTop: `-${NavbarHeight*2}px`, // Offset the padding
  boxSizing: 'border-box', // Include padding in the element's total width and height
};

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #000;
  padding: 2rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Tagline = styled.p`
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5), 2px 2px 2px rgba(0, 0, 0, 0.3);
  text-align: right; /* Right align the tagline */
  width: 100%;
`;

const MainButton = styled.button`
margin: 0.3em;
text-decoration: none;
`;

const { href } = VM.require("${alias_builddao}/widget/lib.url") || {
  href: () => {},
};

const ButtonLink = ({ to, children }) => (
  <Link
    key={to}
    style={{textDecoration: "none"}}
    to={href({
      widgetSrc: "${config_account}/widget/app",
      params: {
        page: to,
      },
    })}
  >
    {children}
  </Link>
);

return (
  <div className="vh-100 w-100">
    <Card3D>
      <CardContent style={ScaleUp}>
        <h1
          className="display-4 font-weight-bold text-black mb-2"
          style={{
            textShadow:
              "1px 1px 1px rgba(0, 0, 0, 0.5), 4px 4px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          hyperfiles
        </h1>
        <Tagline className="h5 text-success mb-4">
          organize everything
        </Tagline>
        <Container>
          <ButtonLink to={"create"}>
            <MainButton key={"create"} variant={page === "create" && "primary"}>
              Create
            </MainButton>
          </ButtonLink>
          <ButtonLink to={"explore"}>
            <MainButton key={"explore"} variant={page === "explore" && "primary"}>
              Explore
            </MainButton>
          </ButtonLink>
          <ButtonLink to={"tools"}>
            <MainButton key={"tools"} variant={page === "tools" && "primary"}>
              Tools
            </MainButton>
          </ButtonLink>
          </Container>
          <Container>
            <div style={{ marginTop: '1rem', width: '100%' }}>
              <Widget src="${config_account}/widget/profile.links" props={{ accountId: "hyperfiles.near" }} />
            </div>
          </Container>
      </CardContent>
    </Card3D>
  </div>
);
