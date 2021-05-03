
export class AirlineService{
    constructor(contract){
        this.contract = contract;
    }

    //Comprar vuelos
    async buyFlight(flightIndex, from,value){
        return this.contract.buyFlight(flightIndex,{from,value});
    }

    //trae el vuelo
    async getFlights(){
        let total = await this.getTotalFlights();
        let flights = [];
        for (var i= 0; i< total; i++) {
            let flight = await this.contract.flights(i); 
            flights.push(flight);
        }

        return this.mapFlights(flights);
    }

    //Permite Recuperar los vuelos que tiene un cliente
    async getCustomerFlights(account){
        let customerTotalFlights = await this.contract.customerTotalFlights(account);
        let flights = [];
        for(var i =0; i < customerTotalFlights.toNumber(); i++ ){
            let flight = await this.contract.customerFlights(account,i);
            flights.push(flight);
        }
        return this.mapFlights(flights);
    }


    //Trae el totla de vuelos
    async getTotalFlights(){
        return (await this.contract.totalFlights()).toNumber();//Se le envuelve con parentesis para que sea numero
    }

    //Devueleve la cantidad de ether que se puede enbolsar pro cajear puntos
    getRefundablEther(from){
        return this.contract.getRefundableEther({ from });   
    }

    //Metodo por el cual permite canjear la divisa
    redeemLoyaltyPoints(from){
        return this.contract.redeemLoyaltyPoints({ from });
    }

    mapFlights(flights){
        return flights.map(flight =>{
            return {
                name: flight[0],
                price: flight[1].toNumber()
            }
        })
    }
}