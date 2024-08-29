
export interface CustomerProps {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
}