export const daysBefore = (days: number): Date => {
    const today = new Date();
    const timeBeforeTimestampt = today.setDate(today.getDate() - days);
    const timeBefore = new Date(timeBeforeTimestampt);

    return timeBefore;
};

export const daysAfter = (days: number): Date => {
    const today = new Date();
    const timeAfterTimestamp = today.setDate(today.getDate() + days);
    const timeAfter = new Date(timeAfterTimestamp);

    return timeAfter;
};

export const generateRandomDate = (): Date => {
    return new Date(+new Date() - Math.floor(Math.random() * 10000000000));
};
