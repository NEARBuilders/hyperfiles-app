const StyledButton = styled.button`
  all: unset;
  display: ${(props) => props.type === "icon" ? 'flex' : 'inline-flex'};
  width: ${(props) => props.type === "icon" ? '40px' : 'auto'};
  height: ${(props) => props.type === "icon" ? '40px' : 'auto'};
  padding: ${(props) => props.type === "icon" ? '0' : '10px 20px'};
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: ${(props) => props.type === "icon" ? '50%' : '8px'};
  font-size: 15px;
  letter-spacing: 2px;

  font-weight: 555;
  font-family: "Courier", sans-serif;
  background: ${(props) => props.isActive ? '#39f095' : `var(--button-${props.variant}-bg, #23242B)`};
  color: ${(props) => props.isActive ? '#000' : `var(--button-${props.variant}-color, #39f095)`};
  border: ${(props) => props.variant === "outline" ? '1px solid rgba(255, 255, 255, 0.20)' : 'none'};
  transition: background 300ms, color 300ms;

  &:hover:not(:disabled), &:focus {
    background: #39f095;
    color: #000;
  }


  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledNavbar = styled.div`
  width: 64px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15px 23px;
  width: 100%;

  background-color: #0b0c14;
  border-bottom: 1px solid var(--stroke-color, rgba(255, 255, 255, 0.2));
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    padding: 15px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.888rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    a {
      display: flex;
    }
  }
`;

const DesktopNavigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileNavigation = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;

const { href } = VM.require("${alias_builddao}/widget/lib.url") || {
  href: () => {},
};

const NavLink = ({ to, children }) => (
  <Link
    key={to}
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

const [showMenu, setShowMenu] = useState(false);
const toggleDropdown = () => setShowMenu(!showMenu);

const SignInOrConnect = () => (
  <>
    {context.accountId ? (
      <p className="m-2" style={{ color: "#39f095", fontSize: "16px", letterSpacing: "2px", fontFamily: "Courier, sans-serif"}}>Connected</p>
    ) : (
      <p className="m-2" style={{ color: "#39f095", fontSize: "16px", letterSpacing: "2px", fontFamily: "Courier, sans-serif"}}>Connect</p>
    )}
  </>
);

const Navbar = ({ page, routes, ...props }) => (
  <StyledNavbar>
    <div className="d-flex align-items-center justify-content-between w-100">
      <DesktopNavigation className="container-xl">
        <Link
          style={{ flex: 1 }}
          to={href({
            widgetSrc: "${config_account}/widget/app",
            params: {
              page: "home",
            },
          })}
        >
          <img
            style={{ width: 42, objectFit: "cover" }}
            src="https://builders.mypinata.cloud/ipfs/QmQuePz1JfSQ2jh9pDCh95rHeUvPSyDrddetaWJKDXaimZ"
            alt="Hyperfiles"
          />
        </Link>
        <ButtonGroup style={{ flex: 1 }}>
          {routes &&
            (Object.keys(routes) || []).map((k) => {
              const route = routes[k];
              if (route.hide) {
                return null;
              }
              return (
                <NavLink to={k}>
                  <StyledButton key={k} isActive={page === k}>
                    {route.init.icon && <i className={route.init.icon}></i>}
                    {route.init.name}
                  </StyledButton>
                </NavLink>
              );
            })}
        </ButtonGroup>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <SignInOrConnect />
        </div>
      </DesktopNavigation>
      <MobileNavigation>
        <Link
          to={href({
            widgetSrc: "${config_account}/widget/app",
            params: {
              page: "home",
            },
          })}
        >
          <img
            style={{ width: 39, objectFit: "cover" }}
            src="https://builders.mypinata.cloud/ipfs/QmQuePz1JfSQ2jh9pDCh95rHeUvPSyDrddetaWJKDXaimZ"
            alt="Hyperfiles"
          />
        </Link>
        <StyledButton
          type="icon"
          variant="outline"
          className="rounded-2"
          onClick={toggleDropdown}
        >
          <i style={{ fontSize: 24 }} className="bi bi-list"></i>
        </StyledButton>
      </MobileNavigation>
    </div>
    <MobileNavigation>
      {showMenu && (
        <div className="text-white w-100 d-flex flex-column gap-3 mt-3">
          <ButtonGroup className="align-items-stretch">
            {routes &&
              (Object.keys(routes) || []).map((k) => {
                const route = routes[k];
                if (route.hide) {
                  return null;
                }
                return (
                  <NavLink to={k} style={{ textDecoration: "none" }}>
                    <StyledButton
                      key={k}
                      variant={page === k && "primary"}
                      className="w-100"
                      onClick={() => setShowMenu(false)}
                    >
                      {route.init.icon && <i className={route.init.icon}></i>}
                      {route.init.name}
                    </StyledButton>
                  </NavLink>
                );
              })}
          </ButtonGroup>
          <div className="d-flex w-100 align-items-center gap-3 justify-content-center">
            <SignInOrConnect />
          </div>
        </div>
      )}
    </MobileNavigation>
  </StyledNavbar>
);

return <Navbar page={props.page} routes={props.routes} {...props} />;
