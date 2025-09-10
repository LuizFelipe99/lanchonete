
export interface usersAccess{
    data: any[];
    name?: string;
    login?: string;
    logou_em?: any; 
    request_status?: any; 
    user_ip?: any; 
    status_user?: any
    total_records?: any;
    total_pages?: any;
    page?: any;
}

export interface UserFilter{
  name?: string;
  login?: string;
    ip?: string; 
    user_status?: any
    dt_login_de?: any; 
    dt_logou_ate?: any; 
    per_page?: number;
    request?: any; 
}
