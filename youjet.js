(function() {
    // 1. Find the target container on the user's website
    const container = document.getElementById('youjet-widget');
    if (!container) return;

    const channelId = container.getAttribute('data-channel') || '';

    // 2. Inject scoped CSS for the YouTube dark theme
    const style = document.createElement('style');
    style.textContent = `
        .youjet-wrapper {
            background: #0f0f0f; /* YouTube Dark Mode Base */
            border: 1px solid #272727;
            border-radius: 12px;
            padding: 20px;
            font-family: "Roboto", Arial, sans-serif;
            color: #ffffff;
            width: 100%;
            max-width: 350px;
            box-sizing: border-box;
        }
        .youjet-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
        }
        .youjet-icon {
            background: #ff0000;
            color: white;
            border-radius: 8px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }
        .youjet-title {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
            letter-spacing: -0.2px;
        }
        .youjet-stat-block {
            margin-bottom: 16px;
        }
        .youjet-label {
            font-size: 12px;
            color: #aaaaaa;
            text-transform: uppercase;
            font-weight: 500;
            margin-bottom: 8px;
            display: block;
        }
        .youjet-count {
            font-size: 36px;
            font-weight: 700;
            margin: 0;
        }
        .youjet-subs-grid {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 8px;
        }
        .youjet-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #272727;
            border: 2px solid transparent;
            transition: border-color 0.2s ease;
        }
        .youjet-avatar:hover {
            border-color: #ff0000;
        }
        .youjet-loading {
            color: #aaaaaa;
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);

    // 3. Inject the HTML structure into the container
    container.innerHTML = `
        <div class="youjet-wrapper">
            <div class="youjet-header">
                <div class="youjet-icon">▶</div>
                <h3 class="youjet-title">Channel Stats</h3>
            </div>
            
            <div class="youjet-stat-block">
                <span class="youjet-label">Live Subscribers</span>
                <p class="youjet-count" id="youjet-sub-count">--</p>
            </div>

            <div class="youjet-stat-block" style="margin-bottom: 0;">
                <span class="youjet-label">Recent Public Subs</span>
                <div class="youjet-subs-grid" id="youjet-subs-list">
                    <span class="youjet-loading">Loading avatars...</span>
                </div>
            </div>
        </div>
    `;

    // 4. Fetch the Data (Placeholder logic to be replaced with your actual API endpoint)
    async function fetchChannelData() {
        if (!channelId) {
            document.getElementById('youjet-sub-count').innerText = "Error";
            document.getElementById('youjet-subs-list').innerHTML = "No Channel ID provided.";
            return;
        }

        try {
            // NOTE: Replace this mock URL with your Vercel serverless function 
            // once you set up the YouTube Data API backend.
            // const response = await fetch(\`https://your-api-endpoint.vercel.app/api/youtube?channel=\${channelId}\`);
            // const data = await response.json();

            // Simulating a network fetch delay for testing
            setTimeout(() => {
                // Mock live count
                document.getElementById('youjet-sub-count').innerText = "14,204";
                
                // Mock public subscriber avatars
                const subsGrid = document.getElementById('youjet-subs-list');
                subsGrid.innerHTML = ''; 
                
                const mockAvatars = [
                    'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
                    'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
                    'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
                    'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
                    'https://api.dicebear.com/7.x/avataaars/svg?seed=5'
                ];

                mockAvatars.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.className = 'youjet-avatar';
                    img.alt = 'Subscriber';
                    subsGrid.appendChild(img);
                });
            }, 1000);

        } catch (error) {
            console.error("Youjet Widget Error:", error);
            document.getElementById('youjet-sub-count').innerText = "N/A";
        }
    }

    fetchChannelData();
})();
