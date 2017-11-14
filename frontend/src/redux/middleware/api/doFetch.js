
import { CALL_API } from './index';

export default function doFetch({
  apiRoot,
  endpoint,
  types,
  payload,
  method,
  headers = {}
}) {
  const defaultHeader = { 'Content-Type': 'application/json' };

  const requestOptions = { headers: { ...defaultHeader, ...headers } };

  if (method) requestOptions.method = method;
  if (payload) requestOptions.body = JSON.stringify(payload);

  return {
    [CALL_API]: {
      // schema: !!NO SCHEMA, free form data!!,
      types,
      apiRoot,
      endpoint,
      requestOptions
    }
  };
}
