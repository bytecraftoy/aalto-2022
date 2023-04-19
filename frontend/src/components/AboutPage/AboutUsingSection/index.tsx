/**
 * Component containing information about the application
 * The information (info_texts.json) is fetched once from the
 * server when this component is rendered for the first time.
 * The contents of this component are constructed based on
 * that json file.
 */
import React, { useState, useEffect } from 'react';
import { solidIcon } from '../../../utils/icons';
import { ExpandableParagraph } from '../../ExpandableParagraph';
import { IconTip } from './IconTip';
import { Icon } from './../../../utils/icons';
import { apiFetchJSON } from './../../../utils/apiFetch';

interface InfoParagraphTextPart {
    type: 'text';
    text: string;
}

interface InfoParagraphStrongTextPart {
    type: 'strong-text';
    text: string;
}

interface InfoParagraphSolidIconPart {
    type: 'solid-icon';
    icon: Icon;
}

interface InfoParagraph {
    type: 'paragraph';
    parts: Array<
        | InfoParagraphTextPart
        | InfoParagraphStrongTextPart
        | InfoParagraphSolidIconPart
    >;
}

interface InfoIconTip {
    type: 'icon-tip';
    icon: Icon;
    text: string;
}

interface InfoSection {
    title: string;
    contents: Array<InfoParagraph | InfoIconTip>;
}

interface InfoData {
    sections: InfoSection[];
}

interface ContainerProps {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

//This container is required to give the key prop to strings and solid icons
const Container = ({ children }: ContainerProps) => <>{children}</>;

const renderParagraphTextPart = (key: number, part: InfoParagraphTextPart) => (
    <Container key={key}>{part.text}</Container>
);

const renderParagraphStrongTextPart = (
    key: number,
    part: InfoParagraphStrongTextPart
) => (
    <strong key={key} className="font-medium">
        {part.text}
    </strong>
);

const renderParagraphSolidIconPart = (
    key: number,
    part: InfoParagraphSolidIconPart
) => (
    <Container key={key}>
        {solidIcon(part.icon, 'w-5 h-5 m-0 p-0 inline-block')}
    </Container>
);

const renderParagraph = (key: number, paragraph: InfoParagraph) => (
    <p key={key} className="pb-4">
        {paragraph.parts.map((p, i) => {
            if (p.type === 'text') return renderParagraphTextPart(i, p);
            else if (p.type === 'strong-text')
                return renderParagraphStrongTextPart(i, p);
            else if (p.type === 'solid-icon')
                return renderParagraphSolidIconPart(i, p);
        })}
    </p>
);

const renderIconTip = (key: number, iconTip: InfoIconTip) => (
    <IconTip key={key} icon={iconTip.icon} text={iconTip.text} />
);

const renderSection = (key: number, section: InfoSection) => (
    <ExpandableParagraph key={key} title={section.title}>
        <div>
            {section.contents.map((p, i) => {
                if (p.type === 'paragraph') return renderParagraph(i, p);
                else if (p.type === 'icon-tip') return renderIconTip(i, p);
            })}
        </div>
    </ExpandableParagraph>
);

export const AboutUsingSection = () => {
    const [infoData, setInfoData] = useState<InfoData>({ sections: [] });

    useEffect(() => {
        apiFetchJSON('/info_texts.json')
            .then((data) => setInfoData(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="flex flex-row flex-wrap justify-start items-center px-32 max-sm:px-8 py-8">
            {infoData.sections.map((s, i) => renderSection(i, s))}
        </div>
    );
};
