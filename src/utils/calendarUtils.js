// src/utils/calendarUtils.js
import * as Calendar from 'expo-calendar';
import { Alert } from 'react-native';

export const requestCalendarPermission = async () => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'Calendar permission is required to export events.');
    return false;
  }
  return true;
};

export const exportToCalendar = async (item) => {
  const hasPermission = await requestCalendarPermission();
  if (!hasPermission) return;

  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const defaultCalendar = calendars.find(cal => cal.allowsModifications) || calendars[0];

  const startDate = new Date(`${item.date}T${item.startTime}:00`);
  const endDate = new Date(`${item.date}T${item.endTime}:00`);

  await Calendar.createEventAsync(defaultCalendar.id, {
    title: item.subject,
    startDate,
    endDate,
    timeZone: 'Europe/London',
  });

  Alert.alert('Success', 'Timetable entry exported to calendar.');
};
