import {SendMailOptions} from 'nodemailer';
import {config} from '../../config/config';
import Mailer from '../mailer';
import * as _ from 'underscore';
import * as path from 'path';
import * as fs from 'fs';

// schemas describe different cases of notifying;
// each contains subject of the letter
// and name of file with letter template
const schemas = [{
    subject: 'CR Staff: welcome!',
    template: 'welcome'
}, {
    subject: 'CR Staff: new vacation request received',
    template: 'vacation-request-received'
}, {
    subject: 'CR Staff: your vacation request has received resolution',
    template: 'vacation-resolution'
}, {
    subject: 'CR Staff: your review is incoming',
    template: 'new-review-respondent'
}, {
    subject: 'CR Staff: review you are responsible for is coming',
    template: 'new-review-responsible'
}];

/**
 *
 */
export default class UserNotifier {
    private static readonly HEADER = fs.readFileSync(
        path.join(
            config.folders.notifierTemplates,
            'header.html'
        )
    ).toString();

    private static readonly FOOTER = fs.readFileSync(
        path.join(
            config.folders.notifierTemplates,
            'footer.html'
        )
    ).toString();

    // todo: get recipients as array ot Users
    public static async notify(recipients: string[], schemaIndex: number, options: any): Promise<void> {
        try {
            const template: string = fs.readFileSync(
                path.join(config.folders.notifierTemplates, `${schemas[schemaIndex].template}.html`)
            ).toString();

            options.header = _.template(UserNotifier.HEADER)();
            options.footer = _.template(UserNotifier.FOOTER)();
            options.URL = config.googleAuth.web.javascriptOrigins[1];
            options.MyVacRequestsURL = `http://hr-crm.dev.cleveroad.com/vacations/${options.requesterId}`;
            options.formatDate = UserNotifier.formatDate;

            const mailOptions: SendMailOptions = {
                to: recipients,
                subject: schemas[schemaIndex].subject,
                html: _.template(template)(options)
            };

            await Mailer.send(mailOptions);

            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }
    public static formatDate(date: Date) {
        const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${date.getDate()} ${monthes[date.getMonth()]} ${date.getFullYear()}`;
    }
}
