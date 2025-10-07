import styled from "@emotion/styled";

export const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean;
    marginBottom?: number;
}>((props) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: props.between ? 'space-between' : undefined,
    marginBottom: props.marginBottom !== undefined ? `${props.marginBottom}rem` : undefined,
    
    '& > *': {
        marginTop: '0 !important',
        marginBottom: '0 !important',
        marginRight: typeof props.gap === 'number' ? `${props.gap}rem` : props.gap ? '2rem' : undefined,
    }
}));