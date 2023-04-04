import Head from 'next/head';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
// import utilStyles from '../styles/utils.module.css';
import { getPosts } from '../lib/posts';
import { GetStaticProps } from 'next'
import { Heading, List, ListItem, ListIcon, Divider, Center } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { ViewIcon } from '@chakra-ui/icons'

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

        <Heading as='h4' size='md'>Blog app for studying Next.js + MongoDB + Chakra UI</Heading>
        <List spacing={3} m={8}>
            {allPostsData.map(({ _id, url, date, title }) => (
                <ListItem key={_id}>
                    <ListIcon as={ViewIcon} color='green.500' />
                    <Link href={`/posts/${url}`}>{title}</Link>
                    <Date dateString={date} />
                </ListItem>
            ))}
        </List>
      </Layout>
  );
}

export default Home;
