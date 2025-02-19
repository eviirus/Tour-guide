let multiplier = 2;

export function setTravellerCount() {
  let travellerCount = 2;

  try {
    const data = localStorage.getItem("travellerCount");
    if (data) {
      const json = JSON.parse(data);
      travellerCount = json.travellerCount;
    }
  } catch (error) {
    console.error(error);
  }

  multiplier = travellerCount;
}

export function getPriceManagement(){
  return [
    {
      value: "iki 700€ asm.",
      filterValues: {
        type: 15,
        values: [
          {
            id: "",
            value: `0-${multiplier * 700}`,
          },
        ],
      },
    },
    {
      value: "iki 1000€ asm.",
      filterValues: {
        type: 15,
        values: [
          {
            id: "",
            value: `0-${multiplier * 1000}`,
          },
        ],
      },
    },
    {
      value: "virš 1000€ asm.",
      filterValues: {
        type: 15,
        values: [
          {
            id: "",
            value: `${multiplier * 1000}-10000000`,
          },
        ],
      },
    },
    {
      value: "",
      filterValues: {
        type: 15,
        values: []
      }
    },
  ];  
} 