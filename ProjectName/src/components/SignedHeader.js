import React, {useState, useEffect, useRef} from 'react';
import { Text, View } from 'react-native';
import { styles } from '../screens/Style';

const ONE_DAY = 1000*61;

const SignedHeader = ({certTime, cancleCert}) => {
  const year = certTime.getFullYear();
  const month = certTime.getMonth() + 1;
  const date = certTime.getDate();
  const now = new Date();
  const timeElapsed = now - certTime;

  const [hour, setHour] = useState((ONE_DAY - timeElapsed)/(1000*3600));
  const [minute, setMinute] = useState(
    ((ONE_DAY - timeElapsed)%(1000*3600))/(60*1000)
  );
  const interval = useRef(null);

  useEffect(() => {
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
    // clean-up 함수 리턴!
    return () => clearInterval(interval.current);
  }, []);

  return (
    <View style={styles.SignedContainer}>
      <View style={{width: "100%", flexDirection: "row", alignItems:"center", justifyContent:"space-between"}}>
      <View style={{marginLeft: 12,}}>
        <Text style={styles.UnsignedText}>관람 인증 완료</Text>
        <Text style={{fontWeight: '700',fontSize: 12,color: "white",}}>
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