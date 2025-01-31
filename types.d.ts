import { Connection } from "mongoose";

declare global{
    var mongoose:{ // in it always two things are possible to present either connection striung is there or none or attemped a connection request
        conn: Connection | null;
        promise: Promise<Connection> | null;


    }
}
export {};