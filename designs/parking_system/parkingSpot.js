const PARKING_SPOT_TYPES = {
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE'
};

class ParkingSpot {
  constructor(type, id) {
    this.id = id;
    this.type = type;
    this.isFree = true;
    this.vehicle = null;
  }

  assignVehicle(vehicle) {
    this.vehicle = vehicle;
  }

  removeVehicle() {
    this.vehicle = null;
  }

  isFree() {
    return this.isFree;
  }
}

class SmallSpot extends ParkingSpot {
  constructor(id) {
    super(PARKING_SPOT_TYPES.SMALL, id);
  }
}

class MediumSpot extends ParkingSpot {
  constructor(id) {
    super(PARKING_SPOT_TYPES.MEDIUM, id);
  }
}

class LargeSpot extends ParkingSpot {
  constructor(id) {
    super(PARKING_SPOT_TYPES.LARGE, id);
  }
}