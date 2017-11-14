
const excludeMainStructureIf = ({ location, isOneOf }) => (
  location && isOneOf.find(route => location.pathname === route.path)
);

export default excludeMainStructureIf;
