export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  images?: string[];
  type?: 'pro' | 'academic' | 'personal';
  featured?: boolean;
  impact?: {
    label: string;
    value: string;
  }[];
  technologies?: string[];
  longDescription?: string;
}
