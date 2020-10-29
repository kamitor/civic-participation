const ProposalCategory = {
    Green: 0,
    Kids: 1,
    Road: 2
}

export default ProposalCategory;

const categoryReverse = {
    0: {
        label: "Green",
        icon: "some icon code...???"
    },
    1: {
        label: "Kids"
    },
    2: {
        label: "Road"
    }
}

export function toLabel(type) {
    return categoryReverse[type].label;
}