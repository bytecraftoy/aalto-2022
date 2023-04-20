import React from 'react';
import { PromptCategoryBox } from './PromptCategoryBox';
import { DropdownMenu } from '../../DropdownMenu';

/**
 * Top most part of the whole content panel.
 * Contains currently only place set set category box
 *
 */

interface ContentPanelHeaderProps {
    category: string;
    setCategory: (s: string) => void;
    setPopup: (b: boolean) => void;

    saveState: (force?: boolean) => Promise<void>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    hasCustomParameters: boolean;
}

export const ContentPanelHeader: React.FC<ContentPanelHeaderProps> = ({
    category,
    setCategory,
    setPopup,
    saveState,
    setOpen,
    hasCustomParameters,
}) => {
    interface IconAsteriskProps {
        hasCustomParameters: boolean;
    }
    const IconAsterisk: React.FC<IconAsteriskProps> = ({
        hasCustomParameters,
    }) => {
        let text = '';
        if (hasCustomParameters) {
            text = '*';
        }
        return (
            <div
                className="flex-1 z-[15] pl-8"
                style={{
                    position: 'relative',
                    right: 52,
                    bottom: 10,
                    pointerEvents: 'none',
                    minWidth: 40,
                }}
            >
                {text}
            </div>
        );
    };

    return (
        <div className="flex flex-row justify-center items-center h-16 px-4 mt-6">
            <PromptCategoryBox category={category} setCategory={setCategory} />
            <div data-testid="panel-settings" className="h-full pl-2 z-[15]">
                <DropdownMenu
                    icon="Cog6Tooth"
                    items={[
                        {
                            action: () => setPopup(true),
                            icon: 'CubeIcon',
                            name: 'Add Boxes',
                        },
                        {
                            action: () => setOpen(true),
                            icon: 'AdjustmentsHorizontalIcon',
                            name: 'Parameters',
                        },
                        {
                            action: () => saveState(true),
                            icon: 'DocumentCheckIcon',
                            name: 'Save',
                        },
                    ]}
                />
            </div>
                <IconAsterisk hasCustomParameters={hasCustomParameters} />
        </div>
    );
};
