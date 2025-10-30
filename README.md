### How it works
1. User clicks "Start Verification"
2. Generate requestId (UUID)
3. Redirect to vouch with a requestId-appended redirectBackUrl
4. vouch sends the webhook with requestId as a query param
5. Store the proof with requestId
6. vouch redirects back to redirectBackUrl with requestId
7. Fetch and display the proof