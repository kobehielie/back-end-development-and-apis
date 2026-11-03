import fs from 'fs';
import path from 'path';

export const DB_PATH = path.join(import.meta.dirname, '../data/users.json');

export const readUsers = () => {
  const fileContent = fs.readFileSync(DB_PATH, 'utf-8').trim();
  if (!fileContent) {
    return [];
  }
  return JSON.parse(fileContent);
};

export const writeUsers = (users) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
};

export const findByEmail = (email) => {
  return readUsers().find((u) => u.email === email) || null;
};

export const findById = (id) => {
  return readUsers().find((u) => u.id === id) || null;
};