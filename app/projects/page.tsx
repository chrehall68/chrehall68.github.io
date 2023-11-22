'use client'
import { TypeAnimation } from 'react-type-animation';

const ExampleComponent = () => {
    return (
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed out once, initially
                'I build Artificial Intelligences',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'I build robots',
                1000,
                'I build apps',
                1000,
                'I build software',
                1000
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '2em', display: 'inline-block' }}
            repeat={Infinity}
        />
    );
};

export default function Projects() {
    return <div>
        {ExampleComponent()}
        <p>hi</p>
    </div>
}