import { Platform, StyleSheet , Dimensions} from 'react-native';

const styles = StyleSheet.create({
  sliderdot:{
    width: 8,height: 8,borderRadius: 8,marginHorizontal: 0,
  }, 
  scrollview: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    keyboardShouldPersistTaps: 'handled',
  }, 
  textbutton: {
    color: "#4769EE",
    fontSize: 16,
    marginRight: 12, 
  },
  ButtonContainer: {
      width: Dimensions.get('window').width/2-40,
      //backgroundColor: "lightblue",
      display: 'flex',
      alignItems: 'flex-start',
    },
    PictureContainer: {
      backgroundColor: "gray",
      borderRadius: 16,
      width: Dimensions.get('window').width/2-40,
      height: Dimensions.get('window').width/2-40,
      marginBottom: 8,
    },
    Name: {
      color: "#212121",
      //backgroundColor: "white",
      fontSize: 16,
      left: 8, 
      width: Dimensions.get('window').width/2-56, height: 24,
    },
    Info: {
      color: '#8F8F8F',
      //backgroundColor: "pink",
      fontSize: 12,
      left: 8,
      width: Dimensions.get('window').width/2-56, height: 16,
    },
    DiscountBar: {
      backgroundColor: "#4769EE",
      position: 'absolute',
      top: 24, right: 0, borderBottomLeftRadius: 10, borderTopLeftRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    DiscountNumber:{
      color: "white",
      fontSize: 16,
      marginHorizontal: 8, marginVertical: 4,
    },
    RowContainer: {
      flexDirection: 'row',
      marginHorizontal: 32,
      marginVertical: 10,
      justifyContent: 'space-between',
      //backgroundColor: "lightblue"
      //alignItems: 'center',
    },
    UnsignedContainer: {
      backgroundColor: "#B1AEAE",
      marginHorizontal: 32,
      marginBottom: 16,
      height: 72,
      alignItems: 'center',
      flexDirection: 'row', 
      justifyContent: 'center',
      borderRadius: 16, 
    },
    SignedContainer: {
      backgroundColor: "#4769EE",
      marginHorizontal: 32,
      marginBottom: 16,
      height: 72,
      alignItems: 'center',
      flexDirection: 'row', 
      justifyContent: 'center',
      borderRadius: 16, 
    },
    UnsignedText: {
      fontSize: 16,
      color: "white",
    },
    DefaultHeader: {
      flexDirection: 'row', 
      justifyContent: 'flex-start',
      paddingHorizontal: 32,
    },
    Header: {
      borderBottomWidth: 1,
      borderColor: '#EDEDEE',
      marginBottom: 6,
      paddingTop: 24, 
      //backgroundColor: "pink",
    },
    modal:{
      height: "100%", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.4)", 
    },
    modalwhitepart:{
      position: "absolute", bottom: 0,
      height: Platform.OS === "android" ? "35%" : "30%", width: "100%", backgroundColor: "white", 
      borderTopLeftRadius: 30, borderTopRightRadius: 30, 
    },
    textinmodal:{
      fontSize: 23, color:"black", marginBottom: 16,
      marginLeft: 32, marginTop: 44,
    },
    textinputbox:{
      borderWidth: 1, paddingHorizontal:16,
      marginHorizontal: 32, marginBottom: 16, color: "black",
      height: 52, borderColor: "#B1AEAE", borderRadius: 12,
    },
  });

export { styles }