/**
 * Component containing information about the application
 */
import {useState, useEffect} from 'react';
import { solidIcon } from '../../../utils/icons';
import { ExpandableParagraph } from '../../ExpandableParagraph';
import { IconTip } from './IconTip';
import { Icon } from './../../../utils/icons';
import {apiFetchJSON} from './../../../utils/apiFetch';

interface InfoParagraphTextPart{
    type: 'text',
    text: string
}

interface InfoParagraphStrongTextPart{
    type: 'strong-text',
    text: string
}

interface InfoParagraphSolidIconPart{
    type: 'solid-icon',
    icon: Icon
}

interface InfoParagraph{
    type: 'paragraph',
    parts: Array<InfoParagraphTextPart | InfoParagraphStrongTextPart | InfoParagraphSolidIconPart>
}

interface InfoIconTip{
    type: 'icon-tip',
    icon: Icon,
    text: string
}

interface InfoSection{
    title: string,
    contents: Array<InfoParagraph | InfoIconTip>
}

interface InfoData {
    sections: InfoSection[]
}

const renderParagraphTextPart = (part: InfoParagraphTextPart) => part.text;

const renderParagraphStrongTextPart = (part: InfoParagraphStrongTextPart) => 
    <strong className="font-medium">{part.text}</strong>;

const renderParagraphSolidIconPart = (part: InfoParagraphSolidIconPart) => 
    solidIcon(part.icon, 'w-5 h-5 m-0 p-0 inline-block');

const renderParagraph = (paragraph: InfoParagraph) => <p className="pb-4">{
    paragraph.parts.map(p => {
        if(p.type === 'text')
            return renderParagraphTextPart(p);
        else if(p.type === 'strong-text')
            return renderParagraphStrongTextPart(p);
        else if(p.type === 'solid-icon')
            return renderParagraphSolidIconPart(p);
    })
}</p>;

const renderIconTip = (iconTip: InfoIconTip) => <IconTip icon={iconTip.icon} text={iconTip.text}/>;

const renderSection = (section: InfoSection) => <ExpandableParagraph
    key={section.title}
    title={section.title}
><div>{
    section.contents.map(p => {
        if(p.type === 'paragraph')
            return renderParagraph(p);
        else if(p.type === 'icon-tip')
            return renderIconTip(p);
    })
}</div></ExpandableParagraph>;

export const AboutUsingSection = () => {
    const [infoData, setInfoData] = useState<InfoData>({sections: []});

    useEffect(() => {
        apiFetchJSON('/info_texts.json')
            .then(data => setInfoData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="flex flex-row flex-wrap justify-start items-center px-32 max-sm:px-8 py-8">
            {infoData.sections.map(section => renderSection(section))}
        </div>
    );
};
