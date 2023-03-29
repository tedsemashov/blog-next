import { getPosts } from '../../lib/posts';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                const { posts, error } = await getPosts();
                if(error) throw new Error(error);

                return res.status(200).json({ posts })
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
    }
}
