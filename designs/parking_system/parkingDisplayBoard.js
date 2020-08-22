class ParkingDisplayBoard {
  constructor(id) {
    this.id = id;
    this.slots = {
      SMALL: null,
      MEDIUM: null,
      LARGE: null,
    };
  }

  getSlot(type) {
    return this.slots[type];
  }

  showEmptySpotNumber() {
    let messages = [];

    if(this.slots.SMALL) {
      if(this.slots.SMALL.isFree()) {
        messages.push(`SMALL slot available, slot id: ${this.slots.SMALL.id}`);
      } else {
        messages.push(`SMALL slot unavailable`);
      }
    }

    if(this.slots.MEDIUM) {
      if(this.slots.MEDIUM.isFree()) {
        messages.push(`MEDIUM slot available, slot id: ${this.slots.MEDIUM.id}`);
      } else {
        messages.push(`MEDIUM slot unavailable`);
      }
    }

    if(this.slots.LARGE) {
      if(this.slots.LARGE.isFree()) {
        messages.push(`LARGE slot available, slot id: ${this.slots.LARGE.id}`);
      } else {
        messages.push(`LARGE slot unavailable`);
      }
    }

    return messages;
  }
}