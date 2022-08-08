import React, {useState, useEffect, useRef} from 'react';
import { View } from 'react-native';
import { styles } from '../screens/Style';
import { defaultFontText as Text } from './Text';

const ONE_DAY = 1000*86400;

const SignedHeader = ({certTime, cancleCert}) => {
  const certTimeObj = new Date(certTime);
  const year  = certTimeObj.getFullYear();
  const month = certTimeObj.getMonth() + 1;
  const date = certTimeObj.getDate();

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const interval = useRef(null);

  useEffect(() => {
    const now = new Date();
    const timeElapsed = now - certTimeObj;
    if (timeElapsed > ONE_DAY) 
      cancleCert();
      
    setHour((ONE_DAY - timeElapsed)/(1000*3600));
    setMinute(
      ((ONE_DAY - timeElapsed)%(1000*3600))/(60*1000)
    );
    
    interval.current = setInterval(() => {
      const now = new Date();
      const timeElapsed = now - certTimeObj;
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