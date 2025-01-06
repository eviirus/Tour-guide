import { setTravellerCount } from './answersManagement/priceManagement.js';

class ValuesGenerating{
    constructor(guide, nightManagement, priceManagement, seasonManagement, travellerManagement){
        this.guide = guide;

        this.nightManagement = nightManagement;
        this.travellerManagement = travellerManagement;
        this.seasonManagement = seasonManagement;
        this.priceManagement = priceManagement;

        this.nightResult = null;
        this.travellerResult = null;
        this.seasonResult = null;
        this.priceResult = null;
    }

    generateResults(){
        this.generateNightResult();
        this.generateTravellerResult();
        this.generatePriceResult();
        this.generateSeasonResult();
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

        this.getTravellerCount();
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

    getTravellerCount(){
        const travellerChoice = this.guide.containersManagement.getTravellerChoice();
        const travellerDetail = this.travellerManagement.find(detail => detail.value === travellerChoice);
    
        this.travellerResult = travellerDetail ? travellerDetail.passengers : null;
    
        const travellerCount = this.travellerResult ? Object.keys(this.travellerResult).length : 0;
    
        localStorage.setItem("travellerCount", JSON.stringify({ travellerCount }));  
        console.log("Item saved to localStorage:", { travellerCount });  

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

    getValues(){
        return {
            nightResult: this.getNightResult(),
            priceResult: this.getPriceResult(),
            seasonResult: this.getSeasonResult(),
            travellerResult: this.getTravellerResult()
        };
    }
}

export default ValuesGenerating;