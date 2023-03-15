import { Request, Response } from "express";

const register = (req:Request, res:Response) => {
  res.send("Got a POST request");
}

export default { register }