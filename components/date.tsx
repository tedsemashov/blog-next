import { parseISO, format } from 'date-fns';
import { Text } from '@chakra-ui/react';

const Date = ({ dateString }: { dateString: string }) => {
    const date = parseISO(dateString);

    return (
        <Text as='b' ml={3} px={2} rounded="full" bg="teal.50" color='black'>
            {format(date, 'LLLL d, yyyy')}
        </Text>
    );
}

export default Date;