import { StyleSheet , Dimensions} from 'react-native';

const styles = StyleSheet.create({
    ButtonContainer: {
      width: Dimensions.get('window').width/2-40,
      height: Dimensions.get('window').width/2+4,
      //backgroundColor: "lightblue",
      display: 'flex',
      alignItems: 'flex-start',
    },
    PictureContainer: {
      backgroundColor: "lightblue",
      borderRadius: 16,
      width: Dimensions.get('window').width/2-40,
      height: Dimensions.get('window').width/2-40,
    },
    Name: {
      color: "#212121",
      //backgroundColor: "lightblue",
      fontWeight: 'bold',
      fontSize: 16,
      left: 8, top: 12,
      width: Dimensions.get('window').width/2-56,
    },
    Info: {
      color: '#8F8F8F',
      //backgroundColor: "pink",
      fontSize: 12,
      top: 16,
      left: 8,
      width: Dimensions.get('window').width/2-56,
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
      fontWeight: '500',
      marginHorizontal: 8, marginVertical: 4,
    },
    RowContainer: {
      flexDirection: 'row',
      marginHorizontal: 32,
      marginVertical: 10,
      justifyContent: 'space-between',
      //alignItems: 'center',
    },
    UnsignedContainer: {
      backgroundColor: "#B1AEAE",
      marginHorizontal: 32,
      height: 72,
      alignItems: 'center',
      flexDirection: 'row', 
      justifyContent: 'center',
      borderRadius: 16, 
    },
    UnsignedText: {
      fontWeight: '700',
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
      paddingBottom: 16, 
      marginBottom: 6
    },
    modal:{
      height: "100%", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    modalwhitepart:{
      position: "absolute", bottom: 0,
      height: "30%", width: "100%", backgroundColor: "white", 
      borderTopLeftRadius: 30, borderTopRightRadius: 30, 
    },
    textinmodal:{
      fontSize: 23,
      marginHorizontal: 32, marginBottom: 16,
      marginTop: 44,
      fontWeight: "700", 
    },
    textinputbox:{
      borderWidth: 1, paddingHorizontal:16,
      marginHorizontal: 32, marginBottom: 16,
      height: 52, borderColor: "#B1AEAE", borderRadius: 12,
    },
  });

export { styles }