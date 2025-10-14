"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUIQuestion = toUIQuestion;
exports.toFirestoreQuestion = toFirestoreQuestion;
// Convert Firestore question to UI question format
function toUIQuestion(question) {
    return __assign(__assign({}, question), { options: Array.isArray(question.options)
            ? question.options.map(function (opt, idx) { return ({
                id: "opt-".concat(idx + 1),
                text: typeof opt === 'string' ? opt : opt.text || "Option ".concat(idx + 1)
            }); })
            : [] });
}
// Convert UI question to Firestore format
function toFirestoreQuestion(question) {
    return __assign(__assign({}, question), { options: question.options.map(function (opt) { return ({
            id: typeof opt === 'string' ? "opt-".concat(opt) : opt.id,
            text: typeof opt === 'string' ? opt : opt.text
        }); }) });
}
