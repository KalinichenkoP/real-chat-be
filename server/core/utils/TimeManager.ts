export class TimeManager {
    private static dateToSeconds(date: Date): number {
        return Math.round(date.valueOf() / 1000);
    }

    static getUTCSeconds(date: Date | number | string): number {
        if (typeof date === "number") {
            return this.dateToSeconds(new Date(date));
        } else if (typeof date === "string") {
            return this.dateToSeconds(new Date(date));
        } else {
            return this.dateToSeconds(date);
        }
    }

    static extractDate(date: Date): string {
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
    }
}
