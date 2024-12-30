class ValuesGenerating{
    constructor(guide, nightManagement, priceManagement, seasonManagement, travellerManagement){
        this.guide = guide;

        this.nightManagement = nightManagement;
        this.priceManagement = priceManagement;
        this.seasonManagement = seasonManagement;
        this.travellerManagement = travellerManagement;

        this.nightResult = null;
        this.priceResult = null;
        this.seasonResult = null;
        this.travellerResult = null;
    }

    generateResults(){
        this.generateNightResult();
        this.generatePriceResult();
        this.generateSeasonResult();
        this.generateTravellerResult();
    }

    generateNightResult(){
        const nightChoice = this.guide.containersManagement.getNightChoice();
        const nightDetail = this.nightManagement.find(detail => detail.value === nightChoice);

        this.nightResult = nightDetail ? nightDetail.nights : null;
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

    generateTravellerResult(){
        const travellerChoice = this.guide.containersManagement.getTravellerChoice();
        const travellerDetail = this.travellerManagement.find(detail => detail.value === travellerChoice);

        this.travellerResult = travellerDetail ? travellerDetail.passengers : null;
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