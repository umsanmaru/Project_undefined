import database from '@react-native-firebase/database';

export const ticketCodeChecker = (ticketCode) => {
  return true;
}

export const certificateTicket = (ticketCode, currentExhibit, userToken) => {
  if (ticketCodeChecker(ticketCode)) {
    const updates = {};
    updates[`/users/${userToken}/certificate/${currentExhibit}`] 
      = new Date().toString();
    database()
      .ref()
      .update(updates)
    return true;
  }
  return false;
}