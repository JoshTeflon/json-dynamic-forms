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
exports.__esModule = true;
var react_1 = require("react");
var interface_1 = require("../../components/interface");
var utils_1 = require("../../data/utils");
var classnames_1 = require("classnames");
var DynamicForm = function (_a) {
    var _b;
    var className = _a.className, formDefinition = _a.formDefinition, formData = _a.formData;
    var _c = react_1.useState(formData || {}), formValues = _c[0], setFormValues = _c[1];
    var _d = react_1.useState({}), formErrors = _d[0], setFormErrors = _d[1];
    var _e = react_1.useState(true), hasErrors = _e[0], setHasErrors = _e[1];
    var _f = react_1.useState(0), currentPage = _f[0], setCurrentPage = _f[1];
    react_1.useEffect(function () {
        setHasErrors(Object.values(formErrors).some(function (errors) { return errors.length > 0; }));
    }, [formErrors]);
    var getFieldDefinition = function (fieldName) {
        var pages = formDefinition.pages;
        for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
            var page = pages_1[_i];
            var fields = page.sections.flatMap(function (section) { return section.fields; });
            var field = fields.find(function (field) { return field.name === fieldName; });
            if (field) {
                return field;
            }
        }
        return null;
    };
    // Validate Form Fields  
    var validateField = function (field, value) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        var errors = [];
        //String Validatin
        if (!((field === null || field === void 0 ? void 0 : field.type) === 'checkbox' || (field === null || field === void 0 ? void 0 : field.type) === 'radio')) {
            if (((_a = field === null || field === void 0 ? void 0 : field.validation) === null || _a === void 0 ? void 0 : _a.required) && (value === null || value === void 0 ? void 0 : value.trim()) === '') {
                errors.push('This field is required');
            }
        }
        // Text Input Length Validation
        if ((field === null || field === void 0 ? void 0 : field.type) === 'short_text' || (field === null || field === void 0 ? void 0 : field.type) === 'long_text') {
            if (((_b = field === null || field === void 0 ? void 0 : field.validation) === null || _b === void 0 ? void 0 : _b.minimum) && (value === null || value === void 0 ? void 0 : value.length) < parseInt(field.validation.minimum)) {
                errors.push("Minimum length is " + field.validation.minimum);
            }
            if (((_c = field === null || field === void 0 ? void 0 : field.validation) === null || _c === void 0 ? void 0 : _c.maximum) && (value === null || value === void 0 ? void 0 : value.length) > parseInt(field.validation.maximum)) {
                errors.push("Maximum length is " + field.validation.maximum);
            }
        }
        // DateTime Validation
        if (value && ((field === null || field === void 0 ? void 0 : field.type) === 'date' || (field === null || field === void 0 ? void 0 : field.type) === 'date_time')) {
            var currentDate = new Date();
            var valueDate = new Date(value);
            if ((_d = field === null || field === void 0 ? void 0 : field.validation) === null || _d === void 0 ? void 0 : _d.minimum) {
                var minimumDate = new Date();
                minimumDate.setFullYear(currentDate.getFullYear() - parseInt((_e = field === null || field === void 0 ? void 0 : field.validation) === null || _e === void 0 ? void 0 : _e.minimum));
                if (valueDate < minimumDate) {
                    errors.push("Date can't be " + ((_f = field === null || field === void 0 ? void 0 : field.validation) === null || _f === void 0 ? void 0 : _f.minimum));
                }
            }
            if ((_g = field === null || field === void 0 ? void 0 : field.validation) === null || _g === void 0 ? void 0 : _g.maximum) {
                var maximumDate = new Date();
                maximumDate.setFullYear(currentDate.getFullYear() - parseInt((_h = field === null || field === void 0 ? void 0 : field.validation) === null || _h === void 0 ? void 0 : _h.maximum));
                if (valueDate > maximumDate) {
                    errors.push("Date must be " + ((_j = field === null || field === void 0 ? void 0 : field.validation) === null || _j === void 0 ? void 0 : _j.maximum));
                }
            }
        }
        //Time Validation
        if (value && (field === null || field === void 0 ? void 0 : field.type) === 'time') {
            var currentTime = new Date();
            var enteredTimeParts = value.split(':').map(function (part) { return parseInt(part, 10); });
            var enteredTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), enteredTimeParts[0], enteredTimeParts[1]);
            if ((_k = field === null || field === void 0 ? void 0 : field.validation) === null || _k === void 0 ? void 0 : _k.minimum) {
                var minimumTime = new Date();
                minimumTime.setMinutes(currentTime.getMinutes() - parseInt((_l = field === null || field === void 0 ? void 0 : field.validation) === null || _l === void 0 ? void 0 : _l.minimum));
                if (enteredTime < minimumTime) {
                    errors.push("Time should be at least " + ((_m = field === null || field === void 0 ? void 0 : field.validation) === null || _m === void 0 ? void 0 : _m.minimum));
                }
            }
            if ((_o = field === null || field === void 0 ? void 0 : field.validation) === null || _o === void 0 ? void 0 : _o.maximum) {
                var maximumTime = new Date();
                maximumTime.setHours(currentTime.getHours() + parseInt((_p = field === null || field === void 0 ? void 0 : field.validation) === null || _p === void 0 ? void 0 : _p.maximum));
                if (enteredTime > maximumTime) {
                    errors.push("Time should be at most " + ((_q = field === null || field === void 0 ? void 0 : field.validation) === null || _q === void 0 ? void 0 : _q.maximum));
                }
            }
        }
        // Integer/Number Validation
        if (value && ((field === null || field === void 0 ? void 0 : field.type) === 'integer' || (field === null || field === void 0 ? void 0 : field.type) === 'number')) {
            if (parseInt(value) < parseInt((_r = field === null || field === void 0 ? void 0 : field.validation) === null || _r === void 0 ? void 0 : _r.minimum)) {
                errors.push("value shouldn't be less than " + ((_s = field === null || field === void 0 ? void 0 : field.validation) === null || _s === void 0 ? void 0 : _s.minimum));
            }
            if (parseInt(value) > parseInt((_t = field === null || field === void 0 ? void 0 : field.validation) === null || _t === void 0 ? void 0 : _t.maximum)) {
                errors.push("value shouldn't be more than " + ((_u = field === null || field === void 0 ? void 0 : field.validation) === null || _u === void 0 ? void 0 : _u.maximum));
            }
        }
        //Email Validation
        if (value && (field === null || field === void 0 ? void 0 : field.type) === 'email') {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errors.push('Invalid email address');
            }
        }
        //Checkbox Validation
        if ((field === null || field === void 0 ? void 0 : field.type) === 'checkbox' || (field === null || field === void 0 ? void 0 : field.type) === 'radio') {
            if (((_v = field === null || field === void 0 ? void 0 : field.validation) === null || _v === void 0 ? void 0 : _v.required) && !value) {
                errors.push((field === null || field === void 0 ? void 0 : field.name) + " is required");
            }
        }
        return errors;
    };
    var validateFiles = function (field, value) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var errors = [];
        // File Input Validation
        if ((field === null || field === void 0 ? void 0 : field.type) === 'upload' || (field === null || field === void 0 ? void 0 : field.type) === 'image' || (field === null || field === void 0 ? void 0 : field.type) === 'audio' || (field === null || field === void 0 ? void 0 : field.type) === 'video') {
            if (((_a = field === null || field === void 0 ? void 0 : field.validation) === null || _a === void 0 ? void 0 : _a.required) && !(value === null || value === void 0 ? void 0 : value.length)) {
                errors.push("Please upload " + (field === null || field === void 0 ? void 0 : field.name));
            }
        }
        if ((field === null || field === void 0 ? void 0 : field.type) === 'upload' && (value === null || value === void 0 ? void 0 : value.length)) {
            if ((_b = field === null || field === void 0 ? void 0 : field.validation) === null || _b === void 0 ? void 0 : _b.maximum) {
                var maxSizeInBytes = parseInt((_c = field === null || field === void 0 ? void 0 : field.validation) === null || _c === void 0 ? void 0 : _c.maximum);
                if (value[0].size > (maxSizeInBytes) * 1024 * 1024) {
                    errors.push("File size exceeds the maximum limit of " + ((_d = field === null || field === void 0 ? void 0 : field.validation) === null || _d === void 0 ? void 0 : _d.maximum));
                }
            }
        }
        if ((value === null || value === void 0 ? void 0 : value.length) && ((field === null || field === void 0 ? void 0 : field.type) === 'audio' || (field === null || field === void 0 ? void 0 : field.type) === 'video')) {
            var duration = utils_1.getMediaDuration(value[0]);
            if (((_e = field === null || field === void 0 ? void 0 : field.validation) === null || _e === void 0 ? void 0 : _e.minimum) && duration < ((_f = field === null || field === void 0 ? void 0 : field.validation) === null || _f === void 0 ? void 0 : _f.minimum)) {
                errors.push((field === null || field === void 0 ? void 0 : field.type) + " should be at least " + ((_g = field === null || field === void 0 ? void 0 : field.validation) === null || _g === void 0 ? void 0 : _g.minimum));
            }
            if (((_h = field === null || field === void 0 ? void 0 : field.validation) === null || _h === void 0 ? void 0 : _h.maximum) && duration > ((_j = field === null || field === void 0 ? void 0 : field.validation) === null || _j === void 0 ? void 0 : _j.maximum)) {
                errors.push((field === null || field === void 0 ? void 0 : field.type) + " should be at most " + ((_k = field === null || field === void 0 ? void 0 : field.validation) === null || _k === void 0 ? void 0 : _k.maximum));
            }
        }
        return errors;
    };
    var handleInputChange = function (event) {
        var name = event.target.name;
        var fieldDefinition = getFieldDefinition(name);
        if (event.target.type === 'checkbox') {
            var checked_1 = event.target.checked;
            var errors_1 = validateField(fieldDefinition, checked_1);
            setFormValues(function (prevFormValues) {
                var _a;
                return (__assign(__assign({}, prevFormValues), (_a = {}, _a[name] = checked_1, _a)));
            });
            setFormErrors(function (prevFormErrors) {
                var _a;
                return (__assign(__assign({}, prevFormErrors), (_a = {}, _a[name] = errors_1, _a)));
            });
        }
        else if (event.target.type === 'file') {
            var files_1 = event.target.files;
            var errors_2 = validateFiles(fieldDefinition, files_1);
            setFormValues(function (prevFormValues) {
                var _a;
                return (__assign(__assign({}, prevFormValues), (_a = {}, _a[name] = files_1, _a)));
            });
            setFormErrors(function (prevFormErrors) {
                var _a;
                return (__assign(__assign({}, prevFormErrors), (_a = {}, _a[name] = errors_2, _a)));
            });
        }
        else {
            var value_1 = event.target.value;
            var errors_3 = validateField(fieldDefinition, value_1);
            setFormValues(function (prevFormValues) {
                var _a;
                return (__assign(__assign({}, prevFormValues), (_a = {}, _a[name] = value_1, _a)));
            });
            setFormErrors(function (prevFormErrors) {
                var _a;
                return (__assign(__assign({}, prevFormErrors), (_a = {}, _a[name] = errors_3, _a)));
            });
        }
    };
    var handleRemoveFile = function (fileInputName) {
        setFormValues(function (prevFormValues) {
            var _a;
            return (__assign(__assign({}, prevFormValues), (_a = {}, _a[fileInputName] = [], _a)));
        });
    };
    var handleFormSubmit = function (event) {
        event.preventDefault();
        console.log(hasErrors, 'hasErrors');
        if (hasErrors) {
            alert('Form has errors. Please fix them before submitting.');
            return;
        }
        console.log('Form submitted:', formValues);
        console.log('Errors:', formErrors);
    };
    // Control page views
    var handleButtonClick = function (action) {
        var isFirstPage = currentPage === 0;
        var isLastPage = currentPage === formDefinition.pages.length - 1;
        if (!isFirstPage && (action === null || action === void 0 ? void 0 : action.type) === 'cancel') {
            setCurrentPage(function (prevPage) { return prevPage - 1; });
        }
        if (!isLastPage && (action === null || action === void 0 ? void 0 : action.type) === 'continue') {
            setCurrentPage(function (prevPage) { return prevPage + 1; });
        }
    };
    // Render views
    var renderFormFields = function (fields) {
        return fields === null || fields === void 0 ? void 0 : fields.map(function (field) {
            var _a, _b, _c;
            var value = formValues[field === null || field === void 0 ? void 0 : field.name] || '';
            var errors = formErrors[field === null || field === void 0 ? void 0 : field.name] || [];
            switch (field === null || field === void 0 ? void 0 : field.type) {
                case 'short_text':
                    return (react_1["default"].createElement("div", { className: 'dynamic-form__page__section--input', key: field === null || field === void 0 ? void 0 : field.label },
                        react_1["default"].createElement(interface_1.Input, { label: field === null || field === void 0 ? void 0 : field.label, description: field === null || field === void 0 ? void 0 : field.description, name: field === null || field === void 0 ? void 0 : field.name, id: field === null || field === void 0 ? void 0 : field.id, value: value, onChange: handleInputChange, error: errors.length > 0 ? errors[0] : '' })));
                case 'date_time':
                    return (react_1["default"].createElement("div", { className: 'dynamic-form__page__section--input', key: field === null || field === void 0 ? void 0 : field.label },
                        react_1["default"].createElement(interface_1.Input, { label: field === null || field === void 0 ? void 0 : field.label, description: field === null || field === void 0 ? void 0 : field.description, name: field === null || field === void 0 ? void 0 : field.name, id: field === null || field === void 0 ? void 0 : field.id, value: value, onChange: handleInputChange, type: 'datetime-local', error: errors.length > 0 ? errors[0] : '' })));
                case 'phone':
                    return (react_1["default"].createElement("div", { className: 'dynamic-form__page__section--input', key: field === null || field === void 0 ? void 0 : field.label },
                        react_1["default"].createElement(interface_1.Input, { label: field === null || field === void 0 ? void 0 : field.label, description: field === null || field === void 0 ? void 0 : field.description, name: field === null || field === void 0 ? void 0 : field.name, id: field === null || field === void 0 ? void 0 : field.id, value: value, onChange: handleInputChange, type: 'tel', error: errors.length > 0 ? errors[0] : '' })));
                case 'integer':
                case 'number':
                    return (react_1["default"].createElement("div", { className: 'dynamic-form__page__section--input', key: field === null || field === void 0 ? void 0 : field.label },
                        react_1["default"].createElement(interface_1.Input, { label: field === null || field === void 0 ? void 0 : field.label, description: field === null || field === void 0 ? void 0 : field.description, name: field === null || field === void 0 ? void 0 : field.name, id: field === null || field === void 0 ? void 0 : field.id, value: value, onChange: handleInputChange, type: 'number', error: errors.length > 0 ? errors[0] : '' })));
                case 'date':
                case 'time':
                case 'email':
                    return (react_1["default"].createElement("div", { className: 'dynamic-form__page__section--input', key: field === null || field === void 0 ? void 0 : field.label },
                        react_1["default"].createElement(interface_1.Input, { label: field === null || field === void 0 ? void 0 : field.label, description: field === null || field === void 0 ? void 0 : field.description, name: field === null || field === void 0 ? void 0 : field.name, id: field === null || field === void 0 ? void 0 : field.id, value: value, onChange: handleInputChange, type: field === null || field === void 0 ? void 0 : field.type, error: errors.length > 0 ? errors[0] : '' })));
                case 'long_text':
                    return (react_1["default"].createElement("div", { className: 'dynamic-form__page__section--input', key: field === null || field === void 0 ? void 0 : field.label },
                        react_1["default"].createElement(interface_1.Textarea, { label: field === null || field === void 0 ? void 0 : field.label, description: field === null || field === void 0 ? void 0 : field.description, name: field === null || field === void 0 ? void 0 : field.name, id: field === null || field === void 0 ? void 0 : field.id, value: value, onChange: handleInputChange, rows: ((_a = field === null || field === void 0 ? void 0 : field.validation) === null || _a === void 0 ? void 0 : _a.number_of_lines) || 4, error: errors.length > 0 ? errors[0] : '' })));
                case 'checkbox':
                case 'radio':
                    return (react_1["default"].createElement("div", { className: 'dynamic-form__page__section--input', key: field === null || field === void 0 ? void 0 : field.label },
                        react_1["default"].createElement(interface_1.Label, { id: field === null || field === void 0 ? void 0 : field.id, label: field === null || field === void 0 ? void 0 : field.label, description: field === null || field === void 0 ? void 0 : field.description }), (_b = field === null || field === void 0 ? void 0 : field.options) === null || _b === void 0 ? void 0 :
                        _b.map(function (i) {
                            return (react_1["default"].createElement(interface_1.CheckboxRadio, { key: i === null || i === void 0 ? void 0 : i.id, name: field === null || field === void 0 ? void 0 : field.name, id: i === null || i === void 0 ? void 0 : i.id, label: i === null || i === void 0 ? void 0 : i.label, onChange: handleInputChange, type: field === null || field === void 0 ? void 0 : field.type }));
                        }),
                        errors.length > 0 && react_1["default"].createElement("p", { className: 'input__error' }, errors[0])));
                case 'label':
                    return (react_1["default"].createElement("div", { key: field === null || field === void 0 ? void 0 : field.label, className: 'dynamic-form__page__section--input' },
                        react_1["default"].createElement(interface_1.Label, { key: field === null || field === void 0 ? void 0 : field.label, id: field === null || field === void 0 ? void 0 : field.id, label: field === null || field === void 0 ? void 0 : field.name, description: field === null || field === void 0 ? void 0 : field.description })));
                case 'dropdown':
                    return (react_1["default"].createElement("div", { key: field === null || field === void 0 ? void 0 : field.label, className: 'dynamic-form__page__section--input' },
                        react_1["default"].createElement(interface_1.Select, { label: field === null || field === void 0 ? void 0 : field.label, description: field === null || field === void 0 ? void 0 : field.description, name: field === null || field === void 0 ? void 0 : field.name, id: field === null || field === void 0 ? void 0 : field.id, options: field === null || field === void 0 ? void 0 : field.options, onChange: handleInputChange, error: errors.length > 0 ? errors[0] : '' })));
                case 'upload':
                    return (react_1["default"].createElement("div", { key: field === null || field === void 0 ? void 0 : field.label, className: 'dynamic-form__page__section--input' },
                        react_1["default"].createElement(interface_1.FileInput, { label: field === null || field === void 0 ? void 0 : field.label, description: field === null || field === void 0 ? void 0 : field.description, name: field === null || field === void 0 ? void 0 : field.name, id: field === null || field === void 0 ? void 0 : field.id, onChange: handleInputChange, file: formValues[field === null || field === void 0 ? void 0 : field.name] || [], accept: utils_1.appendFullStop((_c = field === null || field === void 0 ? void 0 : field.validation) === null || _c === void 0 ? void 0 : _c.allowed), handleRemove: function () { return handleRemoveFile(field === null || field === void 0 ? void 0 : field.name); }, error: errors.length > 0 ? errors[0] : '' })));
                case 'image':
                case 'audio':
                case 'video':
                    return (react_1["default"].createElement("div", { key: field === null || field === void 0 ? void 0 : field.label, className: 'dynamic-form__page__section--input' },
                        react_1["default"].createElement(interface_1.FileInput, { key: field === null || field === void 0 ? void 0 : field.label, label: field === null || field === void 0 ? void 0 : field.label, description: field === null || field === void 0 ? void 0 : field.description, name: field === null || field === void 0 ? void 0 : field.name, id: field === null || field === void 0 ? void 0 : field.id, onChange: handleInputChange, file: formValues[field === null || field === void 0 ? void 0 : field.name] || [], accept: field.type + "/*", handleRemove: function () { return handleRemoveFile(field === null || field === void 0 ? void 0 : field.name); }, error: errors.length > 0 ? errors[0] : '' })));
                default:
                    return null;
            }
        });
    };
    var renderSections = function (sections) {
        return sections.map(function (section) {
            return (react_1["default"].createElement("div", { className: 'dynamic-form__page__section', key: section.name },
                react_1["default"].createElement("div", { className: 'dynamic-form__page__section--header' },
                    react_1["default"].createElement("h2", null,
                        section.name,
                        ":"),
                    react_1["default"].createElement("p", null, section.description)),
                renderFormFields(section.fields)));
        });
    };
    var renderPages = function (page) {
        return (react_1["default"].createElement("div", { className: 'dynamic-form__page', key: page.name },
            react_1["default"].createElement("div", { className: 'dynamic-form__page--header' },
                react_1["default"].createElement("h2", { style: { fontSize: '1.75rem' } }, page.title),
                react_1["default"].createElement("p", null, page.description)),
            renderSections(page.sections)));
    };
    var renderActions = function (actions) {
        return (react_1["default"].createElement("div", { className: 'actions' }, actions === null || actions === void 0 ? void 0 : actions.map(function (action) {
            return (react_1["default"].createElement(interface_1.Button, { key: action === null || action === void 0 ? void 0 : action.label, className: 'actions-btn', variant: (action === null || action === void 0 ? void 0 : action.type) === 'submit' ? 'primary' : 'outlined', type: (action === null || action === void 0 ? void 0 : action.type) === 'submit' ? 'submit' : 'button', onClick: function () { return handleButtonClick(action); } }, action === null || action === void 0 ? void 0 : action.label));
        })));
    };
    return (react_1["default"].createElement("div", { className: classnames_1["default"]('dynamic-form', className) },
        react_1["default"].createElement("form", { style: { width: '100%' }, onSubmit: handleFormSubmit },
            renderPages(formDefinition.pages[currentPage]),
            renderActions((_b = formDefinition.pages[currentPage]) === null || _b === void 0 ? void 0 : _b.actions))));
};
exports["default"] = DynamicForm;
