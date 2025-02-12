export class ApiResponse<T>{
    success:boolean;
    data?:T;
    message?:string;
    error?:any;

    constructor(success:boolean, message?:string,data?:T, error?:any){
        this.success = success;
        this.data = data;
        this.message = message;
        this.error = error;
    }
}