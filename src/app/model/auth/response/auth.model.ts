export interface LoginResponseModel {
    token?: string;
    name?: string;
    username?: string;
    email?: string;
    is_admin?: number;
    default_product?: any;
    walletData?: string[];
}