export class Query {
  static parse(search = window.location.search): Record<string, string> {
    if (!search) {
      return {};
    }
    const queryString = search[0] === '?' ? search.substring(1) : search;
    const query = {};
    queryString.split('&')
      .forEach(queryStr => {
        const [key, value] = queryStr.split('=');
        if (key) {
          query[key] = value;
        }
      });

    return query;
  }

  static stringify(query, prefix = '?') {
    const queryString = Object.keys(query)
      .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
      .join('&');
    return queryString ? prefix + queryString : '';
  }
}
