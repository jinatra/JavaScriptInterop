export function ConvertStartTimeToLocal(utcDateTime) {
    const utcTimeString = new Date(`${utcDateTime}`);
    return utcTimeString.toLocaleString();
}