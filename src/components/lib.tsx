import styled from "@emotion/styled";
import { Button,Spin, Typography } from "antd";
import React from "react";
import { DevTools } from "jira-dev-tool";
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

const FullPage=styled.div`
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`
export const FullPageLoading =()=><FullPage>
    <Spin size={"large"}/>
</FullPage>
    
export const FullPageErrorFallback =({error}:{error:Error|null})=> <FullPage>
    <DevTools/>
    <ErrorBox error={error} />
    </FullPage >
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};


 export const ButtonNoPadding = styled(Button)`
  padding: 0;
`; 
export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;