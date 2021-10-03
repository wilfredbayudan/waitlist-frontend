import API from "../data/API";

class Location {

  // static validate(storeId) {
  //   return LocationKeys.find(store => store.id === parseInt(storeId) && store.waitwhileId !== null) ? true : false;
  // }

  static validate(config, storeId) {
    return config.find(store => store.id === parseInt(storeId) && store.enabled) ? true : false;
  }

  static waitwhileId(config, storeId) {
    return config.find(store => store.id === parseInt(storeId) && store.waitwhileId !== null).waitwhileId;
  }

  static info(config, storeId) {
    return config.find(store => store.id === parseInt(storeId));
  }

  static async getWaitlist(config, storeId) {
    if (this.validate(config, storeId)) {
      const locationInfo = this.info(config, storeId);
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

  static async isOpen(config, storeId) {
    return this.getWaitlist(config, storeId)
      .then(res => {
        return res.isWaitlistOpen;
      })
      .catch(err => {
        throw new Error(`Failed to retrieve status for Store #${storeId} (${err.message})`)
      })
  }



}

export default Location;