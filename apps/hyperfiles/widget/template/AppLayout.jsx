/**
 * This is a standard layout with a header, body, and a footer
 */

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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = ({ page, routes, ...props }) => (
  <Widget
    src="${config_account}/widget/navigation.Navbar"
    props={{ page, routes, ...props }}
  />
);

const Footer = (props) => {
  return <></>;
};

function AppLayout({ routes, page, children, ...props }) {
  return (
    <Container>
      <Header page={page} routes={routes} {...props} />
      <ContentContainer key={page}>{children}</ContentContainer>
      <Footer page={page} />
    </Container>
  );
}

return { AppLayout };
