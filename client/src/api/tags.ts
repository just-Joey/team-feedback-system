import { request } from './client';
import type { FeedbackTag } from '../types';

export function getTags() {
  return request<FeedbackTag[]>('/tags');
}

export function deleteTag(id: number) {
  return request<FeedbackTag>(`/tags/${id}`, { method: 'DELETE' });
}
