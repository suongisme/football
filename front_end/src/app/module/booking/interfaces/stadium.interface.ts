import { StadiumOption } from './stadium-option.interface';

export interface Stadium {
    name: string;
    numPeople: number;
    fromPrice: number;
    toPrice: number;
    province?: string;
    district?: string;
    flag?: string;
    avatar: string;
    options?: StadiumOption[];
}