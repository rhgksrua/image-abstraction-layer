# IMAGE ABSTRACTION LAYER

## Getting Started

* Need to obtain an AppID for Bing Search API and add it to environment variable `APP_KEY`^
* clone this repo
* npm install
* `node server.js`

## Usage

#### Searching for "cats"

* http://www.example.com/api/imagesearch/cats[?offset=3]
* returns 10 results.
Add offset query for pagination. i.e. offset=3 will return the 4th
page of the results

Reference: [Bing Search API Schema Guide](https://onedrive.live.com/view.aspx?resid=9C9479871FBFA822!109&app=Word&authkey=!ACvyZ_MNtngQyCU)

## Output

```JSON
[
    {
        url: "http://www.example.com/cat.png",
        snippet: "Cats Cats Cats",
        thumbnail: "www.example.com/catthumbnail.png",
        context: "http://example.com"
    },
    {
        // 9 more results
    }
]
```

## TODO

* css