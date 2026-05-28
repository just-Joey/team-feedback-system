export type UserRole = 'MANAGER' | 'MEMBER';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}

export interface TeamMember {
  id: number;
  userId: number;
  teamId: number;
  role: string;
  user?: User;
}

export interface Team {
  id: number;
  name: string;
  description: string | null;
  members?: TeamMember[];
}

export interface FeedbackCycle {
  id: number;
  name: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
}

export interface FeedbackTag {
  id: number;
  label: string;
  feedbackId: number;
}

export interface Feedback {
  id: number;
  createdAt: string;
  updatedAt: string;
  fromUserId: number;
  toUserId: number;
  teamId: number | null;
  feedbackCycleId: number | null;
  body: string;
  rating: number;
  fromUser?: User;
  toUser?: User;
  team?: Team | null;
  feedbackCycle?: FeedbackCycle | null;
  tags?: FeedbackTag[];
}

export interface CreateUserPayload {
  name: string;
  email: string;
  role: UserRole;
}

export interface CreateTeamPayload {
  name: string;
  description?: string;
}

export interface AddTeamMemberPayload {
  userId: number;
  role: string;
}

export interface CreateFeedbackPayload {
  fromUserId: number;
  toUserId: number;
  teamId?: number;
  feedbackCycleId?: number;
  body: string;
  rating: number;
  tags?: string[];
}
