export type Color = 'primary' | 'secondary' | 'tertiary' | 'red';
export const bgColor = (c: Color) => {
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

export const hoverColor = (c: Color) => {
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

export const activeColor = (c: Color) => {
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
