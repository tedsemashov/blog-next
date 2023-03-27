import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';

const FirstPost = () => {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload" // tells Next.js to load this particular script lazily during browser idle time
                onLoad={() =>
                    console.log(`script loaded correctly, window.FB has been populated`)
                } // is used to run any JavaScript code immediately after the script has finished loading
            />
            <h1>First Post</h1>
        </Layout>
    );
}

export default FirstPost;