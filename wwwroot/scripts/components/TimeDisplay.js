export function ConvertStartTimeToLocal(utcDateTime) {
    const utcTimeString = new Date(`${utcDateTime} UTC`);
    return utcTimeString.toLocaleString();
}