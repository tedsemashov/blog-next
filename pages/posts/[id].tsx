import Head from 'next/head';
import {getAllPostIds, getPostData} from '../../lib/posts';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { GetStaticProps, GetStaticPaths } from 'next'
import { Container, Heading, Text } from '@chakra-ui/react'

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params?.id as string);

    return { props: { postData }, revalidate: 30 };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllPostIds();

    return { paths, fallback: 'blocking' };
}

interface PostData {
    title: string,
    date: string,
    text: string
}

const Post = ({ postData: { title, date, text} }: { postData: PostData }) => (
    <Layout>
        <Head>
            <title>{title}</title>
        </Head>

        <Heading as='h2' size='md' textAlign='center'>
            {title}
        </Heading>
        <Container maxW='2xl'>
            <Text m={4} fontSize='lg'>{text}</Text>
            <Date dateString={date} />
        </Container>
    </Layout>
)

export default Post;