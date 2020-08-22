class ParkingLot {
  constructor({
    name, 
    address,
    parkingRate, // create class
    currentCapacity = {
      SMALL: 0,
      MEDIUM: 0,
      LARGE: 0
    },
    maxCapacity = {
      SMALL: 0,
      MEDIUM: 0,
      LARGE: 0
    },
    entrances = [],
    exits = [],
    parkingFloors = {},
    activeTickets = {} // init items from DB on init of app, and then keeo adding
  }) {
    this.name = name;
    this.address = address;
    this.parkingRate = parkingRate;
    this.currentCapacity = currentCapacity;
    this.maxCapacity = maxCapacity;
    this.entrances = entrances;
    this.exits = exits;
    this.parkingFloors = parkingFloors;
    this.activeTickets = activeTickets;
  }

  /* Builder design pattern */
  addParkingFloor(floor) {}
  addEntrance(entrance) {}
  addExit(exit) {}

  getNewParkingTicket(vehicle) {
    if(this.isVehicleSlotAvailable(vehicle.type)) {
      throw new Error("Parking lot is full");
    }

    let ticket = new ParkingTicket();
    vehicle.assignTicket(ticket);
    //ticket.saveInDB();
    this.activeTickets[ticket.getTicketNumber()] = ticket;
    this.incrementSpotCount(vehicle.getType());
    return ticket;
  }

  isVehicleSlotAvailable(vehicleType) {
    // some logic, depend on vehicle type, we need to find equivalent parking spot type and then check current capacity vs max capacity
    let spotType = func(vehicleType);

    return this.currentCapacity[spotType] >= this.maxCapacity[spotType];
  }

  incrementSpotCount(vehicleType) {
    // some logic, depend on vehicle type, we need to find equivalent parking spot type
    let spotType = func(vehicleType);
    this.currentCapacity[spotType]++;
  }

  isParkingFull() {
    for (const floorId in this.parkingFloors) {
      let parkingFloor = this.parkingFloors[floorId];
      if(!parkingFloor.isFull()) {
        return false;
      }
    }

    return true;
  }
}