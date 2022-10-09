import { StadiumOption } from './stadium-option.interface';

export interface Stadium {
    name: string;
    numPeople: number;
    fromPrice: number;
    toPrice: number;
    avatar: string;
    options?: StadiumOption[];
}