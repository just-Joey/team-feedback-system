import { request } from './client';
import type { Team, CreateTeamPayload, TeamMember, AddTeamMemberPayload } from '../types';

export function getTeams() {
  return request<Team[]>('/teams');
}

export function getTeam(id: number) {
  return request<Team>(`/teams/${id}`);
}

export function createTeam(data: CreateTeamPayload) {
  return request<Team>('/teams', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function addTeamMember(teamId: number, data: AddTeamMemberPayload) {
  return request<TeamMember>(`/teams/${teamId}/members`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
