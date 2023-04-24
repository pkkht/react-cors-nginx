# react-cors-nginx

This project is a playground for React Bootstrap, Suspense, React ErrorBoundary and TypeScript

Boo - not for CORS though as the weather API allows for CORS. Never mind
 
Learnings:

1) Fetch promises only reject with a TypeError when a network error occurs. Since 4xx and 5xx responses aren't network errors, there's nothing to catch. You'll need to throw an error yourself to use Promise#catch.

A fetch Response conveniently supplies an ok , which tells you whether the request succeeded. Something like this should do the trick:

fetch(url).then((response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Something went wrong');
})
.then((responseJson) => {
  // Do something with the response
})
.catch((error) => {
  console.log(error)
});


2) Developer console when CORS is enabled. Mind you, request method is GET below - refer to MDN for OPTIONS which is sent in pre-flight request
General:
---------------
Request URL: https://weatherapi-com.p.rapidapi.com/current.json?q=chennai
Request Method: GET
Status Code: 200 
Remote Address: 13.210.57.96:443
Referrer Policy: strict-origin-when-cross-origin

Response headers:
------------------------
access-control-allow-credentials: true
access-control-allow-origin: http://localhost:5173
access-control-expose-headers: x-ratelimit-limit, x-ratelimit-remaining, x-ratelimit-reset, access-control-allow-origin, accept-ranges, age, allow, cache-control, connection, content-encoding, content-language, content-length, content-location, content-md5, content-disposition, content-range, content-type, date, etag, expires, last-modified, link, location, p3p, pragma, proxy-authenticate, refresh, retry-after, server, set-cookie, status, strict-transport-security, trailer, transfer-encoding, upgrade, vary, via, warning, www-authenticate, x-frame-options, public-key-pins, x-xss-protection, content-security-policy, x-content-security-policy, x-webkit-csp, x-content-type-options, x-powered-by, x-ua-compatible, X-RateLimit-Requests-Limit, X-RateLimit-Requests-Remaining, X-RateLimit-Requests-Reset, cdn-requestpullsuccess, cdn-edgestorageid, x-ratelimit-requests-remaining, cdn-requestid, x-rapidapi-region, cdn-status, x-rapidapi-version, access-control-allow-credentials, cdn-pullzone, cdn-proxyver, cdn-cache, cdn-cachedat, cdn-requestcountrycode, x-ratelimit-requests-reset, cdn-requestpullcode, x-ratelimit-requests-limit, cdn-uid
cache-control: public, max-age=180
cdn-cache: EXPIRED
cdn-cachedat: 04/23/2023 09:23:05
cdn-edgestorageid: 977
cdn-proxyver: 1.03
cdn-pullzone: 93447
cdn-requestcountrycode: AU
cdn-requestid: 82f7212a594d1030d12dcb2892ed3a4e
cdn-requestpullcode: 200
cdn-requestpullsuccess: True
cdn-status: 200
cdn-uid: 8fa3a04a-75d9-4707-8056-b7b33c8ac7fe
content-encoding: br
content-type: application/json
date: Sun, 23 Apr 2023 09:23:05 GMT
server: RapidAPI-1.2.8
vary: Accept-Encoding
x-rapidapi-region: AWS - ap-southeast-2
x-rapidapi-version: 1.2.8
x-ratelimit-requests-limit: 1000000
x-ratelimit-requests-remaining: 999932
x-ratelimit-requests-reset: 148800
Request Headers:
------------------------
:authority: weatherapi-com.p.rapidapi.com
:method: GET
:path: /current.json?q=chennai
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: en-US,en;q=0.9,el;q=0.8
origin: http://localhost:5173
referer: http://localhost:5173/
sec-ch-ua: "Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "macOS"
sec-fetch-dest: empty
sec-fetch-mode: cors
sec-fetch-site: cross-site
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
x-rapidapi-host: weatherapi-com.p.rapidapi.com
x-rapidapi-key: 4645860cd7mshadf8a06cd38ddd3p19d798jsn2e650d3b2f6b


3) Use JSON.stringify to print errors

4) The React Vite app is dockerised and runs on nginx web server.
Docker commands to run the app:
Go to weatherapi folder in VS code and run the below commands:
docker build -t weatherapi .
docker run -p 80:80 weatherapi

URL: 0.0.0.0/80
Reference: https://medium.com/@fullstackmatt/running-a-react-vite-app-in-docker-using-nginx-414ff9a302c5

