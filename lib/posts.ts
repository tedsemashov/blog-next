import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import clientPromise from './mongodb';

const postsDirectory = path.join(process.cwd(), 'posts');

let client;
let db;
let posts;

async function init() {
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

export async function getPosts() {
    try {
        if(!posts) await init();
        const result = await posts.find({}).map(user => ({...user, _id: user._id.toString() })).toArray()

        return { posts: result }
    } catch (error) {
        return { error: 'Failed to fetch posts!'}
    }
}

// export const getSortedPostsData = () => {
//     // Get file names under /posts
//     const fileNames = fs.readdirSync(postsDirectory);
//     const allPostsData = fileNames.map((fileName) => {
//         // Remove ".md" from file name to get id
//         const id = fileName.replace(/\.md$/, '');
//
//         // Read markdown file as string
//         const fullPath = path.join(postsDirectory, fileName);
//         const fileContents = fs.readFileSync(fullPath, 'utf8');
//
//         // Use gray-matter to parse the post metadata section
//         const matterResult = matter(fileContents);
//
//         // Combine the data with the id
//         return {
//             id,
//             ...(matterResult.data as { date: string, title: string }),
//         };
//     });
//     // Sort posts by date
//     return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
// }
//
// export const getAllPostIds = () => {
//     const fileNames = fs.readdirSync(postsDirectory);
//
//     // IMPORTANT FORMAT
//     // Returns an array that looks like this:
//     // [
//     //   {
//     //     params: {
//     //       id: 'ssg-ssr'
//     //     }
//     //   },
//     //   {
//     //     params: {
//     //       id: 'pre-rendering'
//     //     }
//     //   }
//     // ]
//     return fileNames.map((fileName) => {
//         return {
//             params: {
//                 id: fileName.replace(/\.md$/, ''),
//             },
//         };
//     });
// }
//
// export const getPostData = async (id) => {
//     const fullPath = path.join(postsDirectory, `${id}.md`);
//     const fileContents = fs.readFileSync(fullPath, 'utf8');
//
//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents);
//
//     // Use remark to convert markdown into HTML string
//     const processedContent = await remark()
//         .use(html)
//         .process(matterResult.content);
//     const contentHtml = processedContent.toString();
//
//     // Combine the data with the id and contentHtml
//     return {
//         id,
//         contentHtml,
//         ...(matterResult.data as { date: string; title: string })
//     };
// }