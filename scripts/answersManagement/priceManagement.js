let multiplier = 2;

export function setTravellerCount() {
    let travellerCount = 2;

    try {
        const data = localStorage.getItem('travellerCount');
        if (data) {
            const json = JSON.parse(data);
            travellerCount = json.travellerCount || 2;
        }
    } catch (error) {
        console.error("Error reading traveller count from localStorage:", error);
    }

    multiplier = travellerCount;
}

export const priceManagement = [
    {
        value: "iki 700€ asm.",
        filterValues: [
            {
                type: 15,
                values: [
                    {
                        id: "", 
                        value: `0-${multiplier * 700}`
                    }
                ]
            }
        ],
        providers: []
    },
    {
        value: "iki 1000€ asm.",
        filterValues: [
            {
                type: 15,
                values: [
                    {
                        id: "", 
                        value: `0-${multiplier * 1000}`
                    }
                ]
            }
        ],
        providers: []
    },
    {
        value: "virš 1000€ asm.",
        filterValues: [
            {
                type: 15,
                values: [
                    {
                        id: "", 
                        value: `${multiplier * 1000}-10000000`
                    }
                ]
            }
        ],
        providers: []
    },
    {
        value: "",
        filterValues: [
            {
                type: 15,
                values: [
                    {
                        id: "", 
                        value: "0-10000000",
                    }
                ]
            }
        ],
        providers: []
    }
];