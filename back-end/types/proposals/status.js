const statusReverse = {
    0: {
        label: "Proposed",
        definition: "Created"
    },
    1: {
        label: "Reviewing",
        definition: "Reviewing"
    },
    2: {
        label: "Approved",
        definition: "Approved for voting"
    },
    3: {
        label: "Rejected",
        definition: "Rejected by the government"
    },
    4: {
        label: "VotePassed",
        definition: "Suceeded!"
    },
    5: {
        label: "VoteFailed",
        definition: "Did not pass"
    },
    6: {
        label: "Actioned",
        definition: "Being executed by the govermented"
    },
    7: {
        label: "Closed",
        definition: "Closed"
    }
}

async function toLabel(type) {
    return statusReverse[type].label;
}

async function toDefinition(type) {
    return statusReverse[type].definition;
}

module.exports = {
    toLabel,
    toDefinition
};