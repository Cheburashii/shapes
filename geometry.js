const shapes = require('./shapes.js');
function twoPointsDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function area(shape) {
    switch (shape.constructor.name) {
        case shapes.Rectangle.name:
            return shape.width * shape.height;
        case shapes.Circle.name:
            return Math.pow(shape.r, 2) * Math.PI;
        case shapes.Ring.name:
            return (Math.pow(shape.r2, 2) * Math.PI) - (Math.pow(shape.r1, 2) * Math.PI);
        default:
            throw new TypeError();
    }
}

function contourLength(shape) {
    switch (shape.constructor.name) {
        case shapes.Rectangle.name:
            return (shape.width * 2) + (shape.height * 2);
        case shapes.Circle.name:
            return Math.PI * shape.r * 2;
        case shapes.Ring.name:
            return (Math.PI * shape.r1 * 2) + (Math.PI * shape.r2 * 2);
        default:
            throw new TypeError();
    }
}

function contains(shape, point) {
    switch (shape.constructor.name) {
        case shapes.Rectangle.name:
            return (point.x >= shape.x || point.x <= shape.x + shape.width) &&
                (point.y >= shape.y || point.y <= shape.y + shape.height);
        case shapes.Circle.name:
            return twoPointsDistance(shape.x, shape.y, point.x, point.y) <= shape.r;
        case shapes.Ring.name:
            let distance = twoPointsDistance(shape.x, shape.y, point.x, point.y);
            return distance < shape.r2 && distance > shape.r1;
        default:
            throw new TypeError();
    }
}

function intersects(shape1, shape2) {
    let valueToReturn = null;
    [[shape1, shape2], [shape2, shape1]].forEach(function(item) {
        let innerShape1 = item[0],
            innerShape2 = item[1];
        if (innerShape2.constructor.name === shapes.Rectangle.name) {
            valueToReturn = contains(innerShape1, new shapes.Point(innerShape2.x, innerShape2.y)) ||
                contains(innerShape1, new shapes.Point(innerShape2.x + innerShape2.width, innerShape2.y)) ||
                contains(innerShape1, new shapes.Point(innerShape2.x, innerShape2.y + innerShape2.height)) ||
                contains(innerShape1, new shapes.Point(innerShape2.x + innerShape2.width, innerShape2.y + innerShape2.height));
        } else if (innerShape2.constructor.name === shapes.Ring.name && innerShape1.constructor.name === shapes.Circle.name) {
            let distance = twoPointsDistance(innerShape1.x, innerShape1.y, innerShape2.x, innerShape2.y),
                delta = innerShape2.r1 - innerShape1.r;
            valueToReturn = (delta >= 0)
                ? (distance <= (innerShape1.r + innerShape2.r2)) && (distance >= delta)
                : true;
        }
        switch (innerShape1.constructor.name + ' | ' + innerShape2.constructor.name) {
            case shapes.Circle.name + ' | ' + shapes.Circle.name:
                valueToReturn = twoPointsDistance(innerShape1.x, innerShape1.y, innerShape2.x, innerShape2.y) <= innerShape1.r + innerShape2.r;
                return;
            case shapes.Ring.name + ' | ' + shapes.Ring.name:
                let distance = twoPointsDistance(innerShape1.x, innerShape1.y, innerShape2.x, innerShape2.y),
                    delta = innerShape2.r1 - innerShape1.r2;
                valueToReturn = (delta >= 0)
                    ? (distance <= (innerShape1.r2 + innerShape2.r2)) && (distance >= delta)
                    : true;
                break;
            default:
                break;
        }
    });
    if (valueToReturn === null) {
        throw new TypeError();
    }
    return valueToReturn;
}
module.exports.area = area;
module.exports.contourLength = contourLength;
module.exports.contains = contains;
module.exports.intersects = intersects;