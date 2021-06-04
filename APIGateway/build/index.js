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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var version = { version: "1.0.8" };
var PORT = process.env.PORT || 45005;
var my_node_name = process.env.MY_NODE_NAME;
var my_pod_name = process.env.MY_POD_NAME;
var my_pod_namespace = process.env.MY_POD_NAMESPACE;
var my_pod_ip = process.env.MY_POD_IP;
var my_pod_service_account = process.env.MY_POD_SERVICE_ACCOUNT;
var kubeDescription;
if (my_node_name !== undefined) {
    kubeDescription = "node name: \t\t" + my_node_name + "\npod name: \t\t" + my_pod_name + "\nnamespace: \t\t" + my_pod_namespace + "\nIP: \t\t" + my_pod_ip + "\nService Account: \t\t" + my_pod_service_account + "\n";
}
else {
    kubeDescription: "No kubernetes";
}
var app = express_1.default();
app.get("/", function (req, res) {
    if (my_node_name !== undefined) {
        var result = {
            message: "Connection made",
            version: version.version,
            kubernetes: {
                node: {
                    name: my_node_name,
                },
                pod: {
                    name: my_pod_name,
                    namespace: my_pod_namespace,
                    ip: my_pod_ip,
                    service_account: my_pod_service_account,
                },
            },
        };
        res.json(result);
    }
    else {
        res.send("Connection made");
    }
});
app.get("/auth/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ip, result, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                ip = "http://authentication-service:31228/";
                return [4 /*yield*/, node_fetch_1.default(ip)];
            case 1:
                result = _c.sent();
                _b = (_a = res).json;
                return [4 /*yield*/, result.json()];
            case 2:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () {
    console.log("The application version: " + version.version + " is listening on port " + PORT + "! \n" + kubeDescription);
});
