import { request } from './client';
import type { User, CreateUserPayload } from '../types';

export function getUsers() {
  return request<User[]>('/users');
}

export function getUser(id: number) {
  return request<User>(`/users/${id}`);
}

export function createUser(data: CreateUserPayload) {
  return request<User>('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateUser(id: number, data: Partial<CreateUserPayload>) {
  return request<User>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteUser(id: number) {
  return request<User>(`/users/${id}`, { method: 'DELETE' });
}
