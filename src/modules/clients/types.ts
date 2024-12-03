export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  status: 'active' | 'completed' | 'on-hold';
}