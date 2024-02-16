import { FC, useEffect, useState } from 'react';

interface WordFlickerProps {
    sentence: string;
    speed: number;
}

const WordFlicker: FC<WordFlickerProps> = ({ sentence, speed }: WordFlickerProps) => {
    const [part, setPart] = useState<string>('');
    const [offset, setOffset] = useState<number>(0);
    const [forwards, setForwards] = useState<boolean>(true);


    useEffect(() => {
        const interval = setInterval(() => {
            if (forwards) {
                if (offset >= sentence.length) {
                    setForwards(false);
                }
            } else {
                if (offset === 0) {
                    clearInterval(interval);
                }
            }

            const currentPart = sentence.substring(0, offset);
            setPart(currentPart);

            setOffset(offset + 1);
        }, speed);

        return () => clearInterval(interval);
    }, [forwards, offset, speed, sentence]);

    return <div >{part}</div>;
};

export default WordFlicker;