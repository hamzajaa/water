export class DateUtils {

    public static pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }


    public static toDateWithHour(dateAsString: string) {
        if (dateAsString == null) {
            return '';
        } else {
            let daysAndHours = dateAsString.split(" ");
            let daysMonthandYear = daysAndHours[0].split("-");
            let hourMinuteSecond = daysAndHours[1].split(":");
            return new Date(parseInt(daysMonthandYear[2]), parseInt(daysMonthandYear[1]), parseInt(daysMonthandYear[0]), parseInt(hourMinuteSecond[0]), parseInt(hourMinuteSecond[1]), parseInt(hourMinuteSecond[2]));
        }
    }

    public static toDateWithoutHour(dateAsString: string) {
        if (dateAsString == null) {
            return '';
        } else {
            let daysAndHours = dateAsString.split(" ");
            let daysMonthandYear = daysAndHours[0].split("-");
            return new Date(parseInt(daysMonthandYear[2]), parseInt(daysMonthandYear[1]), parseInt(daysMonthandYear[0]));
        }
    }

    public static toString(date) {
        const dt = new Date(date);
        if (dt == null) {
            return '';
        } else {
            return dt.getFullYear() +
                '-' + this.pad(dt.getMonth() + 1) +
                '-' + this.pad(dt.getDate()) +
                'T' + this.pad(dt.getHours()) +
                ':' + this.pad(dt.getMinutes()) +
                ':' + this.pad(dt.getSeconds()) +
                '.' + (dt.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
                'Z';

        }

    }


    public static toDate(date: any): Date {
        if (date == null || Number.isNaN(date)) {
            return null;
        } else {
                return new Date(date.split('T')[0]);
        }
    }

    public static toDateForExcel(date: any): Date {
        if (date == null || Number.isNaN(date)) {
            return null;
        } else {
            const [day, month, year] = date.split('/');
            console.log("day" + day);
            console.log("month" + month);
            console.log("year" + year);

            return new Date(+year, +month - 1, +day);
        }
    }


}


