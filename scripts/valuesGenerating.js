import { setTravellerCount } from './answersManagement/priceManagement.js';

class ValuesGenerating{
    constructor(guide, nightManagement, priceManagement, seasonManagement, travellerManagement, hotelCategoryManagement, hotelConceptManagement){
        this.guide = guide;

        this.nightManagement = nightManagement;
        this.travellerManagement = travellerManagement;
        this.seasonManagement = seasonManagement;
        this.priceManagement = priceManagement;
        this.hotelCategoryManagement = hotelCategoryManagement;
        this.hotelConceptManagement = hotelConceptManagement;

        this.nightResult = null;
        this.travellerResult = null;
        this.seasonResult = null;
        this.priceResult = null;
        this.hotelCategoryResult = null;
        this.hotelConceptResult = null;
    }

    generateResults(){
        this.generateNightResult();
        this.generateTravellerResult();
        this.generatePriceResult();
        this.generateSeasonResult();
        this.generateHotelCategoryManagement();
        this.generateHotelConceptManagement();
    }

    generateNightResult(){
        const nightChoice = this.guide.containersManagement.getNightChoice();
        const nightDetail = this.nightManagement.find(detail => detail.value === nightChoice);

        this.nightResult = nightDetail ? nightDetail.nights : null;
    }

    generateTravellerResult(){
        const travellerChoice = this.guide.containersManagement.getTravellerChoice();
        const travellerDetail = this.travellerManagement.find(detail => detail.value === travellerChoice);

        this.travellerResult = travellerDetail ? travellerDetail.passengers : null;
    }

    generatePriceResult(){
        const priceChoice = this.guide.containersManagement.getPriceChoice();
        const priceDetail = this.priceManagement.find(detail => detail.value === priceChoice);

        this.priceResult = priceDetail ? priceDetail.filterValues : null;
    }

    generateSeasonResult(){
        const seasonChoice = this.guide.containersManagement.getSeasonChoice();
        const seasonDetail = this.seasonManagement.find(detail => detail.season === seasonChoice);

        this.seasonResult = seasonDetail ? seasonDetail.beginDates : null;
    }

    generateHotelCategoryManagement(){
        const hotelCategoryChoice = this.guide.containersManagement.getHotelCategoryChoice();
        const hotelCategoryDetail = this.hotelCategoryManagement.find(detail => detail.value === hotelCategoryChoice);

        this.hotelCategoryResult = hotelCategoryDetail ? hotelCategoryDetail.filterValues : null;
    }

    generateHotelConceptManagement(){
        const hotelConceptChoice = this.guide.containersManagement.getHotelConceptChoice();
        const hotelConceptDetail = this.hotelConceptManagement.find(detail => detail.value === hotelConceptChoice);

        this.hotelConceptResult = hotelConceptDetail ? hotelConceptDetail.filterValues : null;
    }

    getTravellerCount() {
        const travellerChoice = this.guide.containersManagement.getTravellerChoice();
        const travellerDetail = this.travellerManagement.find(detail => detail.value === travellerChoice);
    
        this.travellerResult = travellerDetail ? travellerDetail.passengers : [
          { age: 20, passengerType: 0 },
          { age: 20, passengerType: 0 }
        ];
    
        const travellerCount = this.travellerResult ? this.travellerResult.length : 0;
    
        localStorage.setItem("travellerCount", JSON.stringify({ travellerCount }));
    
        setTravellerCount();
      }

    getNightResult(){
        return this.nightResult;
    }

    getPriceResult(){
        return this.priceResult;
    }

    getSeasonResult(){
        return this.seasonResult;
    }

    getTravellerResult(){
        return this.travellerResult;
    }

    getHotelCategoryResult(){
        return this.hotelCategoryResult;
    }

    getHotelConceptResult(){
        return this.hotelConceptResult;
    }

    getValues(){
        return {
            nightResult: this.getNightResult(),
            priceResult: this.getPriceResult(),
            seasonResult: this.getSeasonResult(),
            travellerResult: this.getTravellerResult(),
            hotelCategoryResult: this.getHotelCategoryResult(),
            hotelConceptResult: this.getHotelConceptResult()
        };
    }
}

export default ValuesGenerating;