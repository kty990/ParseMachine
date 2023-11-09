## Documentation

### types.ts

- Description: This is where the library was written. The only function that is required to utilize the library is [`Scraper#run`](https://github.com/kty990/ParseMachine/blob/main/src/types.ts#L216):
    ```js
    import * as types from 'types' // Assuming types.js is in the same directory
    const PARSED_TREE = types.Scraper.run(HTML Body);
    ```

### types.js

- Description: This is the transpiled version of `types.ts`.