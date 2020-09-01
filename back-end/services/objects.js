module.exports.wait = async function(ms) {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, ms);
    })
}

module.exports.copyObj = function copyObj(obj) {
    return Object.assign({}, obj);
}

module.exports.mergeObj = function mergeObj(obj1, obj2) {
    return {
        ...obj1,
        ...obj2
    }
}