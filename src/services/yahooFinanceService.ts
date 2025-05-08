// src/services/yahooFinanceService.ts
export const fetchYahooAutocomplete = async (query: string) => {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?region=US&q=${query}`;
  
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'ea93c02ab3mshc293b452b50b1d5p1f7a6cjsn12b514576d9a',
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Yahoo autocomplete:', error);
      throw error;
    }
  };
  