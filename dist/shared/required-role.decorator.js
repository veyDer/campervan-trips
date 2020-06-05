"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredRole = void 0;
const common_1 = require("@nestjs/common");
const const_1 = require("./const");
exports.RequiredRole = (role) => common_1.SetMetadata(const_1.CONST.ROLE, role);
//# sourceMappingURL=required-role.decorator.js.map