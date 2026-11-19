export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  city: string;
}
