import Head from 'next/head';
import { Flex, Heading, Avatar, AvatarBadge, Button } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { ArrowBackIcon } from '@chakra-ui/icons'

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
                        <Avatar name='Ted Semashov' src='/images/profile.jpg' size='2xl'>
                            <AvatarBadge boxSize='0.8em' bg='green.500' />
                        </Avatar>
                        <Heading as='h2' size='xl' mt={5} p={3} rounded="full" bg="teal.200">{name}</Heading>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <Avatar name='Ted Semashov' src='/images/profile.jpg' size='xl'>
                                <AvatarBadge boxSize='0.8em' bg='green.500' />
                            </Avatar>
                        </Link>
                        <Heading as='h3' size='md' mt={5} p={3} rounded="full" bg="teal.200">{name}</Heading>
                    </>
                )}
            </Flex>
            <Flex direction="column" alignItems="center">{children}</Flex>
            {!home && (
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <Button size='sm' mt={4} leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='outline'>
                        Back to home
                    </Button>
                </Link>
            )}
        </Flex>
    );
}

export default Layout;