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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var interface_1 = require("./components/interface");
var pages_1 = require("./pages");
var forms_json_1 = require("../src/data/forms.json");
require("./App.scss");
function App() {
    var _this = this;
    var _a, _b;
    var formDefinition = JSON.parse(JSON.stringify(forms_json_1["default"]));
    var handleCopy = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.writeText((_a = formDefinition === null || formDefinition === void 0 ? void 0 : formDefinition.meta) === null || _a === void 0 ? void 0 : _a.url)];
                case 1:
                    _b.sent();
                    alert('Text Copied!');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    alert("Failed to copy text: " + error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { style: { margin: '1rem 0' } },
        React.createElement("div", { style: { textAlign: 'center' } },
            React.createElement("h1", { style: { color: '#39cdcc' } }, (_a = formDefinition === null || formDefinition === void 0 ? void 0 : formDefinition.meta) === null || _a === void 0 ? void 0 : _a.name),
            React.createElement("p", null, (_b = formDefinition === null || formDefinition === void 0 ? void 0 : formDefinition.meta) === null || _b === void 0 ? void 0 : _b.Description),
            React.createElement(interface_1.Button, { variant: 'link', onClick: handleCopy }, "Copy Form URL")),
        React.createElement(pages_1.DynamicForm, { formDefinition: formDefinition, formData: forms_json_1["default"] })));
}
exports["default"] = App;
