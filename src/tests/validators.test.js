const { isValidDate } = require('../validators');

describe('Is Valid Date', () => {
    it('Should return false for dates before 2005', () => {
        expect(isValidDate('01/01/2004')).toBeFalsy();
    });

    it('Should return false for year after actual year', () => {
        const nextYear = new Date().getFullYear() + 1;
        expect(isValidDate(`01/01/${nextYear}`)).toBeFalsy();
    });

    it('Should return false for invalid month', () => {
        expect(isValidDate(`13/01/2022`)).toBeFalsy();
    });

    it('Should return false for invalid day', () => {
        expect(isValidDate(`12/32/2021`)).toBeFalsy();
    });

    it('Should return false for future date', () => {
        expect(isValidDate(`12/12/2022`)).toBeFalsy();
    });

    it('Should return false for february with 29 days', () => {
        expect(isValidDate(`02/29/2021`)).toBeFalsy();
    });

    it('Should return true for february with 29 days on leap year', () => {
        expect(isValidDate(`02/29/2020`)).toBeTruthy();
    });
})