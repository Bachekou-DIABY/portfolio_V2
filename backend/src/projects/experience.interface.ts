export interface Experience {
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
    stats?: {
        label: string;
        value: string;
    }[];
}
