import path from 'path';
import clientPromise from './mongodb';

const postsDirectory = path.join(process.cwd(), 'posts');

let client;
let db;
let posts;

const init = async () => {
    if(db) return;

    try {
        client = await clientPromise;
        db = await client.db('blog-posts');
        posts = await db.collection('posts')
    } catch (error) {
        throw new Error('Failed to establish connection to database');
    }
}

(async () => { await init()})();

export const getPosts = async () => {
    try {
        if(!posts) await init();

        const result = await posts.find({}).map(user => ({...user, _id: user._id.toString() })).toArray();
        return { posts: result }
    } catch (error) {
        return { error: 'Failed to fetch posts!'}
    }
}

export const getAllPostIds = async () => {
    try {
        if(!posts) await init();

        const result = await posts.find({}).toArray();
        // IMPORTANT FORMAT
        // Returns an array that looks like this:
        // [
        //   {
        //     params: {
        //       id: 'ssg-ssr'
        //     }
        //   },
        //   {
        //     params: {
        //       id: 'pre-rendering'
        //     }
        //   }
        // ]
        return result.map(({ url }) => {
            return {
                params: {
                    id: url,
                },
            };
        });
    } catch (error) {
        return { error: 'Failed to fetch posts!'}
    }
}

export const getPostData = async (id) => {
    try {
        if(!posts) await init();

        const result = await posts.find({}).toArray();
        const { date, title, text }: { date: string, title: string, text: string } = result.find(({ url }) => url === id);

        return { id, date, title, text };
    } catch (error) {
        return { error: 'Failed to fetch posts!'}
    }
}