import React, {useState, useEffect, useRef} from 'react';
import { View } from 'react-native';
import { styles } from '../screens/Style';
import { defaultFontText as Text } from './Text';

const ONE_DAY = 1000*86400;

const SignedHeader = ({certTime, cancleCert}) => {
  const year  = certTime.getFullYear();
  const month = certTime.getMonth() + 1;
  const date = certTime.getDate();

  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const interval = useRef(null);

  useEffect(() => {
    const now = new Date();
    const timeElapsed = now - certTime;
    if (timeElapsed > ONE_DAY) 
      cancleCert();
    interval.current = setInterval(() => {
      const now = new Date();
      const timeElapsed = now - certTime;
      console.log(timeElapsed, "eee")

      if (timeElapsed > ONE_DAY) {
        cancleCert();
        clearInterval(interval.current);
      }
      setHour((ONE_DAY - timeElapsed)/(1000*3600));
      setMinute(
        ((ONE_DAY - timeElapsed)%(1000*3600))/(60*1000)
      );
    }, 1000*60);
    return () => clearInterval(interval.current);
  }, [certTime]);

  return (
    <View style={styles.SignedContainer}>
      <View style={{width: "100%", flexDirection: "row", alignItems:"center", justifyContent:"space-between"}}>
      <View style={{marginLeft: 12,}}>
        <Text style={styles.UnsignedText}>관람 인증 완료</Text>
        <Text style={{fontSize: 12,color: "white",}}>
          {`${year}.${month > 10 ? month : '0' + month}.${date > 10 ? data: '0' + date}`}
        </Text>
      </View>
      <View style={{marginRight: 12,}}>
      <Text style={styles.UnsignedText}>{`${Math.floor(hour)}시간 ${Math.floor(minute)}분 남음`}</Text>
      </View>
      </View>
    </View>
  )
};

export default SignedHeader;