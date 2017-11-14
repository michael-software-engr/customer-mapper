
import lodash from 'lodash';

export default function statusCreator(args) {
  const { header, error } = args;

  return {
    ...args,
    header: header || (error ? 'Error' : 'Result')
  };
}

const keysToOmit = ['dismissed', 'success', 'error'];

export function areStatusesEqual(status0, status1) {
  return lodash.isEqual(
    lodash.omit(status0, keysToOmit),
    lodash.omit(status1, keysToOmit)
  );
}
