function checkIsNumber(arr) {
    return Array.prototype.every.call(arr, (item) => !isNaN(Number(item)));
}
class Shape {
    constructor(x, y) {
        this.shape = true;
        this.x = x;
        this.y = y;
    }
}

class Point extends Shape {
    constructor(x, y) {
        if (!checkIsNumber(arguments)) {
            throw new TypeError();
        }
        super(x, y);
    }
}

class Rectangle extends Shape {
    constructor(width, height, x, y) {
        if (!checkIsNumber(arguments) || width < 0 || height < 0) {
            throw new TypeError();
        }
        super(x, y);
        this.width = width;
        this.height = height;
    }
}

class Circle extends Shape {
    constructor(x, y, r) {
        if (!checkIsNumber(arguments) || r < 0) {
            throw new TypeError();
        }
        super(x, y);
        this.r = r;
    }
}

class Ring extends Shape {
    constructor(x, y, r1, r2) {
        if (!checkIsNumber(arguments) || r2 < r1 || r1 < 0 || r2 < 0) {
            throw new TypeError();
        }
        super(x, y);
        this.r1 = r1;
        this.r2 = r2;
    }
}

module.exports.Point = Point;
module.exports.Ring = Ring;
module.exports.Circle = Circle;
module.exports.Rectangle = Rectangle;