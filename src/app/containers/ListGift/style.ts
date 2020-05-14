import styled from 'styled-components';
import { isMobile } from 'app/core/helpers/detect_mobile';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 85vh;
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

export const SliderContainer = styled.div`
  min-width: 360px;
  width: 100%;
  height: 100%;
  & .slick-next {
    right: 0;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ImgGift = isMobile
  ? styled.img`
      margin: 0 auto;
      border-radius: 10px;
      max-width: 100%;
      max-height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `
  : styled.img`
      height: 100%;
      border-radius: 10px;
      margin: 0 auto;
      max-width: 97%;
      position: absolute;
      border-radius: 10px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `;

const Circle = styled.div`
  border-radius: 50%;
  &:hover,
  :focus {
    cursor: pointer;
  }
  &:active {
    transform: translate(1px, 1px);
    filter: saturate(150%);
  }
`;

export const CircleLike = styled(Circle)`
  background: #16c2b7;
  padding: 10px 10px 10px 12px;
`;

export const CircleRepost = styled(Circle)`
  background: #0085ff;
  padding: 14px 14px 12px;
`;

export const CircleDislike = styled(Circle)`
  background: #eb2e4a;
  padding: 15px 12px 7px 10px;
`;

export const Like = styled.img`
  width: 30px;
`;

export const Repost = styled.img`
  width: 24px;
`;

export const WrapperScore = styled.div`
  position: absolute;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  transform: translate(-50%, 50%);
  left: 50%;
  min-width: 340px;
  bottom: 36px;
`;

export const Score = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
`;

export const SliderItem = isMobile
  ? styled.div<{ src?: string }>`
      background: url(${(props) => props.src || '#C4C4C4'});
      border-radius: 10px;
      height: 75vh;
      margin: 0 3px;
      display: flex;
      filter: blur(50px);
    `
  : styled.div<{ src?: string }>`
      background: url(${(props) => props.src || '#C4C4C4'});
      border-radius: 10px;
      height: 75vh;
      margin: 0 13px;
      filter: blur(50px);
    `;

export const Title = styled.h4`
  margin: 10px;
  text-align: center;
`;

export const Label = styled.div`
  font-size: 12px;
  margin-top: 4px;
`;

/* background-position: center;
background-repeat: no-repeat;
background-size: cover; */
