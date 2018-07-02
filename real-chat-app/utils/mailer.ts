import * as mailer from 'nodemailer';
import { Transporter} from "nodemailer";
import {SentMessageInfo} from "nodemailer";
import {SendMailOptions} from "nodemailer";
import {config} from '../config/config';

export default class Mailer {
    private static SMTPConfig: any = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: config.mailer.user,
            pass: config.mailer.pass
        }
    };

    private static transporter
        : Transporter
        = mailer.createTransport ( Mailer.SMTPConfig );

    public static async send (options: SendMailOptions) : Promise<SentMessageInfo> {
        return await Mailer.transporter.sendMail(options);
    }
}

// {
//     to: 'shashkov.cr@gmail.com',
//         subject: 'Test',
//     html: '<b>hai</b>',
// }
