import Head from 'next/head';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import { getPosts } from '../lib/posts';
import { GetStaticProps } from 'next'
import {
    Heading, List, ListItem, ListIcon, Container, Switch, Stack, Text, useColorMode
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { ViewIcon } from '@chakra-ui/icons'

export const getStaticProps: GetStaticProps = async () => {
    const { posts } = await getPosts();

    return {
        props: { allPostsData: posts },
        revalidate: 30
    };
}

interface PostData {
    _id: string,
    date: string,
    title: string,
    text: string,
    url: string
}

const Home = ({ allPostsData }: { allPostsData: PostData[]}) => {
    const { toggleColorMode } = useColorMode();

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <Container maxW='2xl'>
                <Heading as='h4' size='md' textAlign='center' >
                    Blog app for studying Next.js + MongoDB + Chakra UI
                </Heading>
                <List spacing={3} m={8}>
                    {allPostsData.map(({ _id, url, date, title }) => (
                        <ListItem key={_id}>
                            <ListIcon as={ViewIcon} color='green.500' />
                            <Link href={`/posts/${url}`}>{title}</Link>
                            <Date dateString={date} />
                        </ListItem>
                    ))}
                </List>
            </Container>

            <Stack align='center' direction='row'>
                <Text as='b'>Dark mode</Text>
                <Switch colorScheme='teal' size='lg' onChange={toggleColorMode}/>
            </Stack>
        </Layout>
    )
};

export default Home;
