import { DEMO_CREDENTIALS } from '../constants/app';
import { ENDPOINTS } from './endpoints';
import {
  getMockDb,
  mockCreate,
  mockDelete,
  mockGet,
  mockList,
  mockUpdate,
  setMockUser,
} from './mockStore';

function delay(ms = 280) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ok(data, status = 200) {
  return { data, status, statusText: 'OK', headers: { 'content-type': 'application/json' } };
}

function fail(status, message) {
  const error = new Error(message);
  error.response = { status, data: { message } };
  error.status = status;
  throw error;
}

function parseUrl(url = '') {
  const [path, queryString] = String(url).split('?');
  const query = {};
  if (queryString) {
    queryString.split('&').forEach((part) => {
      const [key, value] = part.split('=');
      query[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
  }
  return { path, query };
}

function bodyOf(config) {
  if (!config.data) {
    return {};
  }
  return typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
}

export async function handleMockRequest(config) {
  await delay();
  const method = String(config.method || 'get').toLowerCase();
  const { path, query } = parseUrl(config.url);
  const body = bodyOf(config);

  if (path === ENDPOINTS.LOGIN && method === 'post') {
    if (!body.email || !body.password) {
      fail(400, 'Email and password are required.');
    }
    if (body.password.length < 6) {
      fail(422, 'Password must be at least 6 characters.');
    }
    const db = getMockDb();
    const user = { ...db.user, email: body.email };
    return ok({
      token: `mock-token-${Date.now()}`,
      user,
    });
  }

  if (path === ENDPOINTS.FORGOT_PASSWORD && method === 'post') {
    if (!body.email) {
      fail(400, 'Email is required.');
    }
    return ok({ message: `Password reset instructions were sent to ${body.email}.` });
  }

  if (path === ENDPOINTS.LOGOUT && method === 'post') {
    return ok({ success: true });
  }

  if (path === ENDPOINTS.PROFILE && method === 'get') {
    return ok(getMockDb().user);
  }

  if (path === ENDPOINTS.PROFILE && method === 'put') {
    const user = await setMockUser(body);
    return ok(user);
  }

  if (path === ENDPOINTS.SETTINGS && method === 'put') {
    return ok(body);
  }

  if (path === ENDPOINTS.PROJECTS && method === 'get') {
    return ok(mockList('projects'));
  }

  if (path === ENDPOINTS.PROJECTS && method === 'post') {
    const project = await mockCreate('projects', body, 'proj');
    return ok(project, 201);
  }

  if (path.startsWith('/projects/') && method === 'get') {
    const project = mockGet('projects', path.split('/')[2]);
    if (!project) {
      fail(404, 'Project not found.');
    }
    return ok(project);
  }

  if (path.startsWith('/projects/') && method === 'put') {
    const project = await mockUpdate('projects', path.split('/')[2], body);
    if (!project) {
      fail(404, 'Project not found.');
    }
    return ok(project);
  }

  if (path.startsWith('/projects/') && method === 'delete') {
    const deleted = await mockDelete('projects', path.split('/')[2]);
    if (!deleted) {
      fail(404, 'Project not found.');
    }
    return ok({ success: true });
  }

  if (path === ENDPOINTS.PARTNERS && method === 'get') {
    return ok(mockList('partners', (item) => !item.isDeleted));
  }

  if (path === ENDPOINTS.PARTNERS && method === 'post') {
    const partner = await mockCreate('partners', { ...body, isDeleted: false }, 'partner');
    return ok(partner, 201);
  }

  if (path.startsWith('/partners/') && method === 'get') {
    const partner = mockGet('partners', path.split('/')[2]);
    if (!partner || partner.isDeleted) {
      fail(404, 'Partner not found.');
    }
    return ok(partner);
  }

  if (path.startsWith('/partners/') && method === 'put') {
    const partner = await mockUpdate('partners', path.split('/')[2], body);
    if (!partner) {
      fail(404, 'Partner not found.');
    }
    return ok(partner);
  }

  if (path.startsWith('/partners/') && method === 'delete') {
    const deleted = await mockDelete('partners', path.split('/')[2], true);
    if (!deleted) {
      fail(404, 'Partner not found.');
    }
    return ok({ success: true });
  }

  if (path === ENDPOINTS.PROJECT_PARTNERS && method === 'get') {
    const items = mockList('projectPartners', (item) => {
      if (query.projectId && item.projectId !== query.projectId) {
        return false;
      }
      if (query.partnerId && item.partnerId !== query.partnerId) {
        return false;
      }
      return true;
    });
    return ok(items);
  }

  if (path === ENDPOINTS.PROJECT_PARTNERS && method === 'post') {
    const item = await mockCreate('projectPartners', body, 'pp');
    return ok(item, 201);
  }

  if (path.startsWith('/project-partners/') && method === 'put') {
    const item = await mockUpdate('projectPartners', path.split('/')[2], body);
    if (!item) {
      fail(404, 'Assignment not found.');
    }
    return ok(item);
  }

  if (path.startsWith('/project-partners/') && method === 'delete') {
    const deleted = await mockDelete('projectPartners', path.split('/')[2]);
    if (!deleted) {
      fail(404, 'Assignment not found.');
    }
    return ok({ success: true });
  }

  if (path === ENDPOINTS.TRANSACTIONS && method === 'get') {
    const items = mockList('transactions', (item) => {
      if (query.projectId && item.projectId !== query.projectId) {
        return false;
      }
      if (query.type && item.type !== query.type) {
        return false;
      }
      return true;
    });
    return ok(items);
  }

  if (path === ENDPOINTS.TRANSACTIONS && method === 'post') {
    const item = await mockCreate('transactions', body, 'tx');
    return ok(item, 201);
  }

  if (path.startsWith('/transactions/') && method === 'delete') {
    const deleted = await mockDelete('transactions', path.split('/')[2]);
    if (!deleted) {
      fail(404, 'Transaction not found.');
    }
    return ok({ success: true });
  }

  if (path === ENDPOINTS.REPORTS && method === 'get') {
    return ok({
      generatedAt: new Date().toISOString(),
      preset: query.preset || 'this_year',
    });
  }

  if (path === ENDPOINTS.NOTIFICATIONS && method === 'get') {
    return ok(mockList('notifications'));
  }

  fail(404, `No mock handler for ${method.toUpperCase()} ${path}`);
}

export const DEMO_HINT = `${DEMO_CREDENTIALS.email} / ${DEMO_CREDENTIALS.password}`;
