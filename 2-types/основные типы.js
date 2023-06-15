'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.toWords = void 0;
/* мой код, конечно, гораздо медленнее исходног и похож на "нинздя-код",
    но лучше я ничего не придумал
Также я убрал параметр asOrdinal,
    так как у меня нетм моодуля откуда эта функция импортируется
 */
var NumRank;
(function (NumRank) {
    NumRank[NumRank["ten"] = 10] = "ten";
    NumRank[NumRank["hundred"] = 100] = "hundred";
    NumRank[NumRank["thousand"] = 1000] = "thousand";
    NumRank[NumRank["million"] = 1000000] = "million";
    NumRank[NumRank["billion"] = 1000000000] = "billion";
    NumRank[NumRank["trillion"] = 1000000000000] = "trillion";
    NumRank[NumRank["quadrillion"] = 1000000000000000] = "quadrillion";
    NumRank[NumRank["max"] = Number.MAX_SAFE_INTEGER] = "max";
})(NumRank || (NumRank = {}));
var StrLessThanTwenty;
(function (StrLessThanTwenty) {
    StrLessThanTwenty[StrLessThanTwenty["zero"] = 0] = "zero";
    StrLessThanTwenty[StrLessThanTwenty["one"] = 1] = "one";
    StrLessThanTwenty[StrLessThanTwenty["two"] = 2] = "two";
    StrLessThanTwenty[StrLessThanTwenty["three"] = 3] = "three";
    StrLessThanTwenty[StrLessThanTwenty["four"] = 4] = "four";
    StrLessThanTwenty[StrLessThanTwenty["five"] = 5] = "five";
    StrLessThanTwenty[StrLessThanTwenty["six"] = 6] = "six";
    StrLessThanTwenty[StrLessThanTwenty["seven"] = 7] = "seven";
    StrLessThanTwenty[StrLessThanTwenty["eight"] = 8] = "eight";
    StrLessThanTwenty[StrLessThanTwenty["nine"] = 9] = "nine";
    StrLessThanTwenty[StrLessThanTwenty["ten"] = 10] = "ten";
    StrLessThanTwenty[StrLessThanTwenty["eleven"] = 11] = "eleven";
    StrLessThanTwenty[StrLessThanTwenty["twelve"] = 12] = "twelve";
    StrLessThanTwenty[StrLessThanTwenty["thirteen"] = 13] = "thirteen";
    StrLessThanTwenty[StrLessThanTwenty["fourteen"] = 14] = "fourteen";
    StrLessThanTwenty[StrLessThanTwenty["fifteen"] = 15] = "fifteen";
    StrLessThanTwenty[StrLessThanTwenty["sixteen"] = 16] = "sixteen";
    StrLessThanTwenty[StrLessThanTwenty["seventeen"] = 17] = "seventeen";
    StrLessThanTwenty[StrLessThanTwenty["eighteen"] = 18] = "eighteen";
    StrLessThanTwenty[StrLessThanTwenty["nineteen"] = 19] = "nineteen";
})(StrLessThanTwenty || (StrLessThanTwenty = {}));
;
var StrTentsLessThanHundred;
(function (StrTentsLessThanHundred) {
    StrTentsLessThanHundred[StrTentsLessThanHundred["zero"] = 0] = "zero";
    StrTentsLessThanHundred[StrTentsLessThanHundred["ten"] = 1] = "ten";
    StrTentsLessThanHundred[StrTentsLessThanHundred["twenty"] = 2] = "twenty";
    StrTentsLessThanHundred[StrTentsLessThanHundred["thirty"] = 3] = "thirty";
    StrTentsLessThanHundred[StrTentsLessThanHundred["forty"] = 4] = "forty";
    StrTentsLessThanHundred[StrTentsLessThanHundred["fifty"] = 5] = "fifty";
    StrTentsLessThanHundred[StrTentsLessThanHundred["sixty"] = 6] = "sixty";
    StrTentsLessThanHundred[StrTentsLessThanHundred["seventy"] = 7] = "seventy";
    StrTentsLessThanHundred[StrTentsLessThanHundred["eighty"] = 8] = "eighty";
    StrTentsLessThanHundred[StrTentsLessThanHundred["ninety"] = 9] = "ninety";
})(StrTentsLessThanHundred || (StrTentsLessThanHundred = {}));
/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
const toWords = (number) => {
    //let num:number = (typeof number==='number') ? number : parseInt(number, 10);
    let num = parseInt(String(number), 10);
    if (!Number.isFinite(num)) {
        throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');
    }
    if (!Number.isSafeInteger(num)) {
        throw new RangeError('Input is not a safe number, it’s either too large or too small.');
    }
    return generateWords(num);
};
exports.toWords = toWords;
const generateWords = (number, words) => {
    let remainder = 0;
    let word;
    const generateWord = (numRank) => {
        remainder = number % numRank;
        return generateWords(Math.floor(number / numRank)) +
            ' ' + NumRank[numRank] + ',';
    };
    //если число больше или равно текущему максимальному разряду    
    //возвращается пустая строока
    const generateWordGreatherHundred = (currentNumRank, previousNumRank) => (number < currentNumRank)
        ? generateWord(previousNumRank)
        : '';
    // We’re done
    if (number === 0) {
        return !words ? StrLessThanTwenty[StrLessThanTwenty.zero] : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }
    if (number < 20) {
        remainder = 0;
        word = StrLessThanTwenty[number];
    }
    else if (number < NumRank.hundred) {
        remainder = number % NumRank.ten;
        word = StrTentsLessThanHundred[Math.floor(number / NumRank.ten)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + StrLessThanTwenty[remainder];
            remainder = 0;
        }
    }
    else if (!(word = generateWordGreatherHundred(NumRank.thousand, NumRank.hundred)))
        if (!(word = generateWordGreatherHundred(NumRank.million, NumRank.thousand)))
            if (!(word = generateWordGreatherHundred(NumRank.billion, NumRank.million)))
                if (!(word = generateWordGreatherHundred(NumRank.trillion, NumRank.billion)))
                    if (!(word = generateWordGreatherHundred(NumRank.quadrillion, NumRank.billion)))
                        if (!(word = generateWordGreatherHundred(NumRank.max, NumRank.quadrillion))) {
                            word = generateWord(NumRank.quadrillion);
                        }
    words.push(word);
    return generateWords(remainder, words);
};
console.log((0, exports.toWords)(Number.MAX_SAFE_INTEGER));
