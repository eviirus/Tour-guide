const currentYear = new Date().getFullYear();

export const seasonManagement = [
    {
        season: "Vasarą",
        beginDates: [
            `${currentYear}-07-01T00:00:00Z`,
            `${currentYear}-07-31T00:00:00Z`
        ],
    },
    {
        season: "Rudenį",
        beginDates: [
            `${currentYear}-10-01T00:00:00Z`,
            `${currentYear}-10-30T00:00:00Z`
        ],
    },
    {
        season: "Žiemą",
        beginDates: [
            `${currentYear}-02-01T00:00:00Z`,
            `${currentYear}-02-28T00:00:00Z`
        ],
    },
    {
        season: "Pavasarį",
        beginDates: [
            `${currentYear}-04-01T00:00:00Z`,
            `${currentYear}-04-30T00:00:00Z`
        ],
    }
];