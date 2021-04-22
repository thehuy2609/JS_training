var countModule = (function () {
    var count = 0;
    var log = function (funcName) {
        console.log(funcName, count);
    }
    return {
        increase: function () {
            count++;
            log("increase");
        },
        decrease: function () {
            count--;
            log("decrease");
        },
        reset: function () {
            count = 0;
            log("reset");
        }
    }
})();
var x;
true && (x = 20);