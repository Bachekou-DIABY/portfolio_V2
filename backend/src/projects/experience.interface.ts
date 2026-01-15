export interface Experience {
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
    impact?: {
        label: string;
        value: string;
    }[];
}
