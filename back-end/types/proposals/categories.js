const categoryReverse = {
    0: {
        label: "Green"
    },
    1: {
        label: "Kids"
    },
    2: {
        label: "Safety"
    },
    3: {
        label: "Accessibility"
    },
    4: {
        label: "Art"
    },
    5: {
        label: "Health"
    },
    6: {
        label: "Road"
    },
    7: {
        label: "Residential"
    }
}

async function toLabel(type) {
    return categoryReverse[type].label;
}

module.exports = {
    toLabel
};