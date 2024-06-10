import axios from 'axios';

interface Result {
    t: number,
    o: number,
    h: number,
    l: number,
    c: number,
    v: number
}

const API_KEY = '6fcpm71k7QrBer7uC97cWo_X8LdLRWA1';

export const fetchStockData = async (symbols: string[], from: string, to: string) => {
    const requests = symbols.map(symbol =>
        axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${API_KEY}`)
    );
    const responses = await Promise.all(requests);
    const combinedResults = responses.flatMap(response => 
        response.data.results.map((result: Result) => ({
            timestamp: result.t,
            open: result.o,
            high: result.h,
            low: result.l,
            close: result.c,
            ticker: response.data.ticker,
            volume: result.v,
            date: new Date(result.t)
        }))
    );

    return combinedResults
}
