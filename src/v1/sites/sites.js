import { environment } from "../environments/environment.js"

export class Sites {
    url = new URL(environment.weatherApiUrl);

    constructor() {
        this.url.searchParams.append('key', environment.keys.weatherKey);
    }

    async getSitesForRegion(query) {
        let resp = await fetch(this.url);
        let jsonData = await resp.json();
        let filteredData = jsonData["Locations"]["Location"].filter(el => el["region"] == query.loc);
        return {data: filteredData};
    }
 
    async getSitesForAuthArea(query) {
        let resp = await fetch(this.url);
        let jsonData = await resp.json();
        let filteredData = jsonData["Locations"]["Location"].filter(el => el["unitaryAuthArea"] == query.loc);
        return {data: filteredData};
    }
}