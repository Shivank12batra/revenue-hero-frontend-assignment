# Koala Dashboard Web Performance Assignment

I have replicated Koala's accounts dashboard with full responsiveness with a key focus on performance, specifically the initial load time.

![Webapp Look](https://imgur.com/lO3aduc)

Live Link: [https://get-koala.vercel.app/](https://get-koala.vercel.app/)

I got an initial full load time on webpage test of in around 6.8-7.3 seconds when there was hardly any optimization done from my end. After understanding various techniques and identifying the major bottlenecks, I was able to bring the load time results down to in the range of 5-5.5 seconds. Below I will be explaining my approach.

## Understanding The Network Waterfall Of A Web Page

Understanding the network waterfall and how resources are loaded on the web page was really beneficial in identifying the performance bottlenecks in my own context.

It can be roughly be broken down into four sub-parts:

1. Time To First Byte (TTFB)
2. Resource Load Delay
3. Resource Load Time
4. Element Render Delay

![Network Chart](https://web.dev/static/articles/optimize-lcp/image/a-breakdown-lcp-showing-23a709f16b362_1440.png)

It is important to optimize for each phase as each of them are interlinked. Just consider this simple example, you have a very fast resource load time but if the TTFB is too high TTFB then that ultimately all the next phases will be delayed leading to an overall slow time. Now, I will go over the techniques I majorly used to reduce the load time in each of the phases.

## SSG Vs SSR Vs CSR
Rendering on the server-side is better for initial load times and SEO than client side rendering (where browser has to first download and parse the Javascript) but I still wanted to see the performance difference since my initial plan was to fetch data on the client side and display a shimmer effect while the data was fetching and then also eventually perform client side filtering and sorting.

But the performance difference was substantial, although CSR performed better on TTFB and FCP (first contentful paint) than SSR but it was quite behind in LCP. 

Also, since the data was random/dynamic each time, I had to obviously go for SSR over SSG. This led to slightly higher TTFB but overall LCP was good, much better compared to CSR. 

Ultimately, I have used SSR to render the page fully and then do filtering of data on client side afterwards.

## Optimizing Images

For image optimization, most of the work was actually taken care by next js Image tag. It optimizes the images and serves them in modern, less heavy format such as webp -> quicker resource load time.

I didn't require it in my case, but when some banner images form the major/main part of LCP, Next JS Image tag also provides priority attribute for critical images to load at first priority and lead to a quicker LCP.

### Partial Lazy Loading

Here again, Next JS Image tag has a default for lazy loading images but the best optimal approach here is not to actually lazy load all the images but only lazy load those images that are outside the viewport while download the images inside the viewport as quickly as possible.

The reason for this is that in JS based image lazy loading images are not loaded until the JS code is executed. So, this will delay loading of viewport images hence leading to a higher LCP/overall loading time.

Despite doing all this, I hardly saw any substantial improvement in the overall load time. This was because I wasn't looking at the waterfall properly and identifying the crucial bottlenecks: the main thread getting blocked due to some heavy javascript script which delayed rendering of the already loaded images.

The below image illustrates this perfectly. The LCP resource has a quick resouce load time but the Javascript script block time is high which delays the rendering:

![Render Delay](https://web.dev/static/articles/optimize-lcp/image/the-same-breakdown-lcp-s-ac37446e062a6_1440.png)

## Improving Element Render Delay / Reducing Blocking Time

After some exploration, I found out that the ActivityGraph component was causing the huge blockage on the main thread.

Since, the column of ActivityGraph component was placed under the second last column of weekly activity and on the initial view of mobile screens it was not visible, making it lazy loaded was the most logical solution so it is loaded only when the user scrolls horizontally to see the last columns.

Strangely, the component was not getting lazy loaded when I used external library (next dynamic and react lazy) but then I went to implement it from scratch using the intersection observe API and this time it was successfully getting lazy loaded. As a resutl of this, I saw a huge performance improvement and the main thread blocking reduced to 0.3 seconds from previous of around 1.3-1.5 seconds.

Though I was wondering what would my approach be if the graph was appearing in the initial few columns of the viewport on mobile screens? Something I would like to discuss and discover on my own.

## Font Optimization

After this, I made two other optimizations, one related to font where instead of importing from third party I used next/font which does not make any external requests and further takes care of optimization related to font.

## Pagination

This was partially done for user experience and partially for performance as well. And it did improve performance. I implemented pagination via React Table library to load only ten accounts on a single page. So, on the initial viewport we are rendering ten instead of twenty five that we doing earlier.

## Further Improvements

I am still exploring and inspecting whether any further optimizations can be made. Also, I haven't made much attention to accessibility (though I have tried to write as much semantic HTML elements as possible) and SEO so that is another area I will try to improve upon.






