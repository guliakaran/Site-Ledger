import { createSeedDatabase } from '../data/mockData';
import { STORAGE_KEYS } from '../constants/storage';
import { storageService } from '../services/storageService';
import { nowIso } from '../utils/date';

let db = createSeedDatabase();
let ready = false;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function initMockStore() {
  if (ready) {
    return db;
  }
  const cached = await storageService.getJSON(STORAGE_KEYS.MOCK_DB, null);
  if (cached?.projects && cached?.partners && cached?.transactions) {
    db = cached;
  } else {
    db = createSeedDatabase();
    await persistMockStore();
  }
  ready = true;
  return db;
}

export async function persistMockStore() {
  await storageService.setJSON(STORAGE_KEYS.MOCK_DB, db);
}

export function getMockDb() {
  return db;
}

export function resetMockStore() {
  db = createSeedDatabase();
  ready = true;
  return persistMockStore();
}

function nextId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function mockList(collection, predicate) {
  const items = db[collection] || [];
  return clone(predicate ? items.filter(predicate) : items);
}

export function mockGet(collection, id) {
  const item = (db[collection] || []).find((row) => row.id === id);
  return item ? clone(item) : null;
}

export async function mockCreate(collection, payload, prefix) {
  const item = {
    ...payload,
    id: payload.id || nextId(prefix),
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  db[collection] = [item, ...(db[collection] || [])];
  await persistMockStore();
  return clone(item);
}

export async function mockUpdate(collection, id, payload) {
  const index = (db[collection] || []).findIndex((row) => row.id === id);
  if (index === -1) {
    return null;
  }
  db[collection][index] = {
    ...db[collection][index],
    ...payload,
    id,
    updatedAt: nowIso(),
  };
  await persistMockStore();
  return clone(db[collection][index]);
}

export async function mockDelete(collection, id, soft = false) {
  const index = (db[collection] || []).findIndex((row) => row.id === id);
  if (index === -1) {
    return false;
  }
  if (soft) {
    db[collection][index] = { ...db[collection][index], isDeleted: true, updatedAt: nowIso() };
  } else {
    db[collection] = db[collection].filter((row) => row.id !== id);
  }
  await persistMockStore();
  return true;
}

export function setMockUser(user) {
  db.user = { ...db.user, ...user, updatedAt: nowIso() };
  return persistMockStore().then(() => clone(db.user));
}
