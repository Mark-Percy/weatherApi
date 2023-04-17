import { key } from "../environment/MApiKey.js"

export class Sites {
    url = new URL('http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist')

    constructor() {
        this.url.searchParams.append('key', key)
    }

    async getSitesForRegion(query) {
        let resp = await fetch(this.url)
        let jsonData = await resp.json()
        let filteredData = jsonData["Locations"]["Location"].filter(el => el["region"] == query.loc)
        return {data: filteredData}
    }
 
    async getSitesForAuthArea(query) {
        let resp = await fetch(this.url)
        let jsonData = await resp.json()
        let filteredData = jsonData["Locations"]["Location"].filter(el => el["unitaryAuthArea"] == query.loc)
        return {data: filteredData}
    }
}