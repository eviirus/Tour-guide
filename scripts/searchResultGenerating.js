import { countryDetails } from "./answersManagement/countryDetails.js";

export async function fetchEncryptedData(selectedCountry, values) {
    const countryDetail = countryDetails.find(detail => detail.userSelected === selectedCountry);

    if (!countryDetail) {
        throw new Error(`Country details for ${selectedCountry} not found`);
    }

    const payload = {
        beginDates: values.seasonResult,
        arrivalLocations: countryDetail.arrivalLocation.map(location => ({
            isFullFilled: true,
            isDefault: null,
            countryIds: [],
            nearestAreas: null,
            nearestPlaces: [],
            nearestAirportIds: [],
            areaEeId: null,
            placeEeId: null,
            id: location.payloadId,
            locationId: location.payloadLocationId,
            locationUniqueId: location.payloadLocationUniqueId,
            type: 0,
            name: location.payloadName,
            countryName: location.payloadCountryName,
            friendlyUrl: location.payloadFriendlyUrl,
            transportPointId: null,
            tourId: null,
            parent: null,
            children: null
        })),
        departureLocations: countryDetail.departureLocation.map(location => ({
            id: location.payloadId,
            locationId: location.payloadLocationId,
            locationUniqueId: location.payloadLocationUniqueId,
            type: 5,
            name: location.payloadName,
            countryName: null,
            friendlyUrl: location.payloadFriendlyUrl,
            transportPointId: null,
            tourId: null,
            parent: null,
            children: null
        })),
        nights: values.nightResult,
        datePickerMode: 0,
        roomCriterias: [
            {
                passengers: values.travellerResult,
            }
        ],
        reservationType: 1,
        paging: {
            pageNumber: 1,
            pageSize: 20,
            sortType: 0
        },
        additionalFilters: values.priceResult,
        imageSizes: [0],
        flightType: 2
    };

    try {
        const response = await fetch("https://www.coraltravel.lt/endpoints/PackageTourHotelProduct/PriceSearchEncrypt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text/plain, */*",
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const encryptedData = await response.json();

        const { redirectionUrl, queryParam } = encryptedData.result;

        const link = `https://www.coraltravel.lt${redirectionUrl}?qp=${queryParam}&p=1&s=0&w=0`;

        return link;

    } catch (error) {
        console.error("Error:", error);
    }
}