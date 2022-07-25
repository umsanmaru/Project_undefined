import { Platform, StyleSheet , Dimensions} from 'react-native';

const styles = StyleSheet.create({
  inputbox:{
    marginHorizontal: 32, height: 52, borderColor: "#B1AEAE", borderWidth: 1,
    borderRadius: 12, paddingHorizontal: 16,
  },
  button:{
    marginHorizontal: 32, backgroundColor: "#4769EE", borderRadius: 16,
    height: 52, alignItems: "center", justifyContent: "center",
  },
  button_text:{
    color: "white", fontSize: 16, fontWeight: "700",
  },
  });

export { styles }