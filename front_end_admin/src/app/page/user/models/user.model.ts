import { ResponseService } from "src/app/base/core/models/response.model";
import { ResponseServiceModel } from "src/app/base/core/models/search.model";

export interface UserModel {
    username: string;
    full_name: string;
    birthday: string;
    lastLogin: string;
    status: number;
    phone: string;
    address: string;
    role: RoleModel;
}

export interface RoleModel {
    id?: number;
    name: string;
}

export interface ResponseSearchUser extends ResponseServiceModel<UserModel> {
    
}