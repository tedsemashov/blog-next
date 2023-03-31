import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getPosts } from '../lib/posts';
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
    const { posts } = await getPosts();

    return {
        props: { allPostsData: posts },
        revalidate: 30
    };
}

const Home = ({ allPostsData }: { allPostsData: { _id: string, date: string, title: string, text: string, url: string }[]}) => {
  return (
      <Layout home>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
            <p>Blog app for studying Next.js + MongoDB</p>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>Blog</h2>
            <ul className={utilStyles.list}>
                {allPostsData.map(({ _id, url, date, title }) => (
                    <li className={utilStyles.listItem} key={_id}>
                        <Link href={`/posts/${url}`}>{title}</Link>
                        <br />
                        <small className={utilStyles.lightText}>
                            <Date dateString={date} />
                        </small>
                    </li>
                ))}
          </ul>
        </section>
      </Layout>
  );
}

export default Home;
