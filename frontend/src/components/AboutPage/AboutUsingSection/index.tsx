/**
 * Component containing information about the application
 */

import { ExpandableParagraph } from '../../ExpandableParagraph';
import { IconTip } from './IconTip';

export const AboutUsingSection = () => {
    return (
        <div className="flex flex-row flex-wrap justify-start items-center px-32 max-sm:px-8 py-8">
            <ExpandableParagraph title="Content panels and the basic structure of the application">
                <div>
                    <p className="pb-4">
                        When working with the application, your data is
                        organised under a{' '}
                        <strong className="font-medium">Project</strong>.
                    </p>
                    <p>
                        Every <strong className="font-medium">Project</strong>{' '}
                        contains a{' '}
                        <strong className="font-medium">Theme</strong> and
                        several{' '}
                        <strong className="font-medium">ContentPanels</strong>.{' '}
                        These are the main building block for your game world,
                        and govern one area, or category of the assets you want
                        to create. For example, you could have one panel for
                        creating flavour texts for potions, and another for
                        writing books that appear in your game world.
                    </p>
                    <p className="pt-4">
                        All of the panels inside your project automatically
                        include the theme of your game, and provide it to the AI
                        when you ask it for content.
                    </p>
                    <IconTip
                        icon="Bars3Icon"
                        text="You can create as many panels as you want. They are organised under the drawer on the left hand side of the screen"
                    />
                </div>
            </ExpandableParagraph>
        </div>
    );
};
