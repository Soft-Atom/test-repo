'use strict';
/* мой код, конечно, гораздо медленнее исходног и похож на "нинздя-код", 
    но лучше я ничего не придумал
Также я убрал параметр asOrdinal,
    так как у меня нетм моодуля откуда эта функция импортируется
 */

enum NumRank{
    ten = 10,
    hundred = 100,
    thousand = 1_000,
    million = 1_000_000,
    billion = 1_000_000_000,          //         1.000.000.000 (9)
    trillion = 1_000_000_000_000,       //     1.000.000.000.000 (12)
    quadrillion = 1_000_000_000_000_000 ,// 1.000.000.000.000.000 (15)           // 9.007.199.254.740.992 (15)
    max = Number.MAX_SAFE_INTEGER
} 

enum StrLessThanTwenty{
    zero, 
    one,
    two, 
    three, 
    four, 
    five, 
    six, 
    seven, 
    eight, 
    nine,
    ten, 
    eleven, 
    twelve, 
    thirteen, 
    fourteen, 
    fifteen, 
    sixteen, 
    seventeen, 
    eighteen, 
    nineteen
};

enum StrTentsLessThanHundred {
    zero, 
    ten, 
    twenty, 
    thirty, 
    forty, 
    fifty, 
    sixty, 
    seventy, 
    eighty, 
    ninety

}

/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
export const toWords = (number:(number|string)):string => {

    //let num:number = (typeof number==='number') ? number : parseInt(number, 10);
    let num:number = parseInt(String(number), 10);


    if (!Number.isFinite(num)) {
        throw new TypeError(
            'Not a finite number: ' + number + ' (' + typeof number + ')'
        );
    }
    if (!Number.isSafeInteger(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }
   
    return  generateWords(num);
}

const generateWords = (number:number, words?:string[]):string => {
    let remainder = 0;
    let word:string;

    const generateWord = (numRank:NumRank) :string => {
        remainder = number % numRank;
        return generateWords(Math.floor(number / numRank)) + 
                    ' ' + NumRank[numRank] + ',';
    }
    //если число больше или равно текущему максимальному разряду    
    //возвращается пустая строока
    const generateWordGreatherHundred = (
        currentNumRank:NumRank,
        previousNumRank:NumRank
    ):string => (number < currentNumRank) 
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

    } else if (number < NumRank.hundred) {
        remainder = number % NumRank.ten;
        word = StrTentsLessThanHundred[Math.floor(number / NumRank.ten)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + StrLessThanTwenty[remainder];
            remainder = 0;
        }
    } else if (!(word = generateWordGreatherHundred(
                NumRank.thousand, 
                NumRank.hundred
            )))
            if (!(word = generateWordGreatherHundred(
                NumRank.million, 
                NumRank.thousand
            )))
            if (!(word = generateWordGreatherHundred(
                NumRank.billion, 
                NumRank.million
            )))
            if (!(word = generateWordGreatherHundred(
                NumRank.trillion, 
                NumRank.billion
            )))
            if (!(word = generateWordGreatherHundred(
                NumRank.quadrillion, 
                NumRank.billion
            )))
            if (!(word = generateWordGreatherHundred(
                NumRank.max, 
                NumRank.quadrillion
            ))){ word = generateWord(NumRank.quadrillion)}

    words.push(word);
    return generateWords(remainder, words);
}


console.log(toWords(Number.MAX_SAFE_INTEGER));