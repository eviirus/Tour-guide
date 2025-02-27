import { countryDetails } from "./answersManagement/countryDetails.js";

function createAdditionalFilters(values) {
    const filters = [];
  
    filters.push({
      "type": 21,
      "values": [
        {
          "id": "2",
          "value": "2",
          "parent": null
        }
      ],
      "providers": null
    });
  
    if (values.hotelCategoryResult && values.hotelCategoryResult.values && values.hotelCategoryResult.values.length > 0) {
      filters.push(values.hotelCategoryResult);
    }
  
    if (values.priceResult && values.priceResult.values && values.priceResult.values.length > 0) {
      filters.push(values.priceResult);
    }
  
    if (values.hotelConceptResult && values.hotelConceptResult.values && values.hotelConceptResult.values.length > 0) {
      filters.push(values.hotelConceptResult);
    }
  
    return filters;
  }

export async function fetchEncryptedData(selectedCountry, values) {
    const countryDetail = countryDetails.find(detail => detail.userSelected === selectedCountry);

    if (!countryDetail) {
        throw new Error(`Country details for ${selectedCountry} not found`);
    }

    const mergedFilters = createAdditionalFilters(values);
    
    const payload = {
        beginDates: values.seasonResult,
        arrivalLocations: countryDetail.arrivalLocation.map(location => ({
            id: location.payloadId,
            locationId: location.payloadLocationId,
            locationUniqueId: location.payloadLocationUniqueId,
            type: location.type,
            name: location.payloadName,
            countryName: location.payloadCountryName,
            friendlyUrl: location.payloadFriendlyUrl,
            parent: location.parent ? {
              countryId: location.parent.payloadCountryId,
              id: location.parent.payloadId,
              name: location.parent.payloadName,
              type: location.parent.type
            } : null,
        })),
        departureLocations: countryDetail.departureLocation.map(location => ({
            id: location.payloadId,
            locationId: location.payloadLocationId,
            locationUniqueId: location.payloadLocationUniqueId,
            type: 5,
            name: location.payloadName,
            friendlyUrl: location.payloadFriendlyUrl,
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
        additionalFilters: mergedFilters,
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