const typeReverse = {
    0: {
        label: "New"
    },
    1: {
        label: "Remove"
    },
    2: {
        label: "Upgrade"
    }
}

async function toLabel(type) {
    return typeReverse[type].label;
}

module.exports = {
    toLabel
};