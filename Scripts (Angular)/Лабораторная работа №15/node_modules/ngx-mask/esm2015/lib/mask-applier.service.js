/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { config } from './config';
export class MaskApplierService {
    /**
     * @param {?} _config
     */
    constructor(_config) {
        this._config = _config;
        this.maskExpression = '';
        this.actualValue = '';
        this.shownMaskExpression = '';
        this._formatWithSeparators = (/**
         * @param {?} str
         * @param {?} thousandSeparatorChar
         * @param {?} decimalChar
         * @param {?} precision
         * @return {?}
         */
        (str, thousandSeparatorChar, decimalChar, precision) => {
            /** @type {?} */
            const x = str.split(decimalChar);
            /** @type {?} */
            const decimals = x.length > 1 ? `${decimalChar}${x[1]}` : '';
            /** @type {?} */
            let res = x[0];
            /** @type {?} */
            const separatorLimit = this.separatorLimit.replace(/\s/g, '');
            if (separatorLimit && +separatorLimit) {
                res = res.slice(0, separatorLimit.length);
            }
            /** @type {?} */
            const rgx = /(\d+)(\d{3})/;
            while (rgx.test(res)) {
                res = res.replace(rgx, '$1' + thousandSeparatorChar + '$2');
            }
            if (precision === undefined) {
                return res + decimals;
            }
            else if (precision === 0) {
                return res;
            }
            return res + decimals.substr(0, precision + 1);
        });
        this.percentage = (/**
         * @param {?} str
         * @return {?}
         */
        (str) => {
            return Number(str) >= 0 && Number(str) <= 100;
        });
        this.getPrecision = (/**
         * @param {?} maskExpression
         * @return {?}
         */
        (maskExpression) => {
            /** @type {?} */
            const x = maskExpression.split('.');
            if (x.length > 1) {
                return Number(x[x.length - 1]);
            }
            return Infinity;
        });
        this.checkInputPrecision = (/**
         * @param {?} inputValue
         * @param {?} precision
         * @param {?} decimalMarker
         * @return {?}
         */
        (inputValue, precision, decimalMarker) => {
            if (precision < Infinity) {
                /** @type {?} */
                const precisionRegEx = new RegExp(this._charToRegExpExpression(decimalMarker) + `\\d{${precision}}.*$`);
                /** @type {?} */
                const precisionMatch = inputValue.match(precisionRegEx);
                if (precisionMatch && precisionMatch[0].length - 1 > precision) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
                else if (precision === 0 && inputValue.endsWith(decimalMarker)) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
            }
            return inputValue;
        });
        this._shift = new Set();
        this.clearIfNotMatch = this._config.clearIfNotMatch;
        this.dropSpecialCharacters = this._config.dropSpecialCharacters;
        this.maskSpecialCharacters = this._config.specialCharacters;
        this.maskAvailablePatterns = this._config.patterns;
        this.prefix = this._config.prefix;
        this.suffix = this._config.suffix;
        this.thousandSeparator = this._config.thousandSeparator;
        this.decimalMarker = this._config.decimalMarker;
        this.hiddenInput = this._config.hiddenInput;
        this.showMaskTyped = this._config.showMaskTyped;
        this.placeHolderCharacter = this._config.placeHolderCharacter;
        this.validation = this._config.validation;
        this.separatorLimit = this._config.separatorLimit;
    }
    /**
     * @param {?} inputValue
     * @param {?} maskAndPattern
     * @return {?}
     */
    applyMaskWithPattern(inputValue, maskAndPattern) {
        const [mask, customPattern] = maskAndPattern;
        this.customPattern = customPattern;
        return this.applyMask(inputValue, mask);
    }
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    applyMask(inputValue, maskExpression, position = 0, cb = (/**
     * @return {?}
     */
    () => { })) {
        if (inputValue === undefined || inputValue === null || maskExpression === undefined) {
            return '';
        }
        /** @type {?} */
        let cursor = 0;
        /** @type {?} */
        let result = '';
        /** @type {?} */
        let multi = false;
        /** @type {?} */
        let backspaceShift = false;
        /** @type {?} */
        let shift = 1;
        /** @type {?} */
        let stepBack = false;
        if (inputValue.slice(0, this.prefix.length) === this.prefix) {
            inputValue = inputValue.slice(this.prefix.length, inputValue.length);
        }
        if (!!this.suffix && inputValue.endsWith(this.suffix)) {
            inputValue = inputValue.slice(0, inputValue.length - this.suffix.length);
        }
        /** @type {?} */
        const inputArray = inputValue.toString().split('');
        if (maskExpression === 'IP') {
            this.ipError = !!(inputArray.filter((/**
             * @param {?} i
             * @return {?}
             */
            (i) => i === '.')).length < 3 && inputArray.length < 7);
            maskExpression = '099.099.099.099';
        }
        if (maskExpression.startsWith('percent')) {
            if (inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/)) {
                inputValue = this._stripToDecimal(inputValue);
                /** @type {?} */
                const precision = this.getPrecision(maskExpression);
                inputValue = this.checkInputPrecision(inputValue, precision, '.');
            }
            if (inputValue.indexOf('.') > 0 && !this.percentage(inputValue.substring(0, inputValue.indexOf('.')))) {
                /** @type {?} */
                const base = inputValue.substring(0, inputValue.indexOf('.') - 1);
                inputValue = `${base}${inputValue.substring(inputValue.indexOf('.'), inputValue.length)}`;
            }
            if (this.percentage(inputValue)) {
                result = inputValue;
            }
            else {
                result = inputValue.substring(0, inputValue.length - 1);
            }
        }
        else if (maskExpression.startsWith('separator')) {
            if (inputValue.match('[wа-яА-Я]') ||
                inputValue.match('[ЁёА-я]') ||
                inputValue.match('[a-z]|[A-Z]') ||
                inputValue.match(/[-@#!$%\\^&*()_£¬'+|~=`{}\[\]:";<>.?\/]/) ||
                inputValue.match('[^A-Za-z0-9,]')) {
                inputValue = this._stripToDecimal(inputValue);
            }
            inputValue =
                inputValue.length > 1 && inputValue[0] === '0' && inputValue[1] !== this.decimalMarker
                    ? inputValue.slice(1, inputValue.length)
                    : inputValue;
            // TODO: we had different rexexps here for the different cases... but tests dont seam to bother - check this
            //  separator: no COMMA, dot-sep: no SPACE, COMMA OK, comma-sep: no SPACE, COMMA OK
            /** @type {?} */
            const thousandSeperatorCharEscaped = this._charToRegExpExpression(this.thousandSeparator);
            /** @type {?} */
            const decimalMarkerEscaped = this._charToRegExpExpression(this.decimalMarker);
            /** @type {?} */
            const invalidChars = '@#!$%^&*()_+|~=`{}\\[\\]:\\s,";<>?\\/'
                .replace(thousandSeperatorCharEscaped, '')
                .replace(decimalMarkerEscaped, '');
            /** @type {?} */
            const invalidCharRegexp = new RegExp('[' + invalidChars + ']');
            if (inputValue.match(invalidCharRegexp)) {
                inputValue = inputValue.substring(0, inputValue.length - 1);
            }
            /** @type {?} */
            const precision = this.getPrecision(maskExpression);
            inputValue = this.checkInputPrecision(inputValue, precision, this.decimalMarker);
            /** @type {?} */
            const strForSep = inputValue.replace(new RegExp(thousandSeperatorCharEscaped, 'g'), '');
            result = this._formatWithSeparators(strForSep, this.thousandSeparator, this.decimalMarker, precision);
            /** @type {?} */
            const commaShift = result.indexOf(',') - inputValue.indexOf(',');
            /** @type {?} */
            const shiftStep = result.length - inputValue.length;
            if (shiftStep > 0 && result[position] !== ',') {
                backspaceShift = true;
                /** @type {?} */
                let _shift = 0;
                do {
                    this._shift.add(position + _shift);
                    _shift++;
                } while (_shift < shiftStep);
            }
            else if ((commaShift !== 0 && position > 0 && !(result.indexOf(',') >= position && position > 3)) ||
                (!(result.indexOf('.') >= position && position > 3) && shiftStep <= 0)) {
                this._shift.clear();
                backspaceShift = true;
                shift = shiftStep;
                position += shiftStep;
                this._shift.add(position);
            }
            else {
                this._shift.clear();
            }
        }
        else {
            for (
            // tslint:disable-next-line
            let i = 0, inputSymbol = inputArray[0]; i < inputArray.length; i++, inputSymbol = inputArray[i]) {
                if (cursor === maskExpression.length) {
                    break;
                }
                if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '?') {
                    result += inputSymbol;
                    cursor += 2;
                }
                else if (maskExpression[cursor + 1] === '*' &&
                    multi &&
                    this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                    multi = false;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '*') {
                    result += inputSymbol;
                    multi = true;
                }
                else if (maskExpression[cursor + 1] === '?' &&
                    this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) ||
                    (this.hiddenInput &&
                        this.maskAvailablePatterns[maskExpression[cursor]] &&
                        this.maskAvailablePatterns[maskExpression[cursor]].symbol === inputSymbol)) {
                    if (maskExpression[cursor] === 'H') {
                        if (Number(inputSymbol) > 2) {
                            cursor += 1;
                            /** @type {?} */
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'h') {
                        if (result === '2' && Number(inputSymbol) > 3) {
                            cursor += 1;
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'm') {
                        if (Number(inputSymbol) > 5) {
                            cursor += 1;
                            /** @type {?} */
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 's') {
                        if (Number(inputSymbol) > 5) {
                            cursor += 1;
                            /** @type {?} */
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    /** @type {?} */
                    const daysCount = 31;
                    if (maskExpression[cursor] === 'd') {
                        if (Number(inputValue.slice(cursor, cursor + 2)) > daysCount || inputValue[cursor + 1] === '/') {
                            cursor += 1;
                            /** @type {?} */
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'M') {
                        /** @type {?} */
                        const monthsCount = 12;
                        // mask without day
                        /** @type {?} */
                        const withoutDays = cursor === 0 &&
                            (Number(inputSymbol) > 2 ||
                                Number(inputValue.slice(cursor, cursor + 2)) > monthsCount ||
                                inputValue[cursor + 1] === '/');
                        // day<10 && month<12 for input
                        /** @type {?} */
                        const day1monthInput = inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            ((inputValue[cursor - 2] === '/' &&
                                (Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount && inputValue[cursor] !== '/')) ||
                                inputValue[cursor] === '/' ||
                                ((inputValue[cursor - 3] === '/' &&
                                    (Number(inputValue.slice(cursor - 2, cursor)) > monthsCount && inputValue[cursor - 1] !== '/')) ||
                                    inputValue[cursor - 1] === '/'));
                        // 10<day<31 && month<12 for input
                        /** @type {?} */
                        const day2monthInput = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            inputValue[cursor - 1] === '/' &&
                            (Number(inputValue.slice(cursor, cursor + 2)) > monthsCount || inputValue[cursor + 1] === '/');
                        // day<10 && month<12 for paste whole data
                        /** @type {?} */
                        const day1monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) > daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            (!inputValue.slice(cursor - 2, cursor).includes('/') &&
                                Number(inputValue.slice(cursor - 2, cursor)) > monthsCount);
                        // 10<day<31 && month<12 for paste whole data
                        /** @type {?} */
                        const day2monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            inputValue[cursor - 1] !== '/' &&
                            Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount;
                        if (withoutDays || day1monthInput || day2monthInput || day1monthPaste || day2monthPaste) {
                            cursor += 1;
                            /** @type {?} */
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    result += inputSymbol;
                    cursor++;
                }
                else if (this.maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
                    result += maskExpression[cursor];
                    cursor++;
                    /** @type {?} */
                    const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                    this._shift.add(shiftStep + this.prefix.length || 0);
                    i--;
                }
                else if (this.maskSpecialCharacters.indexOf(inputSymbol) > -1 &&
                    this.maskAvailablePatterns[maskExpression[cursor]] &&
                    this.maskAvailablePatterns[maskExpression[cursor]].optional) {
                    if (!!inputArray[cursor] && maskExpression !== '099.099.099.099') {
                        result += inputArray[cursor];
                    }
                    cursor++;
                    i--;
                }
                else if (this.maskExpression[cursor + 1] === '*' &&
                    this._findSpecialChar(this.maskExpression[cursor + 2]) &&
                    this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] &&
                    multi) {
                    cursor += 3;
                    result += inputSymbol;
                }
                else if (this.maskExpression[cursor + 1] === '?' &&
                    this._findSpecialChar(this.maskExpression[cursor + 2]) &&
                    this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] &&
                    multi) {
                    cursor += 3;
                    result += inputSymbol;
                }
                else if (this.showMaskTyped && this.maskSpecialCharacters.indexOf(inputSymbol) < 0 && inputSymbol !== this.placeHolderCharacter) {
                    stepBack = true;
                }
            }
        }
        if (result.length + 1 === maskExpression.length &&
            this.maskSpecialCharacters.indexOf(maskExpression[maskExpression.length - 1]) !== -1) {
            result += maskExpression[maskExpression.length - 1];
        }
        /** @type {?} */
        let newPosition = position + 1;
        while (this._shift.has(newPosition)) {
            shift++;
            newPosition++;
        }
        /** @type {?} */
        let actualShift = this._shift.has(position) ? shift : 0;
        if (stepBack) {
            actualShift--;
        }
        cb(actualShift, backspaceShift);
        if (shift < 0) {
            this._shift.clear();
        }
        /** @type {?} */
        let res = `${this.prefix}${result}${this.suffix}`;
        if (result.length === 0) {
            res = `${this.prefix}${result}`;
        }
        return res;
    }
    /**
     * @param {?} inputSymbol
     * @return {?}
     */
    _findSpecialChar(inputSymbol) {
        return this.maskSpecialCharacters.find((/**
         * @param {?} val
         * @return {?}
         */
        (val) => val === inputSymbol));
    }
    /**
     * @protected
     * @param {?} inputSymbol
     * @param {?} maskSymbol
     * @return {?}
     */
    _checkSymbolMask(inputSymbol, maskSymbol) {
        this.maskAvailablePatterns = this.customPattern ? this.customPattern : this.maskAvailablePatterns;
        return (this.maskAvailablePatterns[maskSymbol] &&
            this.maskAvailablePatterns[maskSymbol].pattern &&
            this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol));
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    _stripToDecimal(str) {
        return str
            .split('')
            .filter((/**
         * @param {?} i
         * @return {?}
         */
        (i) => i.match('\\d') || i === '.' || i === ','))
            .join('');
    }
    /**
     * @private
     * @param {?} char
     * @return {?}
     */
    _charToRegExpExpression(char) {
        /** @type {?} */
        const charsToEscape = '[\\^$.|?*+()';
        return char === ' ' ? '\\s' : charsToEscape.indexOf(char) >= 0 ? '\\' + char : char;
    }
}
MaskApplierService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MaskApplierService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [config,] }] }
];
if (false) {
    /** @type {?} */
    MaskApplierService.prototype.dropSpecialCharacters;
    /** @type {?} */
    MaskApplierService.prototype.hiddenInput;
    /** @type {?} */
    MaskApplierService.prototype.showTemplate;
    /** @type {?} */
    MaskApplierService.prototype.clearIfNotMatch;
    /** @type {?} */
    MaskApplierService.prototype.maskExpression;
    /** @type {?} */
    MaskApplierService.prototype.actualValue;
    /** @type {?} */
    MaskApplierService.prototype.shownMaskExpression;
    /** @type {?} */
    MaskApplierService.prototype.maskSpecialCharacters;
    /** @type {?} */
    MaskApplierService.prototype.maskAvailablePatterns;
    /** @type {?} */
    MaskApplierService.prototype.prefix;
    /** @type {?} */
    MaskApplierService.prototype.suffix;
    /** @type {?} */
    MaskApplierService.prototype.thousandSeparator;
    /** @type {?} */
    MaskApplierService.prototype.decimalMarker;
    /** @type {?} */
    MaskApplierService.prototype.customPattern;
    /** @type {?} */
    MaskApplierService.prototype.ipError;
    /** @type {?} */
    MaskApplierService.prototype.showMaskTyped;
    /** @type {?} */
    MaskApplierService.prototype.placeHolderCharacter;
    /** @type {?} */
    MaskApplierService.prototype.validation;
    /** @type {?} */
    MaskApplierService.prototype.separatorLimit;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype._shift;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype._formatWithSeparators;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype.percentage;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype.getPrecision;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype.checkInputPrecision;
    /**
     * @type {?}
     * @protected
     */
    MaskApplierService.prototype._config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay1hcHBsaWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImxpYi9tYXNrLWFwcGxpZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLE1BQU0sRUFBVyxNQUFNLFVBQVUsQ0FBQztBQUczQyxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBdUI3QixZQUE2QyxPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBbEJ0RCxtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6Qix3QkFBbUIsR0FBVyxFQUFFLENBQUM7UUFpVmhDLDBCQUFxQjs7Ozs7OztRQUFHLENBQzlCLEdBQVcsRUFDWCxxQkFBNkIsRUFDN0IsV0FBbUIsRUFDbkIsU0FBaUIsRUFDakIsRUFBRTs7a0JBQ0ksQ0FBQyxHQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDOztrQkFDcEMsUUFBUSxHQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Z0JBQ2hFLEdBQUcsR0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztrQkFDaEIsY0FBYyxHQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDckUsSUFBSSxjQUFjLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3JDLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDM0M7O2tCQUNLLEdBQUcsR0FBVyxjQUFjO1lBQ2xDLE9BQU8sR0FBRyxDQUFD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LGtEQUE4RDs7SUFDOUQsd0NBQXlDOztJQUN6Qyw0Q0FBaUQ7Ozs7O0lBRWpELG9DQUE2Qjs7Ozs7SUFtVTdCLG1EQXVCRTs7Ozs7SUFFRix3Q0FFRTs7Ozs7SUFFRiwwQ0FPRTs7Ozs7SUFFRixpREFnQkU7Ozs7O0lBdlhpQixxQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29uZmlnLCBJQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFza0FwcGxpZXJTZXJ2aWNlIHtcbiAgcHVibGljIGRyb3BTcGVjaWFsQ2hhcmFjdGVyczogSUNvbmZpZ1snZHJvcFNwZWNpYWxDaGFyYWN0ZXJzJ107XG4gIHB1YmxpYyBoaWRkZW5JbnB1dDogSUNvbmZpZ1snaGlkZGVuSW5wdXQnXTtcbiAgcHVibGljIHNob3dUZW1wbGF0ZSE6IElDb25maWdbJ3Nob3dUZW1wbGF0ZSddO1xuICBwdWJsaWMgY2xlYXJJZk5vdE1hdGNoITogSUNvbmZpZ1snY2xlYXJJZk5vdE1hdGNoJ107XG4gIHB1YmxpYyBtYXNrRXhwcmVzc2lvbjogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBhY3R1YWxWYWx1ZTogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBzaG93bk1hc2tFeHByZXNzaW9uOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIG1hc2tTcGVjaWFsQ2hhcmFjdGVycyE6IElDb25maWdbJ3NwZWNpYWxDaGFyYWN0ZXJzJ107XG4gIHB1YmxpYyBtYXNrQXZhaWxhYmxlUGF0dGVybnMhOiBJQ29uZmlnWydwYXR0ZXJucyddO1xuICBwdWJsaWMgcHJlZml4ITogSUNvbmZpZ1sncHJlZml4J107XG4gIHB1YmxpYyBzdWZmaXghOiBJQ29uZmlnWydzdWZmaXgnXTtcbiAgcHVibGljIHRob3VzYW5kU2VwYXJhdG9yITogSUNvbmZpZ1sndGhvdXNhbmRTZXBhcmF0b3InXTtcbiAgcHVibGljIGRlY2ltYWxNYXJrZXIhOiBJQ29uZmlnWydkZWNpbWFsTWFya2VyJ107XG4gIHB1YmxpYyBjdXN0b21QYXR0ZXJuITogSUNvbmZpZ1sncGF0dGVybnMnXTtcbiAgcHVibGljIGlwRXJyb3I/OiBib29sZWFuO1xuICBwdWJsaWMgc2hvd01hc2tUeXBlZCE6IElDb25maWdbJ3Nob3dNYXNrVHlwZWQnXTtcbiAgcHVibGljIHBsYWNlSG9sZGVyQ2hhcmFjdGVyITogSUNvbmZpZ1sncGxhY2VIb2xkZXJDaGFyYWN0ZXInXTtcbiAgcHVibGljIHZhbGlkYXRpb246IElDb25maWdbJ3ZhbGlkYXRpb24nXTtcbiAgcHVibGljIHNlcGFyYXRvckxpbWl0OiBJQ29uZmlnWydzZXBhcmF0b3JMaW1pdCddO1xuXG4gIHByaXZhdGUgX3NoaWZ0ITogU2V0PG51bWJlcj47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKEBJbmplY3QoY29uZmlnKSBwcm90ZWN0ZWQgX2NvbmZpZzogSUNvbmZpZykge1xuICAgIHRoaXMuX3NoaWZ0ID0gbmV3IFNldCgpO1xuICAgIHRoaXMuY2xlYXJJZk5vdE1hdGNoID0gdGhpcy5fY29uZmlnLmNsZWFySWZOb3RNYXRjaDtcbiAgICB0aGlzLmRyb3BTcGVjaWFsQ2hhcmFjdGVycyA9IHRoaXMuX2NvbmZpZy5kcm9wU3BlY2lhbENoYXJhY3RlcnM7XG4gICAgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMgPSB0aGlzLl9jb25maWcuc3BlY2lhbENoYXJhY3RlcnM7XG4gICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnMgPSB0aGlzLl9jb25maWcucGF0dGVybnM7XG4gICAgdGhpcy5wcmVmaXggPSB0aGlzLl9jb25maWcucHJlZml4O1xuICAgIHRoaXMuc3VmZml4ID0gdGhpcy5fY29uZmlnLnN1ZmZpeDtcbiAgICB0aGlzLnRob3VzYW5kU2VwYXJhdG9yID0gdGhpcy5fY29uZmlnLnRob3VzYW5kU2VwYXJhdG9yO1xuICAgIHRoaXMuZGVjaW1hbE1hcmtlciA9IHRoaXMuX2NvbmZpZy5kZWNpbWFsTWFya2VyO1xuICAgIHRoaXMuaGlkZGVuSW5wdXQgPSB0aGlzLl9jb25maWcuaGlkZGVuSW5wdXQ7XG4gICAgdGhpcy5zaG93TWFza1R5cGVkID0gdGhpcy5fY29uZmlnLnNob3dNYXNrVHlwZWQ7XG4gICAgdGhpcy5wbGFjZUhvbGRlckNoYXJhY3RlciA9IHRoaXMuX2NvbmZpZy5wbGFjZUhvbGRlckNoYXJhY3RlcjtcbiAgICB0aGlzLnZhbGlkYXRpb24gPSB0aGlzLl9jb25maWcudmFsaWRhdGlvbjtcbiAgICB0aGlzLnNlcGFyYXRvckxpbWl0ID0gdGhpcy5fY29uZmlnLnNlcGFyYXRvckxpbWl0O1xuICB9XG5cbiAgcHVibGljIGFwcGx5TWFza1dpdGhQYXR0ZXJuKGlucHV0VmFsdWU6IHN0cmluZywgbWFza0FuZFBhdHRlcm46IFtzdHJpbmcsIElDb25maWdbJ3BhdHRlcm5zJ11dKTogc3RyaW5nIHtcbiAgICBjb25zdCBbbWFzaywgY3VzdG9tUGF0dGVybl0gPSBtYXNrQW5kUGF0dGVybjtcbiAgICB0aGlzLmN1c3RvbVBhdHRlcm4gPSBjdXN0b21QYXR0ZXJuO1xuICAgIHJldHVybiB0aGlzLmFwcGx5TWFzayhpbnB1dFZhbHVlLCBtYXNrKTtcbiAgfVxuICBwdWJsaWMgYXBwbHlNYXNrKGlucHV0VmFsdWU6IHN0cmluZywgbWFza0V4cHJlc3Npb246IHN0cmluZywgcG9zaXRpb246IG51bWJlciA9IDAsIGNiOiBGdW5jdGlvbiA9ICgpID0+IHsgfSk6IHN0cmluZyB7XG4gICAgaWYgKGlucHV0VmFsdWUgPT09IHVuZGVmaW5lZCB8fCBpbnB1dFZhbHVlID09PSBudWxsIHx8IG1hc2tFeHByZXNzaW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgbGV0IGN1cnNvciA9IDA7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgIGxldCBtdWx0aSA9IGZhbHNlO1xuICAgIGxldCBiYWNrc3BhY2VTaGlmdCA9IGZhbHNlO1xuICAgIGxldCBzaGlmdCA9IDE7XG4gICAgbGV0IHN0ZXBCYWNrID0gZmFsc2U7XG4gICAgaWYgKGlucHV0VmFsdWUuc2xpY2UoMCwgdGhpcy5wcmVmaXgubGVuZ3RoKSA9PT0gdGhpcy5wcmVmaXgpIHtcbiAgICAgIGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnNsaWNlKHRoaXMucHJlZml4Lmxlbmd0aCwgaW5wdXRWYWx1ZS5sZW5ndGgpO1xuICAgIH1cbiAgICBpZiAoISF0aGlzLnN1ZmZpeCAmJiBpbnB1dFZhbHVlLmVuZHNXaXRoKHRoaXMuc3VmZml4KSkge1xuICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc2xpY2UoMCwgaW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGgpO1xuICAgIH1cbiAgICBjb25zdCBpbnB1dEFycmF5OiBzdHJpbmdbXSA9IGlucHV0VmFsdWUudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgaWYgKG1hc2tFeHByZXNzaW9uID09PSAnSVAnKSB7XG4gICAgICB0aGlzLmlwRXJyb3IgPSAhIShpbnB1dEFycmF5LmZpbHRlcigoaTogc3RyaW5nKSA9PiBpID09PSAnLicpLmxlbmd0aCA8IDMgJiYgaW5wdXRBcnJheS5sZW5ndGggPCA3KTtcbiAgICAgIG1hc2tFeHByZXNzaW9uID0gJzA5OS4wOTkuMDk5LjA5OSc7XG4gICAgfVxuICAgIGlmIChtYXNrRXhwcmVzc2lvbi5zdGFydHNXaXRoKCdwZXJjZW50JykpIHtcbiAgICAgIGlmIChpbnB1dFZhbHVlLm1hdGNoKCdbYS16XXxbQS1aXScpIHx8IGlucHV0VmFsdWUubWF0Y2goL1stISQlXiYqKClfK3x+PWB7fVxcW1xcXTpcIjsnPD4/LFxcL10vKSkge1xuICAgICAgICBpbnB1dFZhbHVlID0gdGhpcy5fc3RyaXBUb0RlY2ltYWwoaW5wdXRWYWx1ZSk7XG4gICAgICAgIGNvbnN0IHByZWNpc2lvbjogbnVtYmVyID0gdGhpcy5nZXRQcmVjaXNpb24obWFza0V4cHJlc3Npb24pO1xuICAgICAgICBpbnB1dFZhbHVlID0gdGhpcy5jaGVja0lucHV0UHJlY2lzaW9uKGlucHV0VmFsdWUsIHByZWNpc2lvbiwgJy4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbnB1dFZhbHVlLmluZGV4T2YoJy4nKSA+IDAgJiYgIXRoaXMucGVyY2VudGFnZShpbnB1dFZhbHVlLnN1YnN0cmluZygwLCBpbnB1dFZhbHVlLmluZGV4T2YoJy4nKSkpKSB7XG4gICAgICAgIGNvbnN0IGJhc2U6IHN0cmluZyA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUuaW5kZXhPZignLicpIC0gMSk7XG4gICAgICAgIGlucHV0VmFsdWUgPSBgJHtiYXNlfSR7aW5wdXRWYWx1ZS5zdWJzdHJpbmcoaW5wdXRWYWx1ZS5pbmRleE9mKCcuJyksIGlucHV0VmFsdWUubGVuZ3RoKX1gO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucGVyY2VudGFnZShpbnB1dFZhbHVlKSkge1xuICAgICAgICByZXN1bHQgPSBpbnB1dFZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gaW5wdXRWYWx1ZS5zdWJzdHJpbmcoMCwgaW5wdXRWYWx1ZS5sZW5ndGggLSAxKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1hc2tFeHByZXNzaW9uLnN0YXJ0c1dpdGgoJ3NlcGFyYXRvcicpKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGlucHV0VmFsdWUubWF0Y2goJ1t30LAt0Y/QkC3Qr10nKSB8fFxuICAgICAgICBpbnB1dFZhbHVlLm1hdGNoKCdb0IHRkdCQLdGPXScpIHx8XG4gICAgICAgIGlucHV0VmFsdWUubWF0Y2goJ1thLXpdfFtBLVpdJykgfHxcbiAgICAgICAgaW5wdXRWYWx1ZS5tYXRjaCgvWy1AIyEkJVxcXFxeJiooKV/Co8KsJyt8fj1ge31cXFtcXF06XCI7PD4uP1xcL10vKSB8fFxuICAgICAgICBpbnB1dFZhbHVlLm1hdGNoKCdbXkEtWmEtejAtOSxdJylcbiAgICAgICkge1xuICAgICAgICBpbnB1dFZhbHVlID0gdGhpcy5fc3RyaXBUb0RlY2ltYWwoaW5wdXRWYWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlucHV0VmFsdWUgPVxuICAgICAgICBpbnB1dFZhbHVlLmxlbmd0aCA+IDEgJiYgaW5wdXRWYWx1ZVswXSA9PT0gJzAnICYmIGlucHV0VmFsdWVbMV0gIT09IHRoaXMuZGVjaW1hbE1hcmtlclxuICAgICAgICAgID8gaW5wdXRWYWx1ZS5zbGljZSgxLCBpbnB1dFZhbHVlLmxlbmd0aClcbiAgICAgICAgICA6IGlucHV0VmFsdWU7XG5cbiAgICAgIC8vIFRPRE86IHdlIGhhZCBkaWZmZXJlbnQgcmV4ZXhwcyBoZXJlIGZvciB0aGUgZGlmZmVyZW50IGNhc2VzLi4uIGJ1dCB0ZXN0cyBkb250IHNlYW0gdG8gYm90aGVyIC0gY2hlY2sgdGhpc1xuICAgICAgLy8gIHNlcGFyYXRvcjogbm8gQ09NTUEsIGRvdC1zZXA6IG5vIFNQQUNFLCBDT01NQSBPSywgY29tbWEtc2VwOiBubyBTUEFDRSwgQ09NTUEgT0tcblxuICAgICAgY29uc3QgdGhvdXNhbmRTZXBlcmF0b3JDaGFyRXNjYXBlZDogc3RyaW5nID0gdGhpcy5fY2hhclRvUmVnRXhwRXhwcmVzc2lvbih0aGlzLnRob3VzYW5kU2VwYXJhdG9yKTtcbiAgICAgIGNvbnN0IGRlY2ltYWxNYXJrZXJFc2NhcGVkOiBzdHJpbmcgPSB0aGlzLl9jaGFyVG9SZWdFeHBFeHByZXNzaW9uKHRoaXMuZGVjaW1hbE1hcmtlcik7XG4gICAgICBjb25zdCBpbnZhbGlkQ2hhcnM6IHN0cmluZyA9ICdAIyEkJV4mKigpXyt8fj1ge31cXFxcW1xcXFxdOlxcXFxzLFwiOzw+P1xcXFwvJ1xuICAgICAgICAucmVwbGFjZSh0aG91c2FuZFNlcGVyYXRvckNoYXJFc2NhcGVkLCAnJylcbiAgICAgICAgLnJlcGxhY2UoZGVjaW1hbE1hcmtlckVzY2FwZWQsICcnKTtcblxuICAgICAgY29uc3QgaW52YWxpZENoYXJSZWdleHA6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ1snICsgaW52YWxpZENoYXJzICsgJ10nKTtcblxuICAgICAgaWYgKGlucHV0VmFsdWUubWF0Y2goaW52YWxpZENoYXJSZWdleHApKSB7XG4gICAgICAgIGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnN1YnN0cmluZygwLCBpbnB1dFZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmVjaXNpb246IG51bWJlciA9IHRoaXMuZ2V0UHJlY2lzaW9uKG1hc2tFeHByZXNzaW9uKTtcbiAgICAgIGlucHV0VmFsdWUgPSB0aGlzLmNoZWNrSW5wdXRQcmVjaXNpb24oaW5wdXRWYWx1ZSwgcHJlY2lzaW9uLCB0aGlzLmRlY2ltYWxNYXJrZXIpO1xuICAgICAgY29uc3Qgc3RyRm9yU2VwOiBzdHJpbmcgPSBpbnB1dFZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cCh0aG91c2FuZFNlcGVyYXRvckNoYXJFc2NhcGVkLCAnZycpLCAnJyk7XG4gICAgICByZXN1bHQgPSB0aGlzLl9mb3JtYXRXaXRoU2VwYXJhdG9ycyhzdHJGb3JTZXAsIHRoaXMudGhvdXNhbmRTZXBhcmF0b3IsIHRoaXMuZGVjaW1hbE1hcmtlciwgcHJlY2lzaW9uKTtcblxuICAgICAgY29uc3QgY29tbWFTaGlmdDogbnVtYmVyID0gcmVzdWx0LmluZGV4T2YoJywnKSAtIGlucHV0VmFsdWUuaW5kZXhPZignLCcpO1xuICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSByZXN1bHQubGVuZ3RoIC0gaW5wdXRWYWx1ZS5sZW5ndGg7XG5cbiAgICAgIGlmIChzaGlmdFN0ZXAgPiAwICYmIHJlc3VsdFtwb3NpdGlvbl0gIT09ICcsJykge1xuICAgICAgICBiYWNrc3BhY2VTaGlmdCA9IHRydWU7XG4gICAgICAgIGxldCBfc2hpZnQgPSAwO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHBvc2l0aW9uICsgX3NoaWZ0KTtcbiAgICAgICAgICBfc2hpZnQrKztcbiAgICAgICAgfSB3aGlsZSAoX3NoaWZ0IDwgc2hpZnRTdGVwKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIChjb21tYVNoaWZ0ICE9PSAwICYmIHBvc2l0aW9uID4gMCAmJiAhKHJlc3VsdC5pbmRleE9mKCcsJykgPj0gcG9zaXRpb24gJiYgcG9zaXRpb24gPiAzKSkgfHxcbiAgICAgICAgKCEocmVzdWx0LmluZGV4T2YoJy4nKSA+PSBwb3NpdGlvbiAmJiBwb3NpdGlvbiA+IDMpICYmIHNoaWZ0U3RlcCA8PSAwKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3NoaWZ0LmNsZWFyKCk7XG4gICAgICAgIGJhY2tzcGFjZVNoaWZ0ID0gdHJ1ZTtcbiAgICAgICAgc2hpZnQgPSBzaGlmdFN0ZXA7XG4gICAgICAgIHBvc2l0aW9uICs9IHNoaWZ0U3RlcDtcbiAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHBvc2l0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NoaWZ0LmNsZWFyKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBsZXQgaTogbnVtYmVyID0gMCwgaW5wdXRTeW1ib2w6IHN0cmluZyA9IGlucHV0QXJyYXlbMF07XG4gICAgICAgIGkgPCBpbnB1dEFycmF5Lmxlbmd0aDtcbiAgICAgICAgaSsrICwgaW5wdXRTeW1ib2wgPSBpbnB1dEFycmF5W2ldXG4gICAgICApIHtcbiAgICAgICAgaWYgKGN1cnNvciA9PT0gbWFza0V4cHJlc3Npb24ubGVuZ3RoKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbCwgbWFza0V4cHJlc3Npb25bY3Vyc29yXSkgJiYgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICc/Jykge1xuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgICBjdXJzb3IgKz0gMjtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJyonICYmXG4gICAgICAgICAgbXVsdGkgJiZcbiAgICAgICAgICB0aGlzLl9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2wsIG1hc2tFeHByZXNzaW9uW2N1cnNvciArIDJdKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XG4gICAgICAgICAgY3Vyc29yICs9IDM7XG4gICAgICAgICAgbXVsdGkgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2wsIG1hc2tFeHByZXNzaW9uW2N1cnNvcl0pICYmIG1hc2tFeHByZXNzaW9uW2N1cnNvciArIDFdID09PSAnKicpIHtcbiAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XG4gICAgICAgICAgbXVsdGkgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIG1hc2tFeHByZXNzaW9uW2N1cnNvciArIDFdID09PSAnPycgJiZcbiAgICAgICAgICB0aGlzLl9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2wsIG1hc2tFeHByZXNzaW9uW2N1cnNvciArIDJdKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XG4gICAgICAgICAgY3Vyc29yICs9IDM7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgdGhpcy5fY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sLCBtYXNrRXhwcmVzc2lvbltjdXJzb3JdKSB8fFxuICAgICAgICAgICh0aGlzLmhpZGRlbklucHV0ICYmXG4gICAgICAgICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltjdXJzb3JdXSAmJlxuICAgICAgICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25bY3Vyc29yXV0uc3ltYm9sID09PSBpbnB1dFN5bWJvbClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdIJykge1xuICAgICAgICAgICAgaWYgKE51bWJlcihpbnB1dFN5bWJvbCkgPiAyKSB7XG4gICAgICAgICAgICAgIGN1cnNvciArPSAxO1xuICAgICAgICAgICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IC9bKj9dL2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKSA/IGlucHV0QXJyYXkubGVuZ3RoIDogY3Vyc29yO1xuICAgICAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQoc2hpZnRTdGVwICsgdGhpcy5wcmVmaXgubGVuZ3RoIHx8IDApO1xuICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ2gnKSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSAnMicgJiYgTnVtYmVyKGlucHV0U3ltYm9sKSA+IDMpIHtcbiAgICAgICAgICAgICAgY3Vyc29yICs9IDE7XG4gICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXNrRXhwcmVzc2lvbltjdXJzb3JdID09PSAnbScpIHtcbiAgICAgICAgICAgIGlmIChOdW1iZXIoaW5wdXRTeW1ib2wpID4gNSkge1xuICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcbiAgICAgICAgICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSAvWyo/XS9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSkgPyBpbnB1dEFycmF5Lmxlbmd0aCA6IGN1cnNvcjtcbiAgICAgICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcbiAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdzJykge1xuICAgICAgICAgICAgaWYgKE51bWJlcihpbnB1dFN5bWJvbCkgPiA1KSB7XG4gICAgICAgICAgICAgIGN1cnNvciArPSAxO1xuICAgICAgICAgICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IC9bKj9dL2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKSA/IGlucHV0QXJyYXkubGVuZ3RoIDogY3Vyc29yO1xuICAgICAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQoc2hpZnRTdGVwICsgdGhpcy5wcmVmaXgubGVuZ3RoIHx8IDApO1xuICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBkYXlzQ291bnQgPSAzMTtcbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ2QnKSB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yLCBjdXJzb3IgKyAyKSkgPiBkYXlzQ291bnQgfHwgaW5wdXRWYWx1ZVtjdXJzb3IgKyAxXSA9PT0gJy8nKSB7XG4gICAgICAgICAgICAgIGN1cnNvciArPSAxO1xuICAgICAgICAgICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IC9bKj9dL2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKSA/IGlucHV0QXJyYXkubGVuZ3RoIDogY3Vyc29yO1xuICAgICAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQoc2hpZnRTdGVwICsgdGhpcy5wcmVmaXgubGVuZ3RoIHx8IDApO1xuICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ00nKSB7XG4gICAgICAgICAgICBjb25zdCBtb250aHNDb3VudCA9IDEyO1xuICAgICAgICAgICAgLy8gbWFzayB3aXRob3V0IGRheVxuICAgICAgICAgICAgY29uc3Qgd2l0aG91dERheXM6IGJvb2xlYW4gPVxuICAgICAgICAgICAgICBjdXJzb3IgPT09IDAgJiZcbiAgICAgICAgICAgICAgKE51bWJlcihpbnB1dFN5bWJvbCkgPiAyIHx8XG4gICAgICAgICAgICAgICAgTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yLCBjdXJzb3IgKyAyKSkgPiBtb250aHNDb3VudCB8fFxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWVbY3Vyc29yICsgMV0gPT09ICcvJyk7XG4gICAgICAgICAgICAvLyBkYXk8MTAgJiYgbW9udGg8MTIgZm9yIGlucHV0XG4gICAgICAgICAgICBjb25zdCBkYXkxbW9udGhJbnB1dDogYm9vbGVhbiA9XG4gICAgICAgICAgICAgIGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMywgY3Vyc29yIC0gMSkuaW5jbHVkZXMoJy8nKSAmJlxuICAgICAgICAgICAgICAoKGlucHV0VmFsdWVbY3Vyc29yIC0gMl0gPT09ICcvJyAmJlxuICAgICAgICAgICAgICAgIChOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAxLCBjdXJzb3IgKyAxKSkgPiBtb250aHNDb3VudCAmJiBpbnB1dFZhbHVlW2N1cnNvcl0gIT09ICcvJykpIHx8XG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZVtjdXJzb3JdID09PSAnLycgfHxcbiAgICAgICAgICAgICAgICAoKGlucHV0VmFsdWVbY3Vyc29yIC0gM10gPT09ICcvJyAmJlxuICAgICAgICAgICAgICAgICAgKE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDIsIGN1cnNvcikpID4gbW9udGhzQ291bnQgJiYgaW5wdXRWYWx1ZVtjdXJzb3IgLSAxXSAhPT0gJy8nKSkgfHxcbiAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWVbY3Vyc29yIC0gMV0gPT09ICcvJykpO1xuICAgICAgICAgICAgLy8gMTA8ZGF5PDMxICYmIG1vbnRoPDEyIGZvciBpbnB1dFxuICAgICAgICAgICAgY29uc3QgZGF5Mm1vbnRoSW5wdXQ6IGJvb2xlYW4gPVxuICAgICAgICAgICAgICBOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAzLCBjdXJzb3IgLSAxKSkgPD0gZGF5c0NvdW50ICYmXG4gICAgICAgICAgICAgICFpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDMsIGN1cnNvciAtIDEpLmluY2x1ZGVzKCcvJykgJiZcbiAgICAgICAgICAgICAgaW5wdXRWYWx1ZVtjdXJzb3IgLSAxXSA9PT0gJy8nICYmXG4gICAgICAgICAgICAgIChOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IsIGN1cnNvciArIDIpKSA+IG1vbnRoc0NvdW50IHx8IGlucHV0VmFsdWVbY3Vyc29yICsgMV0gPT09ICcvJyk7XG4gICAgICAgICAgICAvLyBkYXk8MTAgJiYgbW9udGg8MTIgZm9yIHBhc3RlIHdob2xlIGRhdGFcbiAgICAgICAgICAgIGNvbnN0IGRheTFtb250aFBhc3RlOiBib29sZWFuID1cbiAgICAgICAgICAgICAgTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMywgY3Vyc29yIC0gMSkpID4gZGF5c0NvdW50ICYmXG4gICAgICAgICAgICAgICFpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDMsIGN1cnNvciAtIDEpLmluY2x1ZGVzKCcvJykgJiZcbiAgICAgICAgICAgICAgKCFpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDIsIGN1cnNvcikuaW5jbHVkZXMoJy8nKSAmJlxuICAgICAgICAgICAgICAgIE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDIsIGN1cnNvcikpID4gbW9udGhzQ291bnQpO1xuICAgICAgICAgICAgLy8gMTA8ZGF5PDMxICYmIG1vbnRoPDEyIGZvciBwYXN0ZSB3aG9sZSBkYXRhXG4gICAgICAgICAgICBjb25zdCBkYXkybW9udGhQYXN0ZTogYm9vbGVhbiA9XG4gICAgICAgICAgICAgIE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDMsIGN1cnNvciAtIDEpKSA8PSBkYXlzQ291bnQgJiZcbiAgICAgICAgICAgICAgIWlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMywgY3Vyc29yIC0gMSkuaW5jbHVkZXMoJy8nKSAmJlxuICAgICAgICAgICAgICBpbnB1dFZhbHVlW2N1cnNvciAtIDFdICE9PSAnLycgJiZcbiAgICAgICAgICAgICAgTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMSwgY3Vyc29yICsgMSkpID4gbW9udGhzQ291bnQ7XG5cbiAgICAgICAgICAgIGlmICh3aXRob3V0RGF5cyB8fCBkYXkxbW9udGhJbnB1dCB8fCBkYXkybW9udGhJbnB1dCB8fCBkYXkxbW9udGhQYXN0ZSB8fCBkYXkybW9udGhQYXN0ZSkge1xuICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcbiAgICAgICAgICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSAvWyo/XS9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSkgPyBpbnB1dEFycmF5Lmxlbmd0aCA6IGN1cnNvcjtcbiAgICAgICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcbiAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0ICs9IGlucHV0U3ltYm9sO1xuICAgICAgICAgIGN1cnNvcisrO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzLmluZGV4T2YobWFza0V4cHJlc3Npb25bY3Vyc29yXSkgIT09IC0xKSB7XG4gICAgICAgICAgcmVzdWx0ICs9IG1hc2tFeHByZXNzaW9uW2N1cnNvcl07XG4gICAgICAgICAgY3Vyc29yKys7XG4gICAgICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSAvWyo/XS9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSkgPyBpbnB1dEFycmF5Lmxlbmd0aCA6IGN1cnNvcjtcbiAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQoc2hpZnRTdGVwICsgdGhpcy5wcmVmaXgubGVuZ3RoIHx8IDApO1xuICAgICAgICAgIGktLTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5pbmRleE9mKGlucHV0U3ltYm9sKSA+IC0xICYmXG4gICAgICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25bY3Vyc29yXV0gJiZcbiAgICAgICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltjdXJzb3JdXS5vcHRpb25hbFxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoISFpbnB1dEFycmF5W2N1cnNvcl0gJiYgbWFza0V4cHJlc3Npb24gIT09ICcwOTkuMDk5LjA5OS4wOTknKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gaW5wdXRBcnJheVtjdXJzb3JdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJzb3IrKztcbiAgICAgICAgICBpLS07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgdGhpcy5tYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJyonICYmXG4gICAgICAgICAgdGhpcy5fZmluZFNwZWNpYWxDaGFyKHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0pICYmXG4gICAgICAgICAgdGhpcy5fZmluZFNwZWNpYWxDaGFyKGlucHV0U3ltYm9sKSA9PT0gdGhpcy5tYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAyXSAmJlxuICAgICAgICAgIG11bHRpXG4gICAgICAgICkge1xuICAgICAgICAgIGN1cnNvciArPSAzO1xuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0aGlzLm1hc2tFeHByZXNzaW9uW2N1cnNvciArIDFdID09PSAnPycgJiZcbiAgICAgICAgICB0aGlzLl9maW5kU3BlY2lhbENoYXIodGhpcy5tYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAyXSkgJiZcbiAgICAgICAgICB0aGlzLl9maW5kU3BlY2lhbENoYXIoaW5wdXRTeW1ib2wpID09PSB0aGlzLm1hc2tFeHByZXNzaW9uW2N1cnNvciArIDJdICYmXG4gICAgICAgICAgbXVsdGlcbiAgICAgICAgKSB7XG4gICAgICAgICAgY3Vyc29yICs9IDM7XG4gICAgICAgICAgcmVzdWx0ICs9IGlucHV0U3ltYm9sO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hvd01hc2tUeXBlZCAmJiB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5pbmRleE9mKGlucHV0U3ltYm9sKSA8IDAgJiYgaW5wdXRTeW1ib2wgIT09IHRoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXIpIHtcbiAgICAgICAgICBzdGVwQmFjayA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKFxuICAgICAgcmVzdWx0Lmxlbmd0aCArIDEgPT09IG1hc2tFeHByZXNzaW9uLmxlbmd0aCAmJlxuICAgICAgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5kZXhPZihtYXNrRXhwcmVzc2lvblttYXNrRXhwcmVzc2lvbi5sZW5ndGggLSAxXSkgIT09IC0xXG4gICAgKSB7XG4gICAgICByZXN1bHQgKz0gbWFza0V4cHJlc3Npb25bbWFza0V4cHJlc3Npb24ubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgbGV0IG5ld1Bvc2l0aW9uOiBudW1iZXIgPSBwb3NpdGlvbiArIDE7XG5cbiAgICB3aGlsZSAodGhpcy5fc2hpZnQuaGFzKG5ld1Bvc2l0aW9uKSkge1xuICAgICAgc2hpZnQrKztcbiAgICAgIG5ld1Bvc2l0aW9uKys7XG4gICAgfVxuXG4gICAgbGV0IGFjdHVhbFNoaWZ0OiBudW1iZXIgPSB0aGlzLl9zaGlmdC5oYXMocG9zaXRpb24pID8gc2hpZnQgOiAwO1xuICAgIGlmIChzdGVwQmFjaykge1xuICAgICAgYWN0dWFsU2hpZnQtLTtcbiAgICB9XG5cbiAgICBjYihhY3R1YWxTaGlmdCwgYmFja3NwYWNlU2hpZnQpO1xuICAgIGlmIChzaGlmdCA8IDApIHtcbiAgICAgIHRoaXMuX3NoaWZ0LmNsZWFyKCk7XG4gICAgfVxuICAgIGxldCByZXMgPSBgJHt0aGlzLnByZWZpeH0ke3Jlc3VsdH0ke3RoaXMuc3VmZml4fWA7XG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlcyA9IGAke3RoaXMucHJlZml4fSR7cmVzdWx0fWA7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcHVibGljIF9maW5kU3BlY2lhbENoYXIoaW5wdXRTeW1ib2w6IHN0cmluZyk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzLmZpbmQoKHZhbDogc3RyaW5nKSA9PiB2YWwgPT09IGlucHV0U3ltYm9sKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sOiBzdHJpbmcsIG1hc2tTeW1ib2w6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zID0gdGhpcy5jdXN0b21QYXR0ZXJuID8gdGhpcy5jdXN0b21QYXR0ZXJuIDogdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnM7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tTeW1ib2xdICYmXG4gICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrU3ltYm9sXS5wYXR0ZXJuICYmXG4gICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrU3ltYm9sXS5wYXR0ZXJuLnRlc3QoaW5wdXRTeW1ib2wpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Zvcm1hdFdpdGhTZXBhcmF0b3JzID0gKFxuICAgIHN0cjogc3RyaW5nLFxuICAgIHRob3VzYW5kU2VwYXJhdG9yQ2hhcjogc3RyaW5nLFxuICAgIGRlY2ltYWxDaGFyOiBzdHJpbmcsXG4gICAgcHJlY2lzaW9uOiBudW1iZXJcbiAgKSA9PiB7XG4gICAgY29uc3QgeDogc3RyaW5nW10gPSBzdHIuc3BsaXQoZGVjaW1hbENoYXIpO1xuICAgIGNvbnN0IGRlY2ltYWxzOiBzdHJpbmcgPSB4Lmxlbmd0aCA+IDEgPyBgJHtkZWNpbWFsQ2hhcn0ke3hbMV19YCA6ICcnO1xuICAgIGxldCByZXM6IHN0cmluZyA9IHhbMF07XG4gICAgY29uc3Qgc2VwYXJhdG9yTGltaXQ6IHN0cmluZyA9IHRoaXMuc2VwYXJhdG9yTGltaXQucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICBpZiAoc2VwYXJhdG9yTGltaXQgJiYgK3NlcGFyYXRvckxpbWl0KSB7XG4gICAgICByZXMgPSByZXMuc2xpY2UoMCwgc2VwYXJhdG9yTGltaXQubGVuZ3RoKTtcbiAgICB9XG4gICAgY29uc3Qgcmd4OiBSZWdFeHAgPSAvKFxcZCspKFxcZHszfSkvO1xuICAgIHdoaWxlIChyZ3gudGVzdChyZXMpKSB7XG4gICAgICByZXMgPSByZXMucmVwbGFjZShyZ3gsICckMScgKyB0aG91c2FuZFNlcGFyYXRvckNoYXIgKyAnJDInKTtcbiAgICB9XG4gICAgaWYgKHByZWNpc2lvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmVzICsgZGVjaW1hbHM7XG4gICAgfSBlbHNlIGlmIChwcmVjaXNpb24gPT09IDApIHtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIHJldHVybiByZXMgKyBkZWNpbWFscy5zdWJzdHIoMCwgcHJlY2lzaW9uICsgMSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBwZXJjZW50YWdlID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIE51bWJlcihzdHIpID49IDAgJiYgTnVtYmVyKHN0cikgPD0gMTAwO1xuICB9O1xuXG4gIHByaXZhdGUgZ2V0UHJlY2lzaW9uID0gKG1hc2tFeHByZXNzaW9uOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IHg6IHN0cmluZ1tdID0gbWFza0V4cHJlc3Npb24uc3BsaXQoJy4nKTtcbiAgICBpZiAoeC5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gTnVtYmVyKHhbeC5sZW5ndGggLSAxXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEluZmluaXR5O1xuICB9O1xuXG4gIHByaXZhdGUgY2hlY2tJbnB1dFByZWNpc2lvbiA9IChcbiAgICBpbnB1dFZhbHVlOiBzdHJpbmcsXG4gICAgcHJlY2lzaW9uOiBudW1iZXIsXG4gICAgZGVjaW1hbE1hcmtlcjogSUNvbmZpZ1snZGVjaW1hbE1hcmtlciddXG4gICk6IHN0cmluZyA9PiB7XG4gICAgaWYgKHByZWNpc2lvbiA8IEluZmluaXR5KSB7XG4gICAgICBjb25zdCBwcmVjaXNpb25SZWdFeDogUmVnRXhwID0gbmV3IFJlZ0V4cCh0aGlzLl9jaGFyVG9SZWdFeHBFeHByZXNzaW9uKGRlY2ltYWxNYXJrZXIpICsgYFxcXFxkeyR7cHJlY2lzaW9ufX0uKiRgKTtcblxuICAgICAgY29uc3QgcHJlY2lzaW9uTWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gaW5wdXRWYWx1ZS5tYXRjaChwcmVjaXNpb25SZWdFeCk7XG4gICAgICBpZiAocHJlY2lzaW9uTWF0Y2ggJiYgcHJlY2lzaW9uTWF0Y2hbMF0ubGVuZ3RoIC0gMSA+IHByZWNpc2lvbikge1xuICAgICAgICBpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5zdWJzdHJpbmcoMCwgaW5wdXRWYWx1ZS5sZW5ndGggLSAxKTtcbiAgICAgIH0gZWxzZSBpZiAocHJlY2lzaW9uID09PSAwICYmIGlucHV0VmFsdWUuZW5kc1dpdGgoZGVjaW1hbE1hcmtlcikpIHtcbiAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbnB1dFZhbHVlO1xuICB9O1xuXG4gIHByaXZhdGUgX3N0cmlwVG9EZWNpbWFsKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc3RyXG4gICAgICAuc3BsaXQoJycpXG4gICAgICAuZmlsdGVyKChpOiBzdHJpbmcpID0+IGkubWF0Y2goJ1xcXFxkJykgfHwgaSA9PT0gJy4nIHx8IGkgPT09ICcsJylcbiAgICAgIC5qb2luKCcnKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoYXJUb1JlZ0V4cEV4cHJlc3Npb24oY2hhcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBjaGFyc1RvRXNjYXBlID0gJ1tcXFxcXiQufD8qKygpJztcbiAgICByZXR1cm4gY2hhciA9PT0gJyAnID8gJ1xcXFxzJyA6IGNoYXJzVG9Fc2NhcGUuaW5kZXhPZihjaGFyKSA+PSAwID8gJ1xcXFwnICsgY2hhciA6IGNoYXI7XG4gIH1cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1maWxlLWxpbmUtY291bnRcbn1cbiJdfQ==