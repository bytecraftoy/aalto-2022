// The main idea behind defining these color palettes is to abstract away
// from knowing individual material design colors. Right now, the system
// is a bit lacking, but hopefully this can also be expanded to handle
// light/night mode etc.

// => Components implement less conditional styles themselves for the basic stuff

/** Color palette defining multiple colors based on Material design */
export type Palette = 'primary' | 'secondary' | 'tertiary' | 'red';

/** Background color for this palette */
export const bg = (c: Palette) => {
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

/** Container color for this palette */
export const bgContainer = (c: Palette) => {
    switch (c) {
        case 'primary':
            return 'bg-primary-90';
        case 'secondary':
            return 'bg-secondary-90';
        case 'tertiary':
            return 'bg-tertiary-90';
        case 'red':
            return 'bg-red-90';
    }
};

/** Hover color for the container of this palette */
export const bgHover = (c: Palette) => {
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

/** Lighter hover color for the container of this palette */
export const bgLightHover = (c: Palette) => {
    switch (c) {
        case 'primary':
            return 'hover:bg-primary-90';
        case 'secondary':
            return 'hover:bg-secondary-90';
        case 'tertiary':
            return 'hover:bg-tertiary-90';
        case 'red':
            return 'hover:bg-red-90';
    }
};

/** Active color for the container of this palette */
export const bgActive = (c: Palette) => {
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

/** Lighter active color for the container of this palette */
export const bgLightActive = (c: Palette) => {
    switch (c) {
        case 'primary':
            return 'active:bg-primary-80';
        case 'secondary':
            return 'active:bg-secondary-80';
        case 'tertiary':
            return 'active:bg-tertiary-80';
        case 'red':
            return 'active:bg-red-80';
    }
};

/** Corresponds to material design default text color */
export const textOnBg = (c: Palette) => {
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
export const textOnContainer = (c: Palette) => {
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
