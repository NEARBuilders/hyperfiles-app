const StyledButton = styled.button`
  all: unset;
  display: ${(props) => props.type === "icon" ? 'flex' : 'inline-flex'};
  width: ${(props) => props.type === "icon" ? '40px' : 'auto'};
  height: ${(props) => props.type === "icon" ? '40px' : 'auto'};
  padding: ${(props) => props.type === "icon" ? '0' : '10px 20px'};
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: ${(props) => props.type === "icon" ? '50%' : '8px'};
  font-size: ${(props) => props.type === "icon" ? '16px' : '14px'};
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  background: var(--button-${props.variant}-bg, #23242B);
  color: var(--button-${props.variant}-color, #CDD0D5);
  border: ${(props) => props.variant === "outline" ? '1px solid rgba(255, 255, 255, 0.20)' : 'none'};
  transition: background 300ms, color 300ms;
  
  &:hover:not(:disabled) {
    background: var(--button-${props.variant}-hover-bg, #17181c);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const SidebarContainer = styled.div`
  border-radius: 16px;
  border: 1px solid var(--stroke-color, rgba(255, 255, 255, 0.2));
  width: 100%;
  min-height: 80vh;
  display: flex;
  padding: 24px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 1rem;

  @media screen and (max-width: 768px) {
    border: 0px;
    flex-direction: row;
    overflow-x: auto;
    min-height: auto;
  }
`;

const ContentContainer = styled.div`
  grid-column: span 4 / span 4;
`;

const Sidebar = ({ currentPath, page, routes }) => (
  <>
    {routes &&
      (Object.keys(routes) || []).map((k) => {
        const route = routes[k];
        if (route.hide) {
          return null;
        }
        return (
          <StyledButton
            id={k}
            variant={page === k ? "primary" : "outline"}
            href={`${currentPath}&tab=${k}`}
            className={
              "justify-content-start fw-medium align-self-stretch w-100"
            }
            linkClassName={"d-flex w-100"}
            style={{
              fontSize: "14px",
              textDecoration: "none",
              cursor: "pointer",
              padding: "8px 12px",
              gap: "10px",
            }}
          >
            {route.init.icon && <i className={`bi ${route.init.icon} `} />}
            <span>{route.init.name}</span>
          </StyledButton>
        );
      })}
  </>
);

// Define the new component that follows the SidebarLayout pattern
function SidebarLayout({ currentPath, routes, page, children }) {
  return (
    <Container className="container-xl mt-md-3">
      <SidebarContainer>
        <Sidebar currentPath={currentPath} page={page} routes={routes} />
      </SidebarContainer>
      <ContentContainer key={page}>{children}</ContentContainer>
    </Container>
  );
}

return { SidebarLayout };
