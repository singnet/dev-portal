// package: example_service
// file: example.proto

var example_pb = require("./example_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Calculator = (function () {
    function Calculator() {}
    Calculator.serviceName = "example_service.Calculator";
    return Calculator;
})();

Calculator.add = {
    methodName: "add",
    service: Calculator,
    requestStream: false,
    responseStream: false,
    requestType: example_pb.Numbers,
    responseType: example_pb.Result,
};

Calculator.sub = {
    methodName: "sub",
    service: Calculator,
    requestStream: false,
    responseStream: false,
    requestType: example_pb.Numbers,
    responseType: example_pb.Result,
};

Calculator.mul = {
    methodName: "mul",
    service: Calculator,
    requestStream: false,
    responseStream: false,
    requestType: example_pb.Numbers,
    responseType: example_pb.Result,
};

Calculator.div = {
    methodName: "div",
    service: Calculator,
    requestStream: false,
    responseStream: false,
    requestType: example_pb.Numbers,
    responseType: example_pb.Result,
};

exports.Calculator = Calculator;

function CalculatorClient(serviceHost, options) {
    this.serviceHost = serviceHost;
    this.options = options || {};
}

CalculatorClient.prototype.add = function add(
    requestMessage,
    metadata,
    callback
) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(Calculator.add, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        },
    });
    return {
        cancel: function () {
            callback = null;
            client.close();
        },
    };
};

CalculatorClient.prototype.sub = function sub(
    requestMessage,
    metadata,
    callback
) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(Calculator.sub, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        },
    });
    return {
        cancel: function () {
            callback = null;
            client.close();
        },
    };
};

CalculatorClient.prototype.mul = function mul(
    requestMessage,
    metadata,
    callback
) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(Calculator.mul, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        },
    });
    return {
        cancel: function () {
            callback = null;
            client.close();
        },
    };
};

CalculatorClient.prototype.div = function div(
    requestMessage,
    metadata,
    callback
) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(Calculator.div, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        },
    });
    return {
        cancel: function () {
            callback = null;
            client.close();
        },
    };
};

exports.CalculatorClient = CalculatorClient;
