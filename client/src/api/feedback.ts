import { request } from './client';
import type { Feedback, CreateFeedbackPayload } from '../types';

export function getFeedback(filters?: Record<string, string>) {
  const params = new URLSearchParams(filters);
  const query = params.toString();
  return request<Feedback[]>(`/feedback${query ? `?${query}` : ''}`);
}

export function getFeedbackById(id: number) {
  return request<Feedback>(`/feedback/${id}`);
}

export function createFeedback(data: CreateFeedbackPayload) {
  return request<Feedback>('/feedback', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
