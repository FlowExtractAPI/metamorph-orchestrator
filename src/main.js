import { Actor } from 'apify';

await Actor.init();

console.log('Starting batch metamorph test with delays...');

// Get input
const input = await Actor.getInput() || {};
const requestSources = input.input || [{ url: 'https://httpbin.org/bytes/1024' }]; // Array of request objects
const delaySeconds = input.delaySeconds || 2; // Fixed delay in seconds

// Extract URLs from request sources format
const urls = requestSources.map(source => {
    if (typeof source === 'string') {
        return source;
    } else if (source && source.url) {
        return source.url;
    }
    return null;
}).filter(url => url !== null);

console.log(`Processing ${urls.length} URLs with ${delaySeconds} second delay between requests`);

// Function to sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Store initial data to prove persistence
await Actor.setValue('BATCH_INFO', {
    timestamp: new Date().toISOString(),
    totalUrls: urls.length,
    delaySeconds: delaySeconds,
    message: 'Batch processing started'
});

// Process each URL with delays
for (let i = 0; i < urls.length; i++) {
    const currentUrl = urls[i];
    console.log(`Processing URL ${i + 1}/${urls.length}: ${currentUrl}`);
    
    // Store current processing info
    await Actor.setValue(`PROCESSING_${i}`, {
        index: i,
        url: currentUrl,
        timestamp: new Date().toISOString(),
        message: `Processing URL ${i + 1}`
    });
    
    // If it's the last URL, perform the metamorph
    if (i === urls.length - 1) {
        console.log('This is the last URL - METAMORPHING into universal-downloader...');
        
        // Create the complete batch input for the target Actor
        const batchInput = {
            "URLItem": urls.map(url => ({ url: url })),
            "proxyConfig": {
                "useApifyProxy": false
            }
        };
        
        await Actor.metamorph('dz_omar/universal-downloader', batchInput);
        
        // This line will never execute
        console.log('This should never print!');
        break;
    } else {
        // Not the last URL - add delay and continue
        const delayMs = delaySeconds * 1000;
        console.log(`Waiting ${delaySeconds} seconds before next URL...`);
        await sleep(delayMs);
    }
}
