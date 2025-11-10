
export const flex = (direction: 'row' | 'column' | 'row-reverse' | 'column-reverse', alignItems: 'start' | 'center' | 'end' | 'stretch' | 'baseline', justifyContent: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly') => {
    const dirClass = direction === 'row' ? 'flex-row' :
        direction === 'column' ? 'flex-col' :
            direction === 'row-reverse' ? 'flex-row-reverse' :
                'flex-col-reverse';
    const alignClass = alignItems === 'start' ? 'items-start' :
        alignItems === 'center' ? 'items-center' :
            alignItems === 'end' ? 'items-end' :
                alignItems === 'stretch' ? 'items-stretch' :
                    'items-baseline';
    const justifyClass = justifyContent === 'start' ? 'justify-start' :
        justifyContent === 'center' ? 'justify-center' :
            justifyContent === 'end' ? 'justify-end' :
                justifyContent === 'between' ? 'justify-between' :
                    justifyContent === 'around' ? 'justify-around' :
                        'justify-evenly';
    return `flex ${dirClass} ${alignClass} ${justifyClass}`;
}
