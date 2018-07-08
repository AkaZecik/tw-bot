function asynchronousLoop (iterations, func, callback) {
    let i = -1;

    let loop = {
        go: function () {
            if(i + 1 < iterations) {
                i++;
                func();
            } else
                loop.break();
        },
        iteration: function () {
            return i;
        },
        break: function () {
            callback();
        }
    };

    return loop;
}