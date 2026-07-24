import { handleProxySyncRoute } from '../../../../server/syncProxy';

export default {
  fetch(request: Request): Promise<Response> {
    return handleProxySyncRoute(request, 'snapshot/latest/download');
  },
};
