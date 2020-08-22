class ParkingFloor {
  constructor(id) {
    this.id = id;
    this.slots = {
      SMALL: {},
      MEDIUM: {},
      LARGE: {}
    };
    this.slotCounts = {
      SMALL: {},
      MEDIUM: {},
      LARGE: {}
    };
  }

  addParkingBoard(parkingBoard) {
    this.parkingBoard = parkingBoard;
  }

  addParkingSpot(spot) {
    if(!PARKING_SPOT_TYPES[spot.type]) {
      throw new Error("Wrong parking spot type!");
    }

    this.slots[spot.type][spot.number] = spot;
  }

  assignVehicleToSpot(vehicle, spot) {
    spot.assignVehicle(vehicle);
    this.slotCounts[spot.type]++;
    this.updateDisplayBoard(spot);
  }

  updateDisplayBoard(spot) {
    let displayedSlot = this.displayBoard.getSlot(spot.type);

    if (displayedSlot.id == spot.id) {
      // find another free handicapped parking and assign to displayBoard
      for (String key : handicappedSpots.keySet()) {
        if (handicappedSpots.get(key).isFree()) {
          this.displayBoard.setHandicappedFreeSpot(handicappedSpots.get(key));
        }
      }
      this.displayBoard.showEmptySpotNumber();
    }
  }

  freeSpot(spot) {
    if(!PARKING_SPOT_TYPES[spot.type]) {
      throw new Error("Wrong parking spot type!");
    }

    spot.removeVehicle();
    this.slotCounts[spot.type]--;
  }
}