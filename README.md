# Batch Metamorph Actor 🔄

This Actor demonstrates the **Apify metamorph operation** by processing multiple URLs with configurable delays, then transforming into another Actor to complete the work in a single continuous run.

## What This Actor Does

1. **Accepts multiple URLs** in `requestListSources` format (compatible with Crawlee)
2. **Processes URLs sequentially** with a configurable delay between each
3. **Stores processing metadata** in the key-value store to demonstrate data persistence
4. **Metamorphs into `dz_omar/universal-downloader`** with all URLs as a batch job

## Key Features

### 🔄 Metamorph Operation
The metamorph operation allows one Actor to transform into another Actor mid-execution while preserving all storage data (Dataset, Key-Value Store, Request Queue). This happens seamlessly in a single run with one billing cycle.

### ⏱️ Configurable Delays
Add delays between URL processing to avoid overwhelming target servers or respect rate limits.

### 📊 Data Persistence
All data stored before the metamorph (processing logs, timestamps, metadata) remains accessible after the transformation.

## Input Configuration

The Actor accepts input in this format:

```json
{
  "input": [
    { "url": "https://httpbin.org/bytes/1024" },
    { "url": "https://httpbin.org/bytes/2048" },
    { "url": "https://httpbin.org/bytes/4096" }
  ],
  "delaySeconds": 3
}
```

### Input Fields

- **`input`** (Array, required): List of URLs in `requestListSources` format
  - Compatible with Crawlee's RequestList sources
  - Supports both `{ "url": "..." }` objects and plain strings
  
- **`delaySeconds`** (Integer, optional): Fixed delay between processing each URL
  - Default: 2 seconds
  - Range: 0-60 seconds

## How It Works

1. **Phase 1 - Your Actor**:
   - Processes each URL with delays
   - Stores metadata for each step
   - Logs progress and timing

2. **Phase 2 - Metamorph**:
   - Transforms into `universal-downloader`
   - Passes all URLs as batch input
   - Continues in the same run ID

3. **Phase 3 - Target Actor**:
   - Downloads all files
   - Stores results in dataset
   - Completes the workflow

## Example Output

**Console Logs:**
```
Processing 3 URLs with 3 second delay between requests
Processing URL 1/3: https://httpbin.org/bytes/1024  
Waiting 3 seconds before next URL...
Processing URL 2/3: https://httpbin.org/bytes/2048
Waiting 3 seconds before next URL...  
Processing URL 3/3: https://httpbin.org/bytes/4096
This is the last URL - METAMORPHING into universal-downloader...
[Then universal-downloader logs continue...]
```

**Key-Value Store:**
- `BATCH_INFO`: Overall batch information
- `PROCESSING_0`, `PROCESSING_1`, etc.: Individual URL processing logs

**Dataset:**
- Download results from universal-downloader

## Benefits of Metamorph

✅ **Single Run Billing**: Pay for one continuous run instead of multiple Actor calls  
✅ **Data Persistence**: All storage survives the transformation  
✅ **Seamless Integration**: No manual coordination between Actors  
✅ **Simplified Workflows**: Chain complex operations easily  
✅ **Cost Effective**: Reduce overhead of multiple Actor starts  

## Use Cases

- **Batch File Processing**: Download multiple files with rate limiting
- **Workflow Orchestration**: Chain specialized Actors together  
- **Complex Scraping**: Analyze targets, then use appropriate scrapers
- **Data Pipeline**: Transform data through multiple processing stages

## Learn More About Metamorph

### Official Documentation
- [Apify Metamorph Documentation](https://docs.apify.com/platform/actors/development/programming-interface/metamorph)
- [Actor Programming Interface](https://docs.apify.com/platform/actors/development/programming-interface)

### Technical Details
- **Storage Persistence**: All default storages (Dataset, Key-Value Store, Request Queue) are preserved
- **Input Handling**: Metamorphed Actor receives input via `INPUT-METAMORPH-1` key (handled automatically by `Actor.getInput()`)
- **Billing**: Single run ID for the entire workflow
- **Limitations**: Runtime limits apply to the total metamorph chain

### Related Concepts
- [Crawlee RequestList](https://crawlee.dev/api/core/class/RequestList): Compatible input format
- [Apify SDK](https://docs.apify.com/sdk/js/): JavaScript SDK for Actor development
- [Actor Development](https://docs.apify.com/platform/actors/development): Complete development guide

## Error Handling

The Actor includes error handling for:
- Invalid URL formats in input
- Missing or malformed input data  
- Metamorph operation failures
- Delay parameter validation

## Deployment

1. Push to Apify platform: `apify push`
2. Configure input in Console or via API
3. Run and monitor the metamorph workflow
4. Check both phases in the same run logs

---

**Note**: This is an educational demonstration of the metamorph operation. In production, consider additional error handling, input validation, and monitoring based on your specific needs.

## 🤝 Support & Resources

### **Getting Help**
- 🌐 **Website**: [flowextractapi.com](https://flowextractapi.com)
- 📧 **Email**: [flowextractapi@outlook.com](mailto:flowextractapi@outlook.com)
- 🙋 **Apify Profile**: [dz_omar](https://apify.com/dz_omar?fpr=smcx63)
- 💬 **GitHub Issues**: [FlowExtractAPI](https://github.com/FlowExtractAPI)

### Social Media

- 💼 **LinkedIn**: [flowextract-api](https://www.linkedin.com/in/flowextract-api/)
- 🐦 **Twitter**: [@FlowExtractAPI](https://x.com/@FlowExtractAPI)
- 📱 **Facebook**: [flowextractapi](https://www.facebook.com/flowextractapi)

---
