import LocationKeys from "../data/LocationKeys";
import API from "../data/API";

class Location {

  static validate(storeId) {
    return LocationKeys.find(store => store.id === parseInt(storeId) && store.waitwhileId !== null) ? true : false;
  }

  static waitwhileId(storeId) {
    return LocationKeys.find(store => store.id === parseInt(storeId) && store.waitwhileId !== null).waitwhileId;
  }

  static info(storeId) {
    return LocationKeys.find(store => store.id === parseInt(storeId));
  }

  static async getWaitlist(storeId) {
    if (this.validate(storeId)) {
      const locationInfo = this.info(storeId);
      const url = `${API.locationStatus}?wwid=${locationInfo.waitwhileId}`;
      return fetch(url)
        .then(res => res.json())
        .then(waitlistDetails => {
          return waitlistDetails;
        })
        .catch((err) => {
          throw new Error(`Failed to retrieve waitlist for Store #${storeId} (${err.message})`);
        })
    }
    return false;
  }

  static async isOpen(storeId) {
    return this.getWaitlist(storeId)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }



}

export default Location;