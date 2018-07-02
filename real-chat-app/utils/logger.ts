export default class Logger {
    public static readonly INFO = 'Info';
    public static readonly WARNING = 'Warning';
    public static readonly ERROR = 'Error';

    public static log (prefix: string, message: string) {
        console.log(`${prefix}: ${message}`);
    }
}
