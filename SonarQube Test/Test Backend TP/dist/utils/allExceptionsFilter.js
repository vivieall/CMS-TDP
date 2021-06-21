"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor() {
        this.logger = new common_1.Logger('Exception Filter');
    }
    catch(exception, host) {
        var _a, _b, _c, _d, _e;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = (_b = (_a = exception.getStatus) === null || _a === void 0 ? void 0 : _a.call(exception)) !== null && _b !== void 0 ? _b : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let description = (_e = (_d = (_c = exception.getResponse) === null || _c === void 0 ? void 0 : _c.call(exception)) !== null && _d !== void 0 ? _d : exception.message) !== null && _e !== void 0 ? _e : exception;
        try {
            description = JSON.parse(description);
        }
        catch (error) { }
        if (status != 404)
            this.logger.error(exception);
        response.status(status).send({
            description
        });
    }
};
AllExceptionsFilter = __decorate([
    common_1.Catch(),
    __metadata("design:paramtypes", [])
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=allExceptionsFilter.js.map