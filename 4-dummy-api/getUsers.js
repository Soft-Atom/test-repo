"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// в доке по API не указано описание неуспешных ответов
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["male"] = "male";
    GenderEnum["female"] = "femal";
})(GenderEnum || (GenderEnum = {}));
var BloodGroupEnum;
(function (BloodGroupEnum) {
    BloodGroupEnum["APlus"] = "A+";
    BloodGroupEnum["AMinus"] = "A-";
    BloodGroupEnum["BPlus"] = "B+";
    BloodGroupEnum["BMinus"] = "B-";
    BloodGroupEnum["ABPlus"] = "AB+";
    BloodGroupEnum["ABMinus"] = "AB-";
    BloodGroupEnum["ZeroPlus"] = "0+";
    BloodGroupEnum["ZeroMinus"] = "0-";
})(BloodGroupEnum || (BloodGroupEnum = {}));
function myFetch(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url);
        if (!res.ok) {
            throw new Error('Не удалоось загрузить данные с сервера');
        }
        return res.json();
    });
}
function assertUserResponse(obj) {
    if (typeof obj === 'object' && !!obj
        && 'total' in obj && typeof obj.total === 'number' && obj.total > 0) {
        return;
    }
    throw new Error('Неверный ответ от сервера');
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://dummyjson.com/uses';
        const data = yield myFetch(url);
        assertUserResponse(data);
        console.log(data.users);
    });
}
function wrappedQuery(f) {
    try {
        return (...args) => {
            return f(...args);
        };
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(e);
        }
    }
}
const query = wrappedQuery(getUsers);
if (query) {
    query();
}
