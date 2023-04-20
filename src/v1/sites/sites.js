import { environment } from "../environments/environment.js"

export class Sites {
    url = new URL(environment.weatherApiUrl);

    constructor() {
        this.url.searchParams.append('key', environment.keys.weatherKey);
    }

    async getSitesData() {
        return (await fetch(this.url)).json();        
    }

    async getSitesForRegion(query) {
        let jsonData = (await this.getSitesData());
        let filteredData = jsonData["Locations"]["Location"].filter(el => el["region"] == query.loc);
        return {data: filteredData};
    }
 
    async getSitesForAuthArea(query) {
        let jsonData = (await this.getSitesData());
        let filteredData = jsonData.Locations.Location.filter(el => el["unitaryAuthArea"] == query.loc);
        return {data: filteredData};
    }

    async getSites() {
        let jsonData = (await this.getSitesData()).Locations.Location;
        let filteredData = jsonData.filter(site => site.unitaryAuthArea != null);
        let LocationData = new Map()
        filteredData.forEach(site => {
            if(!LocationData.has(site.region)) LocationData.set(site.region, new Map())
            if(!LocationData.get(site.region).has(site.unitaryAuthArea)) LocationData.get(site.region).set(site.unitaryAuthArea, [])
            LocationData.get(site.region).get(site.unitaryAuthArea).push({name:site.name, id: site.id})
        })
        const json = JSON.stringify([...LocationData].reduce((obj, [key, value]) => {
            obj[key] = [...value.entries()].reduce((subObj, [subKey, subValue]) => {
              subObj[subKey] = subValue;
              return subObj;
            }, {});
            return obj;
          }, {}));

        return json
    }
}