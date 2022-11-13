import { Request } from "express";

export interface RequestTypes extends Request {
  user: any;
}
