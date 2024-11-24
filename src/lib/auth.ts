'use server'

import { cookies } from 'next/headers';

export type Role = 'all' | 'devops' | 'ui';
export type AccessLevel = 'view' | 'edit';

export interface User {
  id: string;
  name: string;
  role: Role;
  accessLevel: AccessLevel;
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin User', role: 'all', accessLevel: 'edit' },
  { id: '2', name: 'DevOps Viewer', role: 'devops', accessLevel: 'view' },
  { id: '3', name: 'DevOps Editor', role: 'devops', accessLevel: 'edit' },
  { id: '4', name: 'UI Viewer', role: 'ui', accessLevel: 'view' },
  { id: '5', name: 'UI Editor', role: 'ui', accessLevel: 'edit' },
];

export async function getUser(): Promise<User | null> {
  const cookieDate = await cookies();
  const userId = cookieDate.get('userId')?.value;
  return MOCK_USERS.find(user => user.id === userId) || null;
}

export async function login(userId: string): Promise<void> {
  const user = MOCK_USERS.find(user => user.id === userId);
  if (!user) {
    throw new Error('User not found');
  }
  const cookieDate = await cookies();
  cookieDate.set('userId', userId);
}

export async function logout(): Promise<void> {
  const cookieDate = await cookies();
  cookieDate.delete('userId');
}

