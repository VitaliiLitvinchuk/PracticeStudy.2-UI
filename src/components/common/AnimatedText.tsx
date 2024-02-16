import { FC, useEffect, useRef } from "react";

interface IAnimatedText {
    text: string;
}

const AnimatedText: FC<IAnimatedText> = ({ text }) => {
    const paragraph = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('home-page-fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const targetElement = paragraph.current;

        if (targetElement) {
            observer.observe(targetElement);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <p ref={paragraph} className="m-0 font-text">
            {text}
        </p>
    );
}

export default AnimatedText;