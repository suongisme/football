import { Tree } from 'src/app/core/interfaces/table.interface';

export interface Battle extends Tree<Battle> {
    name?: string;
    time?: string;
    price?: number;
}