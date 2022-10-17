import { Tree } from "src/app/core/interfaces/table.interface";

export interface Time extends Tree<Time> {
    time?: string;
    price?: number;
}