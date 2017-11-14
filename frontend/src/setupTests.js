
import 'jest-enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

// ... OK to put here?
import 'isomorphic-fetch';

Enzyme.configure({ adapter: new Adapter() });
