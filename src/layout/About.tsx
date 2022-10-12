import { FC, useMemo } from 'react';

type AboutProps = {
    title: string;
    contentList: string[];
}

const About:FC<AboutProps> = (props) => {
    const {title, contentList} = props;
    const contentSections = useMemo((): JSX.Element[] | null => {
        if (Array.isArray(contentList) && contentList.length) {
            return contentList.map((content, index) => {
                return (<section key={index}>{content}</section>);
            });
        }
        return null;
    }, [contentList]);

    return (
        <div>
            <h2>{title}</h2>
            {contentSections}
        </div>
    );
};

export default About;

export type {
    AboutProps
}
