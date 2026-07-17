export type Role = 'founder' | 'investor' | 'provider';
export type SportType = 'padel' | 'golf' | 'barre' | 'tennis';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type MatchStatus = 'pending' | 'accepted' | 'declined';

export interface Profile {
  id: string; // UUID from auth.users
  full_name: string;
  role: Role;
  business_goal: string;
  company_name?: string;
  linkedin_url?: string;
  avatar_url?: string;
  premium_status: boolean;
}

export interface SportsProfile {
  id: string; // UUID
  profile_id: string; // FK to profiles
  sport_type: SportType;
  skill_level: SkillLevel;
}

export interface RetasEvent {
  id: string; // UUID
  creator_id: string; // FK to profiles
  title: string;
  description?: string;
  sport_type: SportType;
  location: string;
  event_date: string; // ISO DateTime
  max_players: number;
  current_players_count: number;
}

export interface Match {
  id: string; // UUID
  user_1: string; // FK to profiles
  user_2: string; // FK to profiles
  status: MatchStatus;
  created_at: string; // ISO DateTime
}

export interface Message {
  id: string; // UUID
  chat_id: string; // UUID
  sender_id: string; // FK to profiles
  text: string;
  created_at: string; // ISO DateTime
}
