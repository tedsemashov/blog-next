import Head from 'next/head';
// import styles from './layout.module.css';
// import utilStyles from '../styles/utils.module.css';
import { Flex, Heading } from '@chakra-ui/react';
import { Image, Link } from '@chakra-ui/next-js';

const name = 'Ted Semashov';
export const siteTitle = 'Next.js Sample Website';

const Layout = ({ children, home }: { children: React.ReactNode, home?: boolean }) => {
    return (
        <Flex height="100vh" direction="column" alignItems="center">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle,
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Flex direction="column" alignItems="center" m={10}>
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/profile.jpg"
                            borderRadius='full'
                            height={144}
                            width={144}
                            alt="Ted Semashov"
                        />
                        <Heading as='h2' size='xl' mt={5} p={3} rounded="full" bg="teal.200">{name}</Heading>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <Image
                                priority
                                src="/images/profile.jpg"
                                borderRadius='full'
                                height={108}
                                width={108}
                                alt="Ted Semashov"
                            />
                        </Link>
                        <Heading as='h3' size='lg'>{name}</Heading>
                    </>
                )}
            </Flex>
            <Flex direction="column" alignItems="center">{children}</Flex>
            {!home && (
                <Link href="/">← Back to home</Link>
            )}
        </Flex>
    );
}

export default Layout;