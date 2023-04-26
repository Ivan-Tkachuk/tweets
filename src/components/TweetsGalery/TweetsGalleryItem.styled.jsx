import styled from '@emotion/styled';

export const CardItem = styled.li`
  max-width: 380px;
`;

export const CardThumb = styled.div`
  position: relative;
  width: 380px;
  height: 460px;
  background: linear-gradient(
    114.99deg,
    #471ca9 -0.99%,
    #5736a3 54.28%,
    #4b2a99 78.99%
  );
  box-shadow: -2.5777px 6.87386px 20.6216px rgba(0, 0, 0, 0.23);
  border-radius: 20px;
`;

export const CardLogo = styled.a`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 20px;
  top: 20px;
  &:hover,
  &:focus {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`;

export const CardBackground = styled.div`
  position: absolute;
  width: 308px;
  height: 168px;
  left: 36px;
  top: 28px;
`;

export const CardLine = styled.div`
  position: absolute;
  width: 380px;
  height: 8px;
  left: 0;
  top: 214px;
  background: #ebd8ff;
  box-shadow: 0px 3.43693px 3.43693px rgba(0, 0, 0, 0.06),
    inset 0px -1.71846px 3.43693px #ae7be3, inset 0px 3.43693px 2.5777px #fbf8ff;
`;

export const CardCircle = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  left: 50%;
  top: 178px;
  transform: translate(-50%, 0);
  background: #ebd8ff;
  box-shadow: 0 4.39163px 4.39163px rgba(0, 0, 0, 0.06),
    inset 0px -2.19582px 4.39163px #ae7be3, inset 0 4.39163px 3.29372px #fbf8ff;
  border-radius: 50%;
`;

export const CardAvatar = styled.img`
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  padding-top: 284px;
`;

export const CardText = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.2;
  text-transform: uppercase;
  color: #ebd8ff;
`;

export const CardButton = styled.button`
  margin-top: 26px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 28px;
  gap: 6px;
  width: 196px;
  height: 50px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.22;
  text-transform: uppercase;
  color: #373737;

  box-shadow: 0 3.43693px 3.43693px rgba(0, 0, 0, 0.25);
  border-radius: 10.3108px;

  background-color: ${props => (props.isFollowed ? '#5CD3A8' : '#EBD8FF')};
`;
