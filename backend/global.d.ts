import 'express-serve-static-core'
    
export interface User {
  _id:string!;
  name:string!;
  email:string!;
  password:string;
  accountnumber:number!;
  agencynumber:number!;  
  balance:number!;
  createdAt: Date;
  updatedAt: Date;  
}

declare module 'express' {
  export interface Request {
    user?: User
  }
}