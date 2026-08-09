export default async function handler(req, res) {
    // Enable CORS so your widget can fetch data from any website it's embedded on
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { handle } = req.query;
    // Your secret key stored safely in Vercel's Environment Variables
    const API_KEY = process.env.YOUTUBE_API_KEY; 

    if (!handle) {
        return res.status(400).json({ error: "A YouTube handle or ID is required" });
    }

    try {
        // 1. Fetch the Channel's Subscriber Count
        // We check if the user inputted a handle (e.g., @MrBeast) or a raw channel ID
        const isHandle = handle.startsWith('@');
        const queryParam = isHandle ? `forHandle=${handle.substring(1)}` : `id=${handle}`;
        
        const ytUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&${queryParam}&key=${API_KEY}`;
        
        const response = await fetch(ytUrl);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return res.status(404).json({ error: "YouTube channel not found" });
        }

        // Format the count with commas (e.g., 14204 -> "14,204")
        const rawSubCount = data.items[0].statistics.subscriberCount;
        const formattedSubCount = Number(rawSubCount).toLocaleString();

        // 2. Return the data to your widget
        res.status(200).json({
            subscriberCount: formattedSubCount,
            // Placeholder avatars due to YouTube's OAuth requirement for subscriber lists
            avatars: [
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=ffdfbf",
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=c0aede",
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara&backgroundColor=ffdfbf",
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack&backgroundColor=b6e3f4",
                "https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=c0aede"
            ]
        });

    } catch (error) {
        console.error("Vercel API Error:", error);
        res.status(500).json({ error: "Failed to fetch data from YouTube" });
    }
}
