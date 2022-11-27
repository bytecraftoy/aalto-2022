// The main idea behind defining these color palettes is to abstract away
// from knowing individual material design colors. Right now, the system
// is a bit lacking, but hopefully this can also be expanded to handle
// light/night mode etc.

// => Components implement less conditional styles themselves for the basic stuff

/** Color palette defining multiple colors based on Material design */
export type Palette = 'primary' | 'secondary' | 'tertiary' | 'red';

/** Background / Container color for this palette */
export const bgColor = (c: Palette) => {
    switch (c) {
        case 'primary':
            return 'bg-primary';
        case 'secondary':
            return 'bg-secondary';
        case 'tertiary':
            return 'bg-tertiary';
        case 'red':
            return 'bg-red';
    }
};

/** Hover color for the container of this palette */
export const hoverColor = (c: Palette) => {
    switch (c) {
        case 'primary':
            return 'hover:bg-primary-30';
        case 'secondary':
            return 'hover:bg-secondary-30';
        case 'tertiary':
            return 'hover:bg-tertiary-30';
        case 'red':
            return 'hover:bg-red-30';
    }
};

/** Active color for the container of this palette */
export const activeColor = (c: Palette) => {
    switch (c) {
        case 'primary':
            return 'active:bg-primary-20';
        case 'secondary':
            return 'active:bg-secondary-20';
        case 'tertiary':
            return 'active:bg-tertiary-20';
        case 'red':
            return 'active:bg-red-20';
    }
};

/** Corresponds to material design On X color */
export const onColor = (c: Palette) => {
    switch (c) {
        case 'primary':
            return 'text-primary-99';
        case 'secondary':
            return 'text-secondary-99';
        case 'tertiary':
            return 'text-tertiary-99';
        case 'red':
            return 'text-red-99';
    }
};

/** Corresponds to material design On Container color */
export const onContainerColor = (c: Palette) => {
    switch (c) {
        case 'primary':
            return 'text-primary-10';
        case 'secondary':
            return 'text-secondary-10';
        case 'tertiary':
            return 'text-tertiary-10';
        case 'red':
            return 'text-red-10';
    }
};
