import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from 'expo-notifications';
import { Slot } from "expo-router";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry:false,
    }
  }
});

// Notifications.setNotificationHandler({
//   handleNotification: () => Promise.resolve({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

export default function RootLayout() {

  useEffect(() => {
    registerForPush().then((token) => {
      console.log('token', token);
    }).catch((error) => {
      console.log('error', error);
    });
  }, []);

  useEffect(() => {
    const sub = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received in foreground', notification);

      // Example: show toast / update store
    });

    return () => sub.remove();
  }, []);



  console.log(process.env.EXPO_PUBLIC_API_URL);
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}


export async function registerForPush() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}