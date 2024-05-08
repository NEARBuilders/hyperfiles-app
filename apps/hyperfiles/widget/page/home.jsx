const { currentPath, page, ...passProps } = props;

const Card3D = styled.div`
  perspective: 1500px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const CardContent = styled.div`
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #000;
  padding: 2rem;
`;

const MainButton = styled.button`
margin: .3em;
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
        <CardContent>
          <h1
            className="display-4 font-weight-bold text-black mb-2"
            style={{
              textShadow:
                "1px 1px 1px rgba(0, 0, 0, 0.5), 4px 4px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            hyperfiles
          </h1>
          <p
            className="h5 text-success mb-4"
            style={{
              textShadow:
                "1px 1px 1px rgba(0, 0, 0, 0.5), 2px 2px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            organize everything
          </p>
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
        </CardContent>
        </Card3D>
  </div>
);
