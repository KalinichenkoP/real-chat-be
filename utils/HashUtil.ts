import { createHmac } from "crypto";
import { genSaltSync, hashSync, compareSync } from "bcrypt";

export class HashUtil {
    static genToken(userId: number, salt: string): string {
        return createHmac("sha256", [userId, Date.now(), salt].join("/"))
            .digest("hex");
    }

    static hashPass(pass: string): string {
        return hashSync(pass, genSaltSync());
    }
}
