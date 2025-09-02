// 🔹 req (IncomingMessage) Events
// 1. Stream-related events (from Readable Stream)

// Because req is a readable stream (it represents the incoming HTTP request body):

// data → Fired when request body chunks arrive.

req.on('data', chunk => console.log(chunk.toString()));


// end → Fired when all request body data has been read.

req.on('end', () => console.log('No more data.'));


// error → Fired when a network error or stream error occurs.

req.on('error', err => console.error('Request error:', err));


// aborted → Fired when the client aborts the request before it’s finished.

req.on('aborted', () => console.log('Request aborted by client.'));

// 2. Connection-related events (from the underlying socket)

// These usually bubble up from the TCP socket (req.socket):

// close → Fired when the connection for this request is closed.
// Useful for cleanup in SSE/long-polling.

req.on('close', () => console.log('Request connection closed'));


// (Note: close happens regardless of normal or abnormal termination.)

// 3. Less common but available

// Because req is tied to a net.Socket, you can also listen indirectly through req.socket:

req.socket.on('timeout', () => console.log('Socket timeout'));
req.socket.on('connect', () => console.log('Socket connected'));

// 🔹 Common Use Cases

// File upload / large body
// Use data + end to stream the body instead of loading into memory.

// SSE / long polling
// Use close to detect when to stop pushing messages.

// Error handling
// Always add error and aborted handlers in production servers.

// 🔹 Quick Example
app.post('/upload', (req, res) => {
    let body = '';

    req.on('data', chunk => {
        console.log('Received chunk:', chunk.length);
        body += chunk;
    });

    req.on('end', () => {
        console.log('Upload complete:', body.length);
        res.send('Upload finished');
    });

    req.on('aborted', () => {
        console.log('Client aborted upload.');
    });

    req.on('close', () => {
        console.log('Connection closed.');
    });

    req.on('error', (err) => {
        console.error('Error in request:', err);
    });
});


// ✅ Summary:
// req.on can listen to stream lifecycle events (data, end, error, aborted) and connection lifecycle events (close, and through req.socket → timeout, etc.).